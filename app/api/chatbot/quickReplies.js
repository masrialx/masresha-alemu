/** Only used when Gemini API is unavailable — never keyword-match user intent */
export function normalizeTypos(text) {
  return text; // kept for security.js compatibility if needed later
}

export function getFallbackReply() {
  return "I'm having trouble connecting to my AI service right now. Please try again in a few seconds — I'm ready to answer naturally about Masresha's experience, skills, or contact info.";
}
