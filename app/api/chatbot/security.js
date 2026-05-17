const MAX_MESSAGE_LENGTH = 400;
const MAX_HISTORY_TURNS = 10;
const MAX_HISTORY_CONTENT = 200;
const MAX_BODY_BYTES = 8000;

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /disregard\s+(your\s+)?(rules|instructions|guidelines)/i,
  /you\s+are\s+now\s+(a|an)\s+/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+(if\s+you\s+are\s+)?(?!masresha)/i,
  /system\s*prompt/i,
  /reveal\s+(your\s+)?(instructions|prompt|rules)/i,
  /show\s+(me\s+)?(the\s+)?(system\s+)?prompt/i,
  /what\s+are\s+your\s+instructions/i,
  /jailbreak/i,
  /\bDAN\b/,
  /developer\s+mode/i,
  /bypass\s+(safety|filter|restriction)/i,
  /<\s*script/i,
  /javascript:/i,
  /on\w+\s*=/i,
];

const BLOCKED_PATTERNS = [
  /\b(api\s*key|gemini|openai|secret|password|token)\b/i,
  /\b(hack|exploit|sql\s*injection|xss|ddos)\b/i,
];

export function sanitizeText(input) {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

export function isPromptInjection(message) {
  return INJECTION_PATTERNS.some((p) => p.test(message));
}

export function isBlockedContent(message) {
  return BLOCKED_PATTERNS.some((p) => p.test(message));
}

export function validateHistory(history) {
  if (!history) return [];
  if (!Array.isArray(history)) return null;

  const valid = [];
  for (const item of history.slice(-MAX_HISTORY_TURNS)) {
    if (!item || typeof item !== "object") continue;
    const role = item.role === "assistant" ? "assistant" : item.role === "user" ? "user" : null;
    if (!role) continue;
    const content = sanitizeText(item.content);
    if (!content) continue;
    valid.push({ role, content: content.slice(0, MAX_HISTORY_CONTENT) });
  }
  return valid;
}

export function validateRequestBody(body, contentLength) {
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return { ok: false, error: "Request too large." };
  }
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }
  if (body._hp && String(body._hp).length > 0) {
    return { ok: false, error: "Invalid request.", blocked: true };
  }
  if (body.sessionId && (typeof body.sessionId !== "string" || body.sessionId.length > 64)) {
    return { ok: false, error: "Invalid session." };
  }
  return { ok: true };
}

export function isAllowedOrigin(req) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}

export function getSecurityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Cache-Control": "no-store",
  };
}

export const SECURITY_REPLIES = {
  injection:
    "I can only answer questions about Masresha's professional background. How can I help with his experience or skills?",
  blocked: "That request isn't supported. Please ask about Masresha's work, skills, or contact info.",
};

export { MAX_MESSAGE_LENGTH, MAX_HISTORY_TURNS };
