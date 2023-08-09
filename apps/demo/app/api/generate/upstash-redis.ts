import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const LIMIT_PER_DAY = 40;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(LIMIT_PER_DAY, "1 d"),
  ephemeralCache: new Map(),
  analytics: true,
});

export { ratelimit };
