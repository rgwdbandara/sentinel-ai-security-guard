
import AttackLog from "../../models/AttackLog.js";

const logAttack = async ({
  ip,
  detectedThreats,
  threatScore,
  req,
  blocked,
  aiAnalysis,
}) => {
  try {
    await AttackLog.create({
      ip,
      detectedThreats,
      threatScore,
      requestPath: req.originalUrl,
      requestMethod: req.method,
      payload: req.body,
      headers: req.headers,
      blocked,
      aiThreatType: aiAnalysis?.threatType,
      aiConfidenceScore: aiAnalysis?.confidenceScore,
      aiExplanation: aiAnalysis?.explanation,


    });

    console.log("Attack logged to MongoDB");
  } catch (error) {
    console.log("Attack Logger Error:", error.message);
  }
};

export default logAttack;
