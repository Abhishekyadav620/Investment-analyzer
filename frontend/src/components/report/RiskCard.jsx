import { motion } from "framer-motion";
import { TriangleAlert, XCircle } from "lucide-react";

const RiskCard = ({ risks = [] }) => {
  if (!risks.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="rounded-[24px] border border-[#FAD6D6] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">Risks</p>
          <p className="mt-2 text-lg font-semibold text-[#111827]">What could go wrong</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEF2F2] text-[#EF4444]">
          <TriangleAlert size={22} />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {risks.slice(0, 5).map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#FFF7F7] px-4 py-3">
            <XCircle className="mt-0.5 shrink-0 text-[#EF4444]" size={18} />
            <p className="text-sm leading-6 text-[#111827]">{item}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default RiskCard;