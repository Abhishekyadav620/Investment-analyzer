const express = require("express");
const passport = require("../config/passport");
const {
  registerUser,
  authUser,
  getUserProfile,
  googleAuthSuccess,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/signup", registerUser);
router.post("/login", authUser);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:5173"}/auth?error=google_auth_failed`,
  }),
  googleAuthSuccess
);

// Protected routes (requires valid JWT token)
router.get("/me", protect, getUserProfile);

module.exports = router;
