import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkRateLimit, getRateLimitHeaders } from "./rateLimit";
import { checkSessionLimit } from "./sessionLimit";
import {
  sanitizeText,
  isPromptInjection,
  isBlockedContent,
  validateHistory,
  validateRequestBody,
  isAllowedOrigin,
  getSecurityHeaders,
  SECURITY_REPLIES,
} from "./security";
import { getFallbackReply } from "./quickReplies";
import { knowledgeBase, SYSTEM_INSTRUCTION } from "./knowledgeBase";
import { formatBotReply } from "./formatMessage";

const DEFAULT_GEMINI_MODEL = "gemini-3-flash-preview";
const FALLBACK_MODEL = "gemini-2.5-flash";

const OFF_TOPIC_REPLY =
  "I'm here to help with Masresha's professional background — experience, skills, projects, or contact. What would you like to know?";

const RATE_LIMIT_REPLY =
  "You're sending messages too quickly. Please wait a moment and try again.";

const SESSION_LIMIT_REPLY =
  "This chat session has reached its limit. Refresh the page to start a new conversation.";

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...getSecurityHeaders(),
      ...extraHeaders,
    },
  });
}

function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "anonymous";
}

/** Only block clearly unrelated topics — let LLM handle greetings and typos */
function isHardOffTopic(message) {
  const lower = message.toLowerCase();
  if (/\b(masresha|masri|alemu|portfolio|resume|hire|linkedin|github)\b/i.test(lower)) {
    return false;
  }
  return /\b(weather|bitcoin|homework|assignment|write my essay|president|election)\b/i.test(lower);
}

function buildGeminiHistory(validHistory) {
  return validHistory.map((h) => ({
    role: h.role === "assistant" ? "model" : "user",
    parts: [{ text: h.content }],
  }));
}

function extractModelText(result) {
  try {
    const text = result.response?.text?.()?.trim();
    if (text && text.length > 3) return text;
  } catch {
    // no text part
  }

  const parts = result.response?.candidates?.[0]?.content?.parts;
  if (Array.isArray(parts)) {
    const combined = parts
      .filter((p) => typeof p.text === "string" && !p.thought)
      .map((p) => p.text)
      .join("")
      .trim();
    if (combined.length > 3) return combined;
  }

  return "";
}

function buildPromptWithHistory(userMessage, validHistory) {
  const lines = validHistory.map(
    (h) => `${h.role === "assistant" ? "Assistant" : "User"}: ${h.content}`
  );
  return [
    lines.length ? `Conversation so far:\n${lines.join("\n")}\n` : "",
    `User: ${userMessage}`,
    `Assistant:`,
  ].join("\n");
}

async function callGeminiOnce(model, userMessage, validHistory) {
  const geminiHistory = buildGeminiHistory(validHistory);

  if (geminiHistory.length > 0) {
    try {
      const chat = model.startChat({ history: geminiHistory });
      const result = await chat.sendMessage(userMessage);
      const text = extractModelText(result);
      if (text) return text;
    } catch {
      // fall through to single-prompt mode
    }
  }

  const prompt =
    geminiHistory.length > 0
      ? buildPromptWithHistory(userMessage, validHistory)
      : userMessage;

  const result = await model.generateContent(prompt);
  return extractModelText(result);
}

async function callGeminiRest(modelId, userMessage, validHistory) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const contents = [
    ...buildGeminiHistory(validHistory),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [
          {
            text: `${SYSTEM_INSTRUCTION}\n\nKnowledge base:\n${JSON.stringify(knowledgeBase, null, 2)}`,
          },
        ],
      },
      contents,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.65,
      },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Gemini REST ${res.status}: ${errBody.slice(0, 120)}`);
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return "";

  return parts
    .map((p) => p.text || "")
    .join("")
    .trim();
}

async function callGemini(modelId, userMessage, validHistory) {
  // Prefer REST fetch — more reliable in Next.js server environments
  try {
    const text = await callGeminiRest(modelId, userMessage, validHistory);
    if (text) return text;
  } catch (restErr) {
    console.warn("Gemini REST failed, trying SDK:", restErr?.message);
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: `${SYSTEM_INSTRUCTION}\n\nKnowledge base:\n${JSON.stringify(knowledgeBase, null, 2)}`,
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.65,
    },
  });

  let lastError;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const text = await callGeminiOnce(model, userMessage, validHistory);
      if (text) return text;
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }
  throw lastError;
}

export async function GET() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return jsonResponse({ error: "Server configuration error." }, 500);
    }

    if (!isAllowedOrigin(req)) {
      return jsonResponse({ error: "Forbidden." }, 403);
    }

    const clientIp = getClientIp(req);
    const rate = checkRateLimit(clientIp);

    if (!rate.allowed) {
      return jsonResponse(
        { error: RATE_LIMIT_REPLY, code: "RATE_LIMITED" },
        429,
        getRateLimitHeaders(0, rate.retryAfterSec)
      );
    }

    const contentLength = req.headers.get("content-length");
    let requestBody;
    try {
      requestBody = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid request." }, 400);
    }

    const bodyCheck = validateRequestBody(requestBody, contentLength);
    if (!bodyCheck.ok) {
      const status = bodyCheck.blocked ? 403 : 400;
      return jsonResponse({ error: bodyCheck.error || "Invalid request." }, status);
    }

    const sessionId = sanitizeText(requestBody.sessionId || clientIp).slice(0, 64) || clientIp;
    const sessionCheck = checkSessionLimit(sessionId);
    if (!sessionCheck.allowed) {
      return jsonResponse(
        { error: SESSION_LIMIT_REPLY, code: "SESSION_LIMIT" },
        429,
        getRateLimitHeaders(rate.remaining)
      );
    }

    const trimmedMessage = sanitizeText(requestBody.message);
    if (!trimmedMessage) {
      return jsonResponse({ error: "Message cannot be empty." }, 400);
    }

    if (isPromptInjection(trimmedMessage)) {
      return jsonResponse(
        { message: SECURITY_REPLIES.injection },
        200,
        getRateLimitHeaders(rate.remaining)
      );
    }

    if (isBlockedContent(trimmedMessage)) {
      return jsonResponse(
        { message: SECURITY_REPLIES.blocked },
        200,
        getRateLimitHeaders(rate.remaining)
      );
    }

    const validHistory = validateHistory(requestBody.history);
    if (validHistory === null) {
      return jsonResponse({ error: "Invalid conversation history." }, 400);
    }

    for (const turn of validHistory) {
      if (isPromptInjection(turn.content) || isBlockedContent(turn.content)) {
        return jsonResponse({ message: SECURITY_REPLIES.injection }, 200, getRateLimitHeaders(rate.remaining));
      }
    }

    if (isHardOffTopic(trimmedMessage)) {
      return jsonResponse({ message: OFF_TOPIC_REPLY }, 200, getRateLimitHeaders(rate.remaining));
    }

    const modelId = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
    const fallbackModelId = process.env.GEMINI_FALLBACK_MODEL || FALLBACK_MODEL;

    let text = "";

    try {
      text = await callGemini(modelId, trimmedMessage, validHistory);
      if (!text && modelId !== fallbackModelId) {
        text = await callGemini(fallbackModelId, trimmedMessage, validHistory);
      }
    } catch (apiError) {
      console.error("Chatbot Gemini error:", apiError?.message || apiError);
      text = getFallbackReply();
    }

    if (!text) {
      text = getFallbackReply() || OFF_TOPIC_REPLY;
    }

    return jsonResponse(
      { message: formatBotReply(text) },
      200,
      getRateLimitHeaders(rate.remaining)
    );
  } catch (error) {
    console.error("Chatbot API error:", error);
    return jsonResponse(
      { message: getFallbackReply() || "Something went wrong. Please try again." },
      200
    );
  }
}
