const getSeverityLevel = (
  threatScore
) => {

  if (threatScore >= 120) {
    return "CRITICAL";
  }

  if (threatScore >= 80) {
    return "HIGH";
  }

  if (threatScore >= 40) {
    return "MEDIUM";
  }

  return "LOW";
};

export default getSeverityLevel;