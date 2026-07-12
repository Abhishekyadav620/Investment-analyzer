import { motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const InfographicCard = ({
  title = "",
  heading = "",
  description = "",
  gaugeData = [],
  activeIndex = 1,
  centerLabel = "Current",
  centerValue = "",
  statusPills = [],
  delay = 0.08,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="rounded-[24px] border border-[#F1E6DE] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">{title}</p>
          <p className="mt-2 text-lg font-semibold text-[#111827]">{heading}</p>
          <p className="mt-3 text-sm leading-6 text-[#6B7280]">
            {description}
          </p>
        </div>
        <span className="rounded-full bg-[#FFF1EA] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B2C]">
          {centerValue}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center gap-4 lg:flex-row lg:items-stretch">
        <div className="relative h-[220px] w-[220px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                dataKey="value"
                innerRadius={68}
                outerRadius={92}
                paddingAngle={6}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {gaugeData.map((entry, index) => (
                  <Cell key={entry.key} fill={entry.color} opacity={index === activeIndex ? 1 : 0.35} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">{centerLabel}</p>
            <p className="mt-2 text-lg font-semibold text-[#111827]">{centerValue}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-3">
          {statusPills.map((item, index) => (
            <div key={item.key} className="rounded-2xl bg-[#FFF9F5] px-4 py-3">
              <div className="flex items-center justify-between gap-4 text-sm font-semibold text-[#111827]">
                <span>{item.key}</span>
                <span>{index === activeIndex ? "Active" : ""}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default InfographicCard;
