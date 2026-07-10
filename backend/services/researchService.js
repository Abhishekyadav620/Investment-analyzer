/**
 * services/researchService.js
 *
 * Fetches company research using Tavily.
 */

const { tavily } = require("@tavily/core");

const client = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

const getCompanyResearch = async (companyName) => {
  try {
    const response = await client.search(`${companyName} company overview financials latest news`, {
      searchDepth: "advanced",
      maxResults: 5,
      includeAnswer: true,
    });

    let research = "";

    // AI-generated answer
    if (response.answer) {
      research += `Summary:\n${response.answer}\n\n`;
    }

    // Search results
    if (response.results && response.results.length > 0) {
      research += "Sources:\n\n";

      response.results.forEach((result, index) => {
        research += `${index + 1}. ${result.title}\n`;
        research += `${result.content}\n`;
        research += `Source: ${result.url}\n\n`;
      });
    }

    if (!research.trim()) {
      research = "No reliable research found for this company.";
    }

    return research;
  } catch (error) {
    console.error("Tavily Error:", error.message);

    return "No reliable research found for this company.";
  }
};

module.exports = {
  getCompanyResearch,
};