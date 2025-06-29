const jwt = require("jsonwebtoken");

// JWT secret key - in production, this should be stored in environment variables
const JWT_SECRET = "your-super-secret-jwt-key-change-this-in-production";

// Generate JWT token
const generateToken = (userId, email) => {
  const payload = {
    userId: userId,
    email: email,
    iat: Math.floor(Date.now() / 1000), // issued at
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // expires in 24 hours
  };

  return jwt.sign(payload, JWT_SECRET);
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  const result = verifyToken(token);
  if (!result.valid) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }

  req.user = result.decoded;
  next();
};

// Logout utility (client-side should remove the token)
const logout = (req, res) => {
  res.json({
    message: "Logout successful. Please remove the token from client storage.",
  });
};

module.exports = {
  generateToken,
  verifyToken,
  authenticateToken,
  logout,
  JWT_SECRET,
};
