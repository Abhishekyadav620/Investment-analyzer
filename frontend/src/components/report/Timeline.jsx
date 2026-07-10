import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const defaultCatalysts = ["AI Deals", "Margin Expansion", "Cloud Growth", "International Expansion"];

const Timeline = ({ catalysts = [] }) => {
  const items = (catalysts.length ? catalysts : defaultCatalysts).slice(0, 4);

  if (!items.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-[24px] border border-[#F1E6DE] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">Catalysts Timeline</p>
          <p className="mt-2 text-lg font-semibold text-[#111827]">Upcoming milestones</p>
        </div>
        <ChevronRight className="text-[#FF6B2C]" size={20} />
      </div>

      <div className="mt-6 overflow-x-auto pb-2">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-4">
            {items.map((item, index) => (
              <div key={item} className="relative">
                <div className="rounded-[22px] border border-[#F4E8DF] bg-[#FFF9F5] px-4 py-5 text-center shadow-[0_12px_30px_rgba(17,24,39,0.04)]">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#FF6B2C]">Q{index + 1}</p>
                  <p className="mt-3 text-base font-semibold text-[#111827]">{item}</p>
                </div>
                {index < items.length - 1 ? (
                  <div className="absolute right-[-18px] top-1/2 hidden -translate-y-1/2 text-[#FF6B2C] lg:block">
                    <ChevronRight size={28} strokeWidth={2.25} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Timeline;