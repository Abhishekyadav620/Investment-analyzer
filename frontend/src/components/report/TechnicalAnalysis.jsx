import InfographicCard from "./InfographicCard";

const technicalStops = [
  { key: "Bearish", value: 1, color: "#FCA5A5" },
  { key: "Neutral", value: 1, color: "#FDE68A" },
  { key: "Bullish", value: 1, color: "#86EFAC" },
];

const TechnicalAnalysis = ({
  technicalScore = 60,
  technicalDescription = "",
}) => {
  const activeIndex = technicalScore >= 67 ? 2 : technicalScore >= 33 ? 1 : 0;
  const currentLabel = technicalStops[activeIndex].key;
  const normalizedScore = Math.min(100, Math.max(0, technicalScore));

  return (
    <InfographicCard
      title="Technical Analysis"
      heading={currentLabel}
      description={technicalDescription || `Technical indicators suggest ${currentLabel.toLowerCase()} momentum based on price action and volume trends.`}
      gaugeData={technicalStops}
      activeIndex={activeIndex}
      centerLabel="Technical"
      centerValue={currentLabel}
      statusPills={technicalStops}
      delay={0.2}
    />
  );
};

export default TechnicalAnalysis;
