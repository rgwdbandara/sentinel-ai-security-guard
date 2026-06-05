
import { isIPBlocked } from "../services/security/blockService.js";

const blockMiddleware = async (req, res, next) => {
  try {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "unknown";

    const blocked = await isIPBlocked(ip);

    if (blocked) {
      return res.status(403).json({
        success: false,
        message: "Access denied. IP temporarily blocked.",
        reason: blocked.reason,
      });
    }

    next();
  } catch (error) {
    console.log("Block Middleware Error:", error.message);

    next();
  }
};

export default blockMiddleware;
