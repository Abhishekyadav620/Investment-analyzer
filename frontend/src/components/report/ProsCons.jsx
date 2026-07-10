import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const ListCard = ({ title, items, tone, icon: Icon, accentClass, bgClass }) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className={`rounded-[22px] border p-5 ${bgClass}`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accentClass}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">{title}</p>
          <p className="mt-1 text-base font-semibold text-[#111827]">{tone}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {items.slice(0, 5).map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-[0_10px_24px_rgba(17,24,39,0.04)]">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-current/10 text-current">
              <span className="h-2 w-2 rounded-full bg-current" />
            </span>
            <p className="text-sm leading-6 text-[#111827]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProsCons = ({ pros = [], cons = [] }) => {
  if (!pros.length && !cons.length) {
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7280]">Pros & Cons</p>
          <p className="mt-2 text-lg font-semibold text-[#111827]">Balanced decision lens</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <ListCard
          title="Pros"
          items={pros}
          tone="What strengthens the case"
          icon={ArrowUpRight}
          accentClass="bg-[#ECFDF5] text-[#22C55E]"
          bgClass="border-[#DDF3E6] bg-[#F8FFFB]"
        />
        <ListCard
          title="Cons"
          items={cons}
          tone="What pressures the case"
          icon={ArrowDownRight}
          accentClass="bg-[#FEF2F2] text-[#EF4444]"
          bgClass="border-[#FAD6D6] bg-[#FFF7F7]"
        />
      </div>
    </motion.section>
  );
};

export default ProsCons;