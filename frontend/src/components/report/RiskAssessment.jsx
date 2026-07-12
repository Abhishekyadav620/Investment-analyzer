import InfographicCard from "./InfographicCard";

const riskStops = [
  { key: "High Risk", value: 1, color: "#FCA5A5" },
  { key: "Moderate Risk", value: 1, color: "#FDBA74" },
  { key: "Low Risk", value: 1, color: "#86EFAC" },
];

const RiskAssessment = ({
  riskScore = 60,
  riskDescription = "",
}) => {
  const activeIndex = riskScore >= 70 ? 2 : riskScore >= 40 ? 1 : 0;
  const currentLabel = riskStops[activeIndex].key;
  const normalizedScore = Math.min(100, Math.max(0, riskScore));

  return (
    <InfographicCard
      title="Risk Assessment"
      heading={currentLabel}
      description={riskDescription || `Overall investment risk profile is ${currentLabel.toLowerCase()} based on market and company-specific factors.`}
      gaugeData={riskStops}
      activeIndex={activeIndex}
      centerLabel="Risk Score"
      centerValue={`${normalizedScore}/100`}
      statusPills={riskStops}
      delay={0.16}
    />
  );
};

export default RiskAssessment;
