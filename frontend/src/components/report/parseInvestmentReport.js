const normalizeText = (value) => (typeof value === "string" ? value.replace(/\r\n/g, "\n") : "");

const cleanInlineMarkdown = (value) => {
  return normalizeText(value)
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*•]\s+/gm, "")
    .trim();
};

const normalizeHeading = (value) => cleanInlineMarkdown(value).toLowerCase();

const headingAliases = [
  { key: "recommendation", aliases: ["recommendation"] },
  { key: "summary", aliases: ["summary"] },
  { key: "thesis", aliases: ["thesis", "investment thesis"] },
  { key: "strengths", aliases: ["strengths", "key strengths"] },
  { key: "risks", aliases: ["risks", "key risks"] },
  { key: "catalysts", aliases: ["catalysts", "upside catalysts"] },
  { key: "valuation", aliases: ["valuation", "valuation view", "valuation outlook"] },
  { key: "verdict", aliases: ["analyst verdict", "verdict", "analyst notes"] },
  { key: "pros", aliases: ["pros"] },
  { key: "cons", aliases: ["cons"] },
];

const collectSections = (report) => {
  const lines = normalizeText(report).split("\n");
  const sections = new Map();
  let currentHeading = "";
  let buffer = [];

  const storeCurrent = () => {
    if (!currentHeading) {
      return;
    }

    const content = buffer.join("\n").trim();
    if (content) {
      sections.set(currentHeading, content);
    }
  };

  for (const line of lines) {
    const match = line.match(/^#{1,6}\s+(.+?)\s*$/);
    if (match) {
      storeCurrent();
      currentHeading = normalizeHeading(match[1]);
      buffer = [];
      continue;
    }

    buffer.push(line);
  }

  storeCurrent();
  return sections;
};

const getSectionByAlias = (sections, key) => {
  const entry = headingAliases.find((item) => item.key === key);
  if (!entry) {
    return "";
  }

  for (const alias of entry.aliases) {
    const content = sections.get(alias);
    if (content) {
      return content;
    }
  }

  return "";
};

const parseNumber = (source, pattern) => {
  const match = normalizeText(source).match(pattern);
  if (!match) {
    return null;
  }

  const numeric = Number.parseInt(match[1], 10);
  return Number.isFinite(numeric) ? numeric : null;
};

const parseRecommendation = (source) => {
  const match = normalizeText(source).match(/\b(STRONG\s+BUY|BUY|HOLD|SELL|STRONG\s+SELL)\b/i);
  return match ? match[1].replace(/\s+/g, " ").toUpperCase() : "";
};

const parseList = (source) => {
  const normalized = normalizeText(source);
  const lines = normalized
    .split("\n")
    .map((line) => cleanInlineMarkdown(line))
    .filter(Boolean);

  const bulletLines = lines
    .filter((line) => /^[-*•]\s+/.test(line))
    .map((line) => cleanInlineMarkdown(line.replace(/^[-*•]\s+/, "")))
    .filter(Boolean);

  if (bulletLines.length > 0) {
    return bulletLines;
  }

  if (lines.length > 1) {
    return lines;
  }

  return cleanInlineMarkdown(normalized)
    .split(/\.(?=\s+[A-Z0-9])|\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const getFirstParagraph = (report) => {
  const text = normalizeText(report).replace(/^#{1,6}\s+.+$/m, "").trim();
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => cleanInlineMarkdown(paragraph))
    .filter(Boolean);

  return paragraphs[0] || "";
};

const parseInvestmentReport = (report) => {
  const sections = collectSections(report);

  const recommendationSection = getSectionByAlias(sections, "recommendation") || report;
  const summarySection = getSectionByAlias(sections, "summary");
  const thesisSection = getSectionByAlias(sections, "thesis");
  const strengthsSection = getSectionByAlias(sections, "strengths");
  const risksSection = getSectionByAlias(sections, "risks");
  const catalystsSection = getSectionByAlias(sections, "catalysts");
  const valuationSection = getSectionByAlias(sections, "valuation");
  const verdictSection = getSectionByAlias(sections, "verdict");
  const prosSection = getSectionByAlias(sections, "pros");
  const consSection = getSectionByAlias(sections, "cons");

  const recommendation = parseRecommendation(recommendationSection);
  const score = parseNumber(recommendationSection, /Score\s*:?.*?(\d{1,3})/i);
  const confidence = parseNumber(recommendationSection, /Confidence\s*:?.*?(\d{1,3})/i);

  const summary = cleanInlineMarkdown(summarySection || getFirstParagraph(report));
  const thesis = cleanInlineMarkdown(thesisSection);
  const strengths = parseList(strengthsSection);
  const risks = parseList(risksSection);
  const catalysts = parseList(catalystsSection);
  const valuation = cleanInlineMarkdown(valuationSection);
  const verdict = cleanInlineMarkdown(verdictSection);
  const pros = parseList(prosSection);
  const cons = parseList(consSection);

  return {
    recommendation,
    score,
    confidence,
    summary,
    thesis,
    strengths,
    risks,
    catalysts,
    valuation,
    verdict,
    pros,
    cons,
  };
};

export default parseInvestmentReport;