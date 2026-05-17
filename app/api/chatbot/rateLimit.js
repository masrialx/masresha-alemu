const store = new Map();

const WINDOW_MS = Number(process.env.CHATBOT_RATE_WINDOW_MS) || 60_000;
const MAX_REQUESTS = Number(process.env.CHATBOT_RATE_MAX) || 12;

function cleanup(now) {
  if (store.size < 500) return;
  for (const [key, entry] of store) {
    if (now - entry.start > WINDOW_MS) store.delete(key);
  }
}

export function checkRateLimit(clientId) {
  const now = Date.now();
  const key = clientId || "anonymous";
  cleanup(now);

  let entry = store.get(key);
  if (!entry || now - entry.start > WINDOW_MS) {
    entry = { count: 1, start: now };
    store.set(key, entry);
    return { allowed: true, remaining: MAX_REQUESTS - 1, retryAfterSec: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfterSec = Math.ceil((WINDOW_MS - (now - entry.start)) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count, retryAfterSec: 0 };
}

export function getRateLimitHeaders(remaining, retryAfterSec = 0) {
  return {
    "X-RateLimit-Limit": String(MAX_REQUESTS),
    "X-RateLimit-Remaining": String(Math.max(0, remaining)),
    ...(retryAfterSec > 0 ? { "Retry-After": String(retryAfterSec) } : {}),
  };
}
