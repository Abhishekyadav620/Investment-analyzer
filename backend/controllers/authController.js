const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper to generate signed JWT tokens
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "investai_jwt_secret_token_12345",
    { expiresIn: "30d" } // Server token matches 30 days validation
  );
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must include at least one letter, one number, and one special character",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create user in MongoDB
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    if (user) {
      return res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user data received",
      });
    }
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error occurred during signup",
    });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error occurred during login",
    });
  }
};

/**
 * @desc    Get user profile details
 * @route   GET /api/auth/me
 * @access  Private
 */
const getUserProfile = async (req, res) => {
  try {
    // req.user was attached by protect middleware
    return res.status(200).json({
      success: true,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  } catch (error) {
    console.error("Profile retrieval error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error occurred retrieving profile",
    });
  }
};

/**
 * @desc    Google OAuth success callback
 * @route   GET /api/auth/google/callback
 * @access  Public
 */
const googleAuthSuccess = (req, res) => {
  try {
    // Generate JWT token for the authenticated user
    const token = generateToken(req.user._id);
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const params = new URLSearchParams({
      token,
      name: req.user.name,
      email: req.user.email,
    });

    // Redirect to frontend with token
    res.redirect(`${frontendUrl}/auth?${params.toString()}`);
  } catch (error) {
    console.error("Google auth success error:", error.message);
    res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/auth?error=server_error`);
  }
};

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  googleAuthSuccess,
};
