const express = require("express");
const { authenticateToken, logout } = require("../utils/jwt-utils");

const router = express.Router();

// Protected route - requires valid JWT token
router.get("/profile", authenticateToken, (req, res) => {
  // req.user contains the decoded JWT payload
  res.json({
    message: "Access granted to protected route",
    user: {
      userId: req.user.userId,
      email: req.user.email,
    },
  });
});

// Another protected route example
router.post("/update-profile", authenticateToken, (req, res) => {
  // Only authenticated users can access this route
  const { name, bio } = req.body;

  res.json({
    message: "Profile updated successfully",
    user: {
      userId: req.user.userId,
      email: req.user.email,
      updatedData: { name, bio },
    },
  });
});

// Logout route
router.post("/logout", authenticateToken, logout);

module.exports = router;
