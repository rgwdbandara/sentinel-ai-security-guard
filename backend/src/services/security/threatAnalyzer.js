
import {
  SQL_INJECTION_PATTERNS,
  XSS_PATTERNS,
  SUSPICIOUS_HEADERS,
} from "./threatPatterns.js";

const analyzeThreat = (req) => {
  let threatScore = 0;
  let detectedThreats = [];

  const payload = JSON.stringify(req.body || {});
  const query = JSON.stringify(req.query || {});
  const headers = JSON.stringify(req.headers || {});

  // SQL Injection Detection
  SQL_INJECTION_PATTERNS.forEach((pattern) => {
    if (pattern.test(payload) || pattern.test(query)) {
      threatScore += 25;

      if (!detectedThreats.includes("SQL_INJECTION")) {
        detectedThreats.push("SQL_INJECTION");
      }
    }
  });

  // XSS Detection
  XSS_PATTERNS.forEach((pattern) => {
    if (pattern.test(payload) || pattern.test(query)) {
      threatScore += 20;

      if (!detectedThreats.includes("XSS_ATTACK")) {
        detectedThreats.push("XSS_ATTACK");
      }
    }
  });

  // Suspicious Headers
  SUSPICIOUS_HEADERS.forEach((pattern) => {
    if (pattern.test(headers)) {
      threatScore += 15;

      if (!detectedThreats.includes("SUSPICIOUS_HEADERS")) {
        detectedThreats.push("SUSPICIOUS_HEADERS");
      }
    }
  });

  return {
    threatScore,
    detectedThreats,
    isThreat: threatScore >= 25,
  };
};

export default analyzeThreat;
