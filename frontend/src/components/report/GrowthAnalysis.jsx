import InfographicCard from "./InfographicCard";

const growthStops = [
  { key: "Declining", value: 1, color: "#FCA5A5" },
  { key: "Stagnant", value: 1, color: "#FDBA74" },
  { key: "Moderate", value: 1, color: "#FDE68A" },
  { key: "Strong", value: 1, color: "#86EFAC" },
];

const GrowthAnalysis = ({
  growthScore = 60,
  growthDescription = "",
}) => {
  const activeIndex = growthScore >= 75 ? 3 : growthScore >= 50 ? 2 : growthScore >= 25 ? 1 : 0;
  const currentLabel = growthStops[activeIndex].key;
  const normalizedScore = Math.min(100, Math.max(0, growthScore));

  return (
    <InfographicCard
      title="Growth Analysis"
      heading={currentLabel}
      description={growthDescription || `Company shows ${currentLabel.toLowerCase()} growth trajectory based on revenue and earnings trends.`}
      gaugeData={growthStops}
      activeIndex={activeIndex}
      centerLabel="Growth Score"
      centerValue={`${normalizedScore}/100`}
      statusPills={growthStops}
      delay={0.1}
    />
  );
};

export default GrowthAnalysis;
