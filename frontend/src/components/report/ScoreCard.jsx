import { motion } from "framer-motion";
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import AnimatedCounter from "./AnimatedCounter";

const ScoreCard = ({ score = 0, confidence = 0 }) => {
  const chartData = [{ name: "score", value: Math.max(0, Math.min(100, score)) }];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-[24px] border border-[#F1E6DE] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">AI Score</p>
      <div className="mt-5 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div className="relative h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="72%"
              outerRadius="100%"
              barSize={18}
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar dataKey="value" cornerRadius={999} fill="#FF6B2C" clockWise />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <AnimatedCounter value={score} decimals={0} className="text-5xl font-semibold tracking-tight text-[#111827]" />
            <span className="mt-1 text-sm font-medium text-[#6B7280]">/100</span>
          </div>
        </div>

        <div className="rounded-[22px] bg-[#FFF9F5] p-5 text-center md:min-w-[160px]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">Confidence</p>
          <AnimatedCounter value={confidence} suffix="%" className="mt-3 block text-4xl font-semibold text-[#111827]" />
          <p className="mt-2 text-sm text-[#6B7280]">Model confidence</p>
        </div>
      </div>
    </motion.section>
  );
};

export default ScoreCard;