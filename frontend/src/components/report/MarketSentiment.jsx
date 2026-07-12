import InfographicCard from "./InfographicCard";

const sentimentStops = [
  { key: "Bearish", value: 1, color: "#FCA5A5" },
  { key: "Neutral", value: 1, color: "#FDE68A" },
  { key: "Bullish", value: 1, color: "#86EFAC" },
];

const MarketSentiment = ({
  sentimentScore = 60,
  sentimentDescription = "",
}) => {
  const activeIndex = sentimentScore >= 67 ? 2 : sentimentScore >= 33 ? 1 : 0;
  const currentLabel = sentimentStops[activeIndex].key;
  const normalizedScore = Math.min(100, Math.max(0, sentimentScore));

  return (
    <InfographicCard
      title="Market Sentiment"
      heading={currentLabel}
      description={sentimentDescription || `Market sentiment towards the stock is ${currentLabel.toLowerCase()} based on analyst ratings and investor activity.`}
      gaugeData={sentimentStops}
      activeIndex={activeIndex}
      centerLabel="Sentiment"
      centerValue={currentLabel}
      statusPills={sentimentStops}
      delay={0.18}
    />
  );
};

export default MarketSentiment;
