
import analyzeThreat from "../services/security/threatAnalyzer.js";
import { blockIP } from "../services/security/blockService.js";
import logAttack from "../services/security/attackLogger.js";
import { getIO } from "../sockets/socketServer.js";
import analyzeWithAI from "../services/security/aiThreatAnalyzer.js";
import detectBruteForce from "../services/security/bruteForceDetector.js";
import getSeverityLevel from"../services/security/severityEngine.js";

const threatDetection = async (req, res, next) => {
  try {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "unknown";

    const analysis = analyzeThreat(req);
    const severity = getSeverityLevel(analysis.threatScore);

  
const bruteForceDetected =
  detectBruteForce(ip);

if (bruteForceDetected) {
  analysis.detectedThreats.push(
    "BRUTE_FORCE_ATTACK"
  );

  analysis.threatScore += 100;

  analysis.isThreat = true;
}


    const aiAnalysis = await analyzeWithAI({
      body: req.body,
      query: req.query,
      headers: req.headers,
      ip,
    });

    req.threatAnalysis = analysis;
    req.aiThreatAnalysis = aiAnalysis;

    console.log("Threat Analysis:", analysis);
    console.log("AI Threat Analysis:", aiAnalysis);

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
        severity,
      });
    }

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