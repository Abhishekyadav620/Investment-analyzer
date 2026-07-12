import InfographicCard from "./InfographicCard";

const healthStops = [
  { key: "Critical", value: 1, color: "#FCA5A5" },
  { key: "Weak", value: 1, color: "#FDBA74" },
  { key: "Stable", value: 1, color: "#FDE68A" },
  { key: "Strong", value: 1, color: "#86EFAC" },
];

const FinancialHealth = ({
  financialHealthScore = 60,
  financialHealthDescription = "",
}) => {
  const activeIndex = financialHealthScore >= 75 ? 3 : financialHealthScore >= 50 ? 2 : financialHealthScore >= 25 ? 1 : 0;
  const currentLabel = healthStops[activeIndex].key;
  const normalizedScore = Math.min(100, Math.max(0, financialHealthScore));

  return (
    <InfographicCard
      title="Financial Health"
      heading={currentLabel}
      description={financialHealthDescription || `Company's balance sheet and cash flow indicate ${currentLabel.toLowerCase()} financial position.`}
      gaugeData={healthStops}
      activeIndex={activeIndex}
      centerLabel="Health Score"
      centerValue={`${normalizedScore}/100`}
      statusPills={healthStops}
      delay={0.14}
    />
  );
};

export default FinancialHealth;
