/**
 * agents/investmentAgent.js
 *
 * Orchestrates the LangChain invocation and validates Gemini output.
 */

const { z } = require("zod");
const { getInvestmentChain } = require("../chains/investmentChain");
const { getCompanyResearch } = require("../services/researchService");
const { getCompanyFinancialData } = require("../services/financialService");

const investmentAnalysisSchema = z.object({
  company: z.string().min(1),

  ticker: z.string(),

  currentPrice: z.union([z.number(), z.string()]),

  marketCap: z.string(),

  exchange: z.string(),

  industry: z.string(),

  recommendation: z.enum(["BUY", "HOLD", "SELL"]),

  score: z.number().int().min(0).max(100),

  confidence: z.number().int().min(0).max(100),

  scoreBreakdown: z.object({
    financialHealth: z.number().int().min(0).max(100),
    growth: z.number().int().min(0).max(100),
    valuation: z.number().int().min(0).max(100),
    risk: z.number().int().min(0).max(100),
    moat: z.number().int().min(0).max(100),
    management: z.number().int().min(0).max(100),
    innovation: z.number().int().min(0).max(100),
  }),

  summary: z.string(),

  thesis: z.string(),

  strengths: z.array(z.string()),

  risks: z.array(z.string()),

  catalysts: z.array(z.string()),

  valuationLabel: z.enum([
    "Undervalued",
    "Fairly Valued",
    "Overvalued",
  ]),

  valuationView: z.string(),

  verdictRationale: z.string(),
});

const normalizeModelContent = (content) => {
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;

        if (part && typeof part === "object") {
          if (typeof part.text === "string") return part.text;
          if (typeof part.content === "string") return part.content;
        }

        return "";
      })
      .join("");
  }

  if (content && typeof content === "object") {
    return JSON.stringify(content);
  }

  return "";
};

const extractJsonPayload = (rawContent) => {
  const trimmed = rawContent.trim();

  if (!trimmed) {
    throw new Error("Gemini returned an empty response");
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);

    if (fenced?.[1]) {
      return JSON.parse(fenced[1]);
    }

    throw new Error("Gemini returned invalid JSON");
  }
};

const normalizeAnalysis = (analysis, financialData, companyName) => {
  const recommendation =
    ["BUY", "HOLD", "SELL"].includes(
      String(analysis.recommendation).toUpperCase()
    )
      ? String(analysis.recommendation).toUpperCase()
      : "HOLD";

  const score = Number(analysis.score);

  const confidence = Number(analysis.confidence);

  return {
    company: analysis.company || companyName,

    ticker: financialData.ticker || "Not Available",

    currentPrice:
      financialData.currentPrice ?? "Not Available",

    marketCap:
      financialData.marketCap || "Not Available",

    exchange:
      financialData.exchange || "Not Available",

    industry:
      financialData.industry || "Not Available",

    recommendation,

    score: Number.isFinite(score) ? score : 50,

    confidence: Number.isFinite(confidence)
      ? confidence
      : 50,

    scoreBreakdown: {
      financialHealth: Number(analysis?.scoreBreakdown?.financialHealth) || 60,
      growth: Number(analysis?.scoreBreakdown?.growth) || 60,
      valuation: Number(analysis?.scoreBreakdown?.valuation) || 60,
      risk: Number(analysis?.scoreBreakdown?.risk) || 60,
      moat: Number(analysis?.scoreBreakdown?.moat) || 60,
      management: Number(analysis?.scoreBreakdown?.management) || 60,
      innovation: Number(analysis?.scoreBreakdown?.innovation) || 60,
    },

    summary: analysis.summary || "Not Available",

    thesis: analysis.thesis || "Not Available",

    strengths: Array.isArray(analysis.strengths)
      ? analysis.strengths
      : [],

    risks: Array.isArray(analysis.risks)
      ? analysis.risks
      : [],

    catalysts: Array.isArray(analysis.catalysts)
      ? analysis.catalysts
      : [],

    valuationLabel:
      analysis.valuationLabel || "Fairly Valued",

    valuationView:
      analysis.valuationView || "Not Available",

    verdictRationale:
      analysis.verdictRationale || "Not Available",
  };
};

const analyzeCompany = async (companyName) => {
  if (!companyName?.trim()) {
    throw new Error("Company name is required");
  }

  const trimmedCompany = companyName.trim();

  const researchData =
    await getCompanyResearch(trimmedCompany);

  const financialData =
    await getCompanyFinancialData(trimmedCompany);

  const chain = getInvestmentChain();

  const response = await chain.invoke({
    companyName: trimmedCompany,
    researchData,
    financialData: JSON.stringify(financialData, null, 2),
  });

  const rawContent = normalizeModelContent(
    response?.content ?? response
  );

  console.log("========== Gemini Raw Response ==========");
  console.log(rawContent);
  console.log("=========================================");

  const parsedContent = extractJsonPayload(rawContent);

  const finalAnalysis = normalizeAnalysis(
    parsedContent,
    financialData,
    trimmedCompany
  );

  return investmentAnalysisSchema.parse(finalAnalysis);
};

module.exports = {
  analyzeCompany,
  investmentAnalysisSchema,
};