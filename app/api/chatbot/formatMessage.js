/**
 * Converts LLM markdown to clean plain text for the chat UI (no visible * or **).
 */
export function formatBotReply(text) {
  if (!text || typeof text !== "string") return text;

  let out = text;

  // **bold** or __bold__ → keep text only
  out = out.replace(/\*\*([^*]+)\*\*/g, "$1");
  out = out.replace(/__([^_]+)__/g, "$1");

  // *italic* (single asterisks, not bullets)
  out = out.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "$1");

  // Bullet lines: "* item" or "- item" → "• item"
  out = out.replace(/^\s*[\*\-]\s+/gm, "• ");

  // Leftover markdown symbols
  out = out.replace(/\*\*/g, "");
  out = out.replace(/(?<=\s)\*(?=\s)/g, "");
  out = out.replace(/^\*\s*/gm, "• ");

  // Clean up extra spaces
  out = out.replace(/\n{3,}/g, "\n\n").trim();

  return out;
}
