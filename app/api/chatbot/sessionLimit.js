const sessionStore = new Map();
const SESSION_WINDOW_MS = 30 * 60_000;
const MAX_MESSAGES_PER_SESSION = Number(process.env.CHATBOT_SESSION_MAX) || 40;

function cleanup(now) {
  if (sessionStore.size < 300) return;
  for (const [key, entry] of sessionStore) {
    if (now - entry.start > SESSION_WINDOW_MS) sessionStore.delete(key);
  }
}

export function checkSessionLimit(sessionId) {
  if (!sessionId || sessionId === "anonymous") {
    return { allowed: true, remaining: MAX_MESSAGES_PER_SESSION };
  }

  const now = Date.now();
  cleanup(now);
  const key = sessionId.slice(0, 64);

  let entry = sessionStore.get(key);
  if (!entry || now - entry.start > SESSION_WINDOW_MS) {
    entry = { count: 1, start: now };
    sessionStore.set(key, entry);
    return { allowed: true, remaining: MAX_MESSAGES_PER_SESSION - 1 };
  }

  if (entry.count >= MAX_MESSAGES_PER_SESSION) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_MESSAGES_PER_SESSION - entry.count };
}
