import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="rounded-[22px] border border-[#F1E6DE] bg-[#FFF9F5]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-base font-semibold text-[#111827]">{title}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="text-[#6B7280]" size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-7 text-[#111827]">{content}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const AIAccordion = ({ thesis = "", summary = "", catalysts = [], valuation = "", risks = [], verdict = "" }) => {
  const items = [
    { title: "Investment Thesis", content: thesis },
    { title: "Financial Analysis", content: summary },
    { title: "Market Analysis", content: catalysts.length ? catalysts.join(" • ") : "" },
    { title: "Technical Analysis", content: valuation },
    { title: "Macro Analysis", content: risks.length ? risks.join(" • ") : "" },
    { title: "Analyst Notes", content: verdict },
  ].filter((item) => item.content && item.content.trim().length > 0);

  const [activeIndex, setActiveIndex] = useState(items.length ? 0 : -1);

  if (!items.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="rounded-[24px] border border-[#F1E6DE] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1EA] text-[#FF6B2C]">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">AI Analysis</p>
          <p className="mt-2 text-lg font-semibold text-[#111827]">Expandable reasoning layers</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <AccordionItem
            key={item.title}
            title={item.title}
            content={item.content}
            isOpen={activeIndex === index}
            onToggle={() => setActiveIndex(activeIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default AIAccordion;