/**
 * services/geminiService.js
 *
 * Centralizes Gemini client configuration for the application.
 */

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

let geminiModel;

const getGeminiApiKey = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    const error = new Error("GEMINI_API_KEY is not configured");
    error.statusCode = 500;
    throw error;
  }

  return apiKey.trim();
};

const getGeminiModel = () => {
  if (!geminiModel) {
    geminiModel = new ChatGoogleGenerativeAI({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      temperature: 0.1,
      maxRetries: 2,
      json: true,
      apiKey: getGeminiApiKey(),
    });
  }

  return geminiModel;
};

module.exports = {
  getGeminiModel,
  getGeminiApiKey,
};