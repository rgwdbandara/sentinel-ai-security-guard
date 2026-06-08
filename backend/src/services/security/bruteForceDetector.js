
const loginAttempts = new Map();

const detectBruteForce = (ip) => {
  const currentTime = Date.now();

  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, []);
  }

  const attempts =
    loginAttempts.get(ip);

  attempts.push(currentTime);

  const recentAttempts = attempts.filter(
    (time) =>
      currentTime - time < 60000
  );

  loginAttempts.set(ip, recentAttempts);

  return recentAttempts.length >= 5;
};

export default detectBruteForce;
