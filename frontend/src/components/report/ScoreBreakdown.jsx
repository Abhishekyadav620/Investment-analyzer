import { motion } from "framer-motion";
import { BarChart3 as BarChartIcon } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const buildDefaultBreakdown = (score = 50) => [
  { name: "Financial Health", value: score },
  { name: "Growth", value: score },
  { name: "Valuation", value: score },
  { name: "Risk", value: score },
  { name: "Moat", value: score },
  { name: "Management", value: score },
  { name: "Innovation", value: score },
];

const ScoreBreakdown = ({
  score = 50,
  breakdown,
}) => {
  const data = breakdown
    ? [
        {
          name: "Financial Health",
          value: breakdown.financialHealth,
        },
        {
          name: "Growth",
          value: breakdown.growth,
        },
        {
          name: "Valuation",
          value: breakdown.valuation,
        },
        {
          name: "Risk",
          value: breakdown.risk,
        },
        {
          name: "Moat",
          value: breakdown.moat,
        },
        {
          name: "Management",
          value: breakdown.management,
        },
        {
          name: "Innovation",
          value: breakdown.innovation,
        },
      ]
    : buildDefaultBreakdown(score);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-[24px] border border-[#F1E6DE] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">
            Score Breakdown
          </p>

          <p className="mt-2 text-lg font-semibold text-[#111827]">
            AI-derived pillar view
          </p>
        </div>

        <BarChartIcon
          className="text-[#FF6B2C]"
          size={20}
        />
      </div>

      <div className="mt-5 h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              left: 10,
              right: 8,
              top: 8,
              bottom: 8,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#F3E8E1"
            />

            <XAxis
              type="number"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={120}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [`${value}/100`, "Score"]}
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #F1E6DE",
              }}
            />

            <Bar
              dataKey="value"
              fill="#FF6B2C"
              radius={[0, 999, 999, 0]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
};

export default ScoreBreakdown;