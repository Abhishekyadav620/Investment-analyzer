const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/signup", registerUser);
router.post("/login", authUser);

// Protected routes (requires valid JWT token)
router.get("/me", protect, getUserProfile);

module.exports = router;
