
import analyzeThreat from "../services/security/threatAnalyzer.js";

const threatDetection = (req, res, next) => {
  try {
    const analysis = analyzeThreat(req);

    req.threatAnalysis = analysis;

    if (analysis.isThreat) {
      console.log("Threat Detected:", {
        ip: req.ip,
        threats: analysis.detectedThreats,
        score: analysis.threatScore,
      });
    }

    next();
  } catch (error) {
    console.log("Threat Detection Error:", error.message);

    next();
  }
};

export default threatDetection;
