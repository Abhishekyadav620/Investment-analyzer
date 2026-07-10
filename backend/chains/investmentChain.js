/**
 * chains/investmentChain.js
 *
 * Connects the investment prompt directly to Gemini.
 */

const { investmentPrompt } = require("../prompts/investmentPrompt");
const { getGeminiModel } = require("../services/geminiService");

let investmentChain;

const getInvestmentChain = () => {
  if (!investmentChain) {
    investmentChain = investmentPrompt.pipe(getGeminiModel());
  }

  return investmentChain;
};

module.exports = {
  getInvestmentChain,
};