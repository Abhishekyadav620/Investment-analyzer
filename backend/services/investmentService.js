/**
 * services/investmentService.js
 *
 * Calls the investment agent and converts the structured output into a
 * markdown report for the frontend.
 */

const { analyzeCompany: analyzeInvestmentAgent } = require("../agents/investmentAgent");

const formatList = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return "- None provided";
  }

  return items.map((item) => `- ${item}`).join("\n");
};

const formatInvestmentReport = (analysis) => {
  return [
    `# ${analysis.company} Investment Analysis`,
    "",
    "## Recommendation",
    `**${analysis.recommendation}**`,
    `Score: ${analysis.score}/100`,
    `Confidence: ${analysis.confidence}/100`,
    "",
    "## Summary",
    analysis.summary,
    "",
    "## Thesis",
    analysis.thesis,
    "",
    "## Strengths",
    formatList(analysis.strengths),
    "",
    "## Risks",
    formatList(analysis.risks),
    "",
    "## Catalysts",
    formatList(analysis.catalysts),
    "",
    "## Valuation View",
    analysis.valuationView,
    "",
    "## Analyst Verdict",
    analysis.verdictRationale,
  ].join("\n");
};

const analyzeCompany = async (companyName) => {
  if (!companyName || typeof companyName !== "string" || companyName.trim() === "") {
    const error = new Error("Company name is required");
    error.statusCode = 400;
    throw error;
  }

  const analysis = await analyzeInvestmentAgent(companyName.trim());
  const report = formatInvestmentReport(analysis);

  return {
    analysis,
    report,
  };
};

module.exports = {
  analyzeCompany,
  formatInvestmentReport,
};