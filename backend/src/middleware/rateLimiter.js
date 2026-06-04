
import redis from "../config/redis.js";

const WINDOW_SIZE = 60;
const MAX_REQUESTS = 20;

const rateLimiter = async (req, res, next) => {
  try {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "unknown";

    const redisKey = `rate_limit:${ip}`;

    const requests = await redis.incr(redisKey);

    if (requests === 1) {
      await redis.expire(redisKey, WINDOW_SIZE);
    }

    const ttl = await redis.ttl(redisKey);

    res.setHeader("X-RateLimit-Limit", MAX_REQUESTS);

    res.setHeader(
      "X-RateLimit-Remaining",
      Math.max(MAX_REQUESTS - Number(requests), 0)
    );

    if (Number(requests) > MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        message: "Too many requests",
        retryAfter: ttl,
      });
    }

    next();
  } catch (error) {
    console.log("Rate Limiter Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Rate limiter error",
    });
  }
};

export default rateLimiter;

