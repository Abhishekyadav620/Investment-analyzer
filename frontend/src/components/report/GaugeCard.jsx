import { motion } from "framer-motion";
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

const gaugeStops = [
  { name: "Strong Sell", value: 20, fill: "#FEE2E2" },
  { name: "Sell", value: 20, fill: "#FECACA" },
  { name: "Hold", value: 20, fill: "#FDE68A" },
  { name: "Buy", value: 20, fill: "#BBF7D0" },
  { name: "Strong Buy", value: 20, fill: "#86EFAC" },
];

const recommendationToIndex = {
  "STRONG SELL": 0,
  SELL: 1,
  HOLD: 2,
  BUY: 3,
  "STRONG BUY": 4,
};

const GaugeCard = ({ recommendation = "HOLD" }) => {
  const activeIndex = recommendationToIndex[recommendation] ?? 2;
  const activeSegment = gaugeStops[activeIndex];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
      className="rounded-[24px] border border-[#F1E6DE] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">Recommendation Gauge</p>
          <p className="mt-2 text-2xl font-semibold text-[#111827]">{recommendation || "HOLD"}</p>
        </div>
      </div>

      <div className="relative mt-4 h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="72%"
            outerRadius="100%"
            data={gaugeStops}
            startAngle={180}
            endAngle={0}
            barSize={22}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" cornerRadius={999} clockWise />
          </RadialBarChart>
        </ResponsiveContainer>

        <motion.div
          initial={{ rotate: -90 }}
          animate={{ rotate: -90 + activeIndex * 36 + 18 }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
          className="pointer-events-none absolute left-1/2 top-[56%] h-[92px] w-[4px] origin-bottom rounded-full bg-[#111827] shadow-[0_8px_20px_rgba(17,24,39,0.2)]"
          style={{ marginLeft: -2 }}
        >
          <span className="absolute -top-2 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-white bg-[#FF6B2C] shadow-[0_8px_18px_rgba(255,107,44,0.25)]" />
        </motion.div>

        <div className="absolute inset-x-4 bottom-0 flex justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
          {gaugeStops.map((item) => (
            <span key={item.name} className={item.name === activeSegment.name ? "text-[#111827]" : ""}>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default GaugeCard;