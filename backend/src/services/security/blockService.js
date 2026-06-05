
import redis from "../../config/redis.js";

const BLOCK_DURATION = 60 * 30;

export const blockIP = async (ip, reason = "Suspicious Activity") => {
  const blockKey = `blocked_ip:${ip}`;

  await redis.set(
    blockKey,
    JSON.stringify({
      blocked: true,
      reason,
      blockedAt: new Date().toISOString(),
    }),
    {
      ex: BLOCK_DURATION,
    }
  );

  console.log(`IP Blocked: ${ip}`);
};

export const isIPBlocked = async (ip) => {
  const blockKey = `blocked_ip:${ip}`;

  const blockedData = await redis.get(blockKey);


return blockedData || null;


};
