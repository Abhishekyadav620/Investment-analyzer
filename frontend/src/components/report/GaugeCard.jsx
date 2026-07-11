import { motion } from "framer-motion";

const recommendationAngles = {
  "STRONG SELL": -90,
  SELL: -45,
  HOLD: 0,
  BUY: 45,
  "STRONG BUY": 90,
};

const GaugeCard = ({ recommendation = "HOLD" }) => {
  const angle =
    recommendationAngles[
      recommendation.toUpperCase()
    ] ?? 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-[24px] border border-[#F1E6DE] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">
        Recommendation Gauge
      </p>

      <h2 className="mt-2 text-3xl font-bold text-[#111827]">
        {recommendation}
      </h2>

      <div className="mt-8 flex justify-center">
        <div className="relative w-[340px] h-[220px]">

          {/* Gauge */}
          <svg
            viewBox="0 0 300 180"
            className="w-full h-full"
          >
            {/* Strong Sell */}
            <path
              d="M40 150 A110 110 0 0 1 82 72"
              stroke="#FCA5A5"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />

            {/* Sell */}
            <path
              d="M82 72 A110 110 0 0 1 128 45"
              stroke="#FECACA"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />

            {/* Hold */}
            <path
              d="M128 45 A110 110 0 0 1 172 45"
              stroke="#FDE68A"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />

            {/* Buy */}
            <path
              d="M172 45 A110 110 0 0 1 218 72"
              stroke="#BBF7D0"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />

            {/* Strong Buy */}
            <path
              d="M218 72 A110 110 0 0 1 260 150"
              stroke="#86EFAC"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Needle */}
          <motion.div
            initial={{ rotate: -90 }}
            animate={{ rotate: angle }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 12,
            }}
            className="absolute left-1/2 bottom-[34px] origin-bottom"
            style={{
              width: "4px",
              height: "105px",
              marginLeft: "-2px",
              background: "#111827",
              borderRadius: "999px",
            }}
          >
            <div
              className="absolute -top-2 left-1/2 h-5 w-5 rounded-full border-4 border-white bg-[#FF6B2C]"
              style={{
                transform: "translateX(-50%)",
              }}
            />
          </motion.div>

          {/* Center circle */}
          <div
            className="absolute left-1/2 bottom-[28px] h-5 w-5 rounded-full bg-[#111827]"
            style={{
              transform: "translateX(-50%)",
            }}
          />

          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
            <span>Strong Sell</span>
            <span>Sell</span>
            <span>Hold</span>
            <span>Buy</span>
            <span>Strong Buy</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default GaugeCard;