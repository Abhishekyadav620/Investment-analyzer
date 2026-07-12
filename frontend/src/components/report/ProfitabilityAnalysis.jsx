import InfographicCard from "./InfographicCard";

const profitabilityStops = [
  { key: "Poor", value: 1, color: "#FCA5A5" },
  { key: "Low", value: 1, color: "#FDBA74" },
  { key: "Moderate", value: 1, color: "#FDE68A" },
  { key: "High", value: 1, color: "#86EFAC" },
];

const ProfitabilityAnalysis = ({
  profitabilityScore = 60,
  profitabilityDescription = "",
}) => {
  const activeIndex = profitabilityScore >= 75 ? 3 : profitabilityScore >= 50 ? 2 : profitabilityScore >= 25 ? 1 : 0;
  const currentLabel = profitabilityStops[activeIndex].key;
  const normalizedScore = Math.min(100, Math.max(0, profitabilityScore));

  return (
    <InfographicCard
      title="Profitability Analysis"
      heading={currentLabel}
      description={profitabilityDescription || `Company demonstrates ${currentLabel.toLowerCase()} profitability margins and return on equity.`}
      gaugeData={profitabilityStops}
      activeIndex={activeIndex}
      centerLabel="Profit Score"
      centerValue={`${normalizedScore}/100`}
      statusPills={profitabilityStops}
      delay={0.12}
    />
  );
};

export default ProfitabilityAnalysis;
