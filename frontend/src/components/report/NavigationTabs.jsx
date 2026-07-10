import { motion } from "framer-motion";

const NavigationTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="sticky top-4 z-20 rounded-[22px] border border-[#F1E6DE] bg-white/92 px-3 py-3 shadow-[0_16px_40px_rgba(17,24,39,0.08)] backdrop-blur-xl">
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                isActive ? "text-[#111827]" : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="report-tab-pill"
                  className="absolute inset-0 rounded-full bg-[#FFF1EA]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                />
              ) : null}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;