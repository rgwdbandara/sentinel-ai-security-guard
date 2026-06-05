
import analyzeThreat from "../services/security/threatAnalyzer.js";
import { blockIP } from "../services/security/blockService.js";
import logAttack from "../services/security/attackLogger.js";
import { getIO } from "../sockets/socketServer.js";
import analyzeWithAI from "../services/security/aiThreatAnalyzer.js";

const threatDetection = async (req, res, next) => {

    if (req.path.startsWith("/api/analytics")) {
    return next();
  }
  try {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "unknown";



    const analysis = analyzeThreat(req);

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

  detectedThreats:
    analysis.detectedThreats,

  threatScore:
    analysis.threatScore,

  timestamp: new Date(),

  aiThreatType:
    aiAnalysis.threatType,

  aiConfidenceScore:
    aiAnalysis.confidenceScore,

  aiExplanation:
    aiAnalysis.explanation,
});

      await logAttack({
        ip,
        detectedThreats: analysis.detectedThreats,
        threatScore: analysis.threatScore,
        req,
        blocked: analysis.threatScore >= 50,
        aiAnalysis,


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