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

  // Combine all request data
  const requestData = `
    ${payload}
    ${query}
    ${headers}
  `;

  // -----------------------------
  // EXTRA THREAT PATTERNS
  // -----------------------------

  const pathTraversalPatterns = [
    /\.\.\//i,
    /\.\.\\/i,
    /etc\/passwd/i,
    /boot\.ini/i,
  ];

  const commandInjectionPatterns = [
    /;\s*rm\s/i,
    /&&\s*whoami/i,
    /\|\s*ls/i,
    /curl\s+http/i,
  ];

  const botPatterns = [
    /sqlmap/i,
    /python-requests/i,
    /curl/i,
    /wget/i,
  ];

  // -----------------------------
  // SQL Injection Detection
  // -----------------------------

  SQL_INJECTION_PATTERNS.forEach((pattern) => {
    if (
      pattern.test(payload) ||
      pattern.test(query)
    ) {
      threatScore += 50;

      if (
        !detectedThreats.includes(
          "SQL_INJECTION"
        )
      ) {
        detectedThreats.push(
          "SQL_INJECTION"
        );
      }
    }
  });

  // -----------------------------
  // XSS Detection
  // -----------------------------

  XSS_PATTERNS.forEach((pattern) => {
    if (
      pattern.test(payload) ||
      pattern.test(query)
    ) {
      threatScore += 40;

      if (
        !detectedThreats.includes(
          "XSS_ATTACK"
        )
      ) {
        detectedThreats.push(
          "XSS_ATTACK"
        );
      }
    }
  });

  // -----------------------------
  // Suspicious Headers
  // -----------------------------

  SUSPICIOUS_HEADERS.forEach(
    (pattern) => {
      if (pattern.test(headers)) {
        threatScore += 15;

        if (
          !detectedThreats.includes(
            "SUSPICIOUS_HEADERS"
          )
        ) {
          detectedThreats.push(
            "SUSPICIOUS_HEADERS"
          );
        }
      }
    }
  );

  // -----------------------------
  // Path Traversal Detection
  // -----------------------------

  pathTraversalPatterns.forEach(
    (pattern) => {
      if (pattern.test(requestData)) {
        threatScore += 90;

        if (
          !detectedThreats.includes(
            "PATH_TRAVERSAL"
          )
        ) {
          detectedThreats.push(
            "PATH_TRAVERSAL"
          );
        }
      }
    }
  );

  // -----------------------------
  // Command Injection Detection
  // -----------------------------

  commandInjectionPatterns.forEach(
    (pattern) => {
      if (pattern.test(requestData)) {
        threatScore += 120;

        if (
          !detectedThreats.includes(
            "COMMAND_INJECTION"
          )
        ) {
          detectedThreats.push(
            "COMMAND_INJECTION"
          );
        }
      }
    }
  );

  // -----------------------------
  // Bot Activity Detection
  // -----------------------------

  botPatterns.forEach((pattern) => {
    if (pattern.test(requestData)) {
      threatScore += 60;

      if (
        !detectedThreats.includes(
          "BOT_ACTIVITY"
        )
      ) {
        detectedThreats.push(
          "BOT_ACTIVITY"
        );
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