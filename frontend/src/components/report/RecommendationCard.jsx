import { motion } from "framer-motion";
import { BadgePercent, ChevronRight, Clock3, CircleDollarSign, ShieldCheck, Star, Target } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const RecommendationCard = ({
  recommendation = "HOLD",
  score = 0,
  confidence = 0,
  risk = "Medium",
  investmentHorizon = "3–5 Years",
  expectedReturn = 18,
  probability = "High",
  onViewDetails,
}) => {
  const metrics = [
    { label: "Score", value: score, suffix: "", icon: Star },
    { label: "Confidence", value: confidence, suffix: "%", icon: BadgePercent },
    { label: "Risk", value: risk, icon: ShieldCheck },
    { label: "Investment Horizon", value: investmentHorizon, icon: Clock3 },
    { label: "Expected Return", value: expectedReturn, suffix: "%", icon: CircleDollarSign },
    { label: "Probability", value: probability, icon: Target },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
      className="rounded-3xl border border-[#F1E6DE] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">Final Recommendation</p>
          <div className="mt-3 flex items-center gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-[#111827]">{recommendation}</h2>
            <span className="rounded-full bg-[#FFF1EA] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B2C]">
              AI Verdict
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewDetails}
          className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-[0_12px_28px_rgba(255,107,44,0.25)]"
        >
          View Detailed Financials
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isNumeric = typeof metric.value === "number";

          return (
            <div key={metric.label} className="rounded-[22px] border border-[#F3E8E1] bg-[#FFF9F5] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#FF6B2C] shadow-[0_10px_20px_rgba(17,24,39,0.05)]">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">{metric.label}</p>
                  <div className="mt-1 text-xl font-semibold text-[#111827]">
                    {isNumeric ? (
                      <AnimatedCounter value={metric.value} suffix={metric.suffix || ""} />
                    ) : (
                      metric.value
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default RecommendationCard;