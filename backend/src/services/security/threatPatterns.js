
export const SQL_INJECTION_PATTERNS = [
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
  /\b(SELECT|UNION|INSERT|UPDATE|DELETE|DROP|WHERE|OR|AND)\b/i,
  /('|")\s*OR\s*('|")?\d/i,
  /UNION\s+SELECT/i,
];

export const XSS_PATTERNS = [
  /<script.*?>.*?<\/script>/i,
  /javascript:/i,
  /onerror=/i,
  /onload=/i,
  /alert\s*\(/i,
];

export const SUSPICIOUS_HEADERS = [
  /sqlmap/i,
  /nikto/i,
  /curl/i,
  /python-requests/i,
];
