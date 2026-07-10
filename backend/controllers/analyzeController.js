/**
 * controllers/analyzeController.js
 *
 * Handles HTTP request/response for the /api/analyze endpoint.
 */

const investmentService = require("../services/investmentService");

const analyzeCompany = async (req, res) => {
  try {
    const { company } = req.body;

    if (!company || typeof company !== "string" || company.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const trimmedCompany = company.trim();

    const result = await investmentService.analyzeCompany(trimmedCompany);

    return res.status(200).json({
      success: true,

      company: trimmedCompany,

      report: result.report,

      analysis: result.analysis,
    });

  } catch (error) {
    console.error("analyzeCompany error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  analyzeCompany,
};