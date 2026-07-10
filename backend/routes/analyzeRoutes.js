/**
 * routes/analyzeRoutes.js
 *
 * Defines HTTP routes for company analysis.
 * Routes stay thin — all request handling logic lives in controllers.
 *
 * Future phases will add more routes (e.g. report history, user auth).
 */

const express = require("express");
const { analyzeCompany } = require("../controllers/analyzeController");

const router = express.Router();

// POST /api/analyze — Analyze a public company
router.post("/analyze", analyzeCompany);

module.exports = router;
