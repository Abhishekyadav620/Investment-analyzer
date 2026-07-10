/**
 * services/financialService.js
 *
 * Fetches company financial data from Finnhub.
 */

const axios = require("axios");

const API_KEY = process.env.FINNHUB_API_KEY;

const formatMarketCap = (marketCapMillion) => {
  if (!marketCapMillion || isNaN(marketCapMillion)) {
    return "Not Available";
  }

  const value = Number(marketCapMillion);

  // Finnhub returns market cap in MILLIONS USD
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}T`;
  }

  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}B`;
  }

  return `$${value.toFixed(2)}M`;
};

const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return "Not Available";
  }

  return `$${Number(price).toFixed(2)}`;
};

const getCompanyFinancialData = async (companyName) => {
  try {
    // Search company
    const searchResponse = await axios.get(
      "https://finnhub.io/api/v1/search",
      {
        params: {
          q: companyName,
          token: API_KEY,
        },
      }
    );

    if (
      !searchResponse.data.result ||
      searchResponse.data.result.length === 0
    ) {
      return {
        ticker: "Not Available",
        currentPrice: "Not Available",
        marketCap: "Not Available",
        exchange: "Not Available",
        industry: "Not Available",
      };
    }

    const symbol = searchResponse.data.result[0].symbol;

    // Fetch profile + quote together
    const [profileResponse, quoteResponse] = await Promise.all([
      axios.get("https://finnhub.io/api/v1/stock/profile2", {
        params: {
          symbol,
          token: API_KEY,
        },
      }),

      axios.get("https://finnhub.io/api/v1/quote", {
        params: {
          symbol,
          token: API_KEY,
        },
      }),
    ]);

    const profile = profileResponse.data;
    const quote = quoteResponse.data;

    return {
      ticker: symbol || "Not Available",

      currentPrice: formatPrice(quote.c),

      marketCap: formatMarketCap(
        profile.marketCapitalization
      ),

      exchange: profile.exchange || "Not Available",

      industry: profile.finnhubIndustry || "Not Available",
    };
  } catch (err) {
    console.error("Finnhub Error:", err.message);

    return {
      ticker: "Not Available",
      currentPrice: "Not Available",
      marketCap: "Not Available",
      exchange: "Not Available",
      industry: "Not Available",
    };
  }
};

module.exports = {
  getCompanyFinancialData,
};