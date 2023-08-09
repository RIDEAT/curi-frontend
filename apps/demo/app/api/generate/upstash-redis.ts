import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const LIMIT_TEXT_PER_DAY = 41;

const ratelimitText = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(LIMIT_TEXT_PER_DAY, "1 d"),
  ephemeralCache: new Map(),
  analytics: true,
});

const LIMIT_IMAGE_PER_DAY = 3;

const ratelimitImage = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(LIMIT_IMAGE_PER_DAY, "1 d"),
  ephemeralCache: new Map(),
  analytics: true,
});

export { ratelimitText, ratelimitImage };
