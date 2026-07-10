import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const StrengthCard = ({ strengths = [] }) => {
  if (!strengths.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
      className="rounded-[24px] border border-[#DDF3E6] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">Strengths</p>
          <p className="mt-2 text-lg font-semibold text-[#111827]">What supports the thesis</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#22C55E]">
          <ShieldCheck size={22} />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {strengths.slice(0, 5).map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#F8FFFB] px-4 py-3">
            <CheckCircle2 className="mt-0.5 shrink-0 text-[#22C55E]" size={18} />
            <p className="text-sm leading-6 text-[#111827]">{item}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default StrengthCard;