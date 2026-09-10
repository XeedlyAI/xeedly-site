type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

export function rateLimit(
  key: string,
  opts: { maxRequests: number; windowMs: number },
): { ok: boolean; remaining: number } {
  cleanup();

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, remaining: opts.maxRequests - 1 };
  }

  entry.count++;
  if (entry.count > opts.maxRequests) {
    return { ok: false, remaining: 0 };
  }
  return { ok: true, remaining: opts.maxRequests - entry.count };
}
