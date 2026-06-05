
import analyzeThreat from "../services/security/threatAnalyzer.js";
import { blockIP } from "../services/security/blockService.js";
import logAttack from "../services/security/attackLogger.js";
import { getIO } from "../sockets/socketServer.js";

const threatDetection = async (req, res, next) => {
  try {
    const analysis = analyzeThreat(req);

    req.threatAnalysis = analysis;

    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "unknown";

    if (analysis.isThreat) {
  console.log("Threat Detected:", {
    ip,
    threats: analysis.detectedThreats,
    score: analysis.threatScore,
  });

  const io = getIO();

  io.emit("security-threat", {
    ip,
    detectedThreats: analysis.detectedThreats,
    threatScore: analysis.threatScore,
    timestamp: new Date(),
  });

  await logAttack({
    ip,
    detectedThreats: analysis.detectedThreats,
    threatScore: analysis.threatScore,
    req,
    blocked: analysis.threatScore >= 50,
  });
}

    console.log("Threat Analysis:", analysis);

    // Auto Block High Threats
    if (analysis.threatScore >= 50) {
      await blockIP(ip, analysis.detectedThreats.join(", "));
    }

    next();
  } catch (error) {
    console.log("Threat Detection Error:", error.message);

    next();
  }
};

export default threatDetection;