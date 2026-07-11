import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LoginRequiredModal = () => {
  const { showAuthModal, setShowAuthModal, setPendingSearchQuery } = useAuth();
  const navigate = useNavigate();

  if (!showAuthModal) return null;

  const handleAction = (tab) => {
    setShowAuthModal(false);
    navigate("/auth", { state: { activeTab: tab } });
  };

  const handleClose = () => {
    setShowAuthModal(false);
    setPendingSearchQuery(""); // Clear the stored query
  };

  const benefits = [
    "AI Investment Research",
    "Company Financial Analysis",
    "Real-time Market Data",
    "Buy/Sell Recommendation",
    "Risk Analysis",
    "Valuation Metrics",
    "Portfolio Insights",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/45 backdrop-blur-[6px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <motion.div
        className="w-full max-w-[500px] bg-white dark:bg-[#111622] rounded-[24px] border border-[#FFD8C4] dark:border-gray-800 shadow-[0_20px_50px_rgba(255,107,44,0.12)] p-6 md:p-8 relative z-10 overflow-hidden"
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        {/* Glow corner accent */}
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20"
          style={{ backgroundColor: "#FF6B2C" }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <span className="text-3xl mb-3 block">🔒</span>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
            Login Required
          </h3>
        </div>

        {/* Message and list of features */}
        <div className="space-y-4 mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold text-center leading-relaxed">
            Please sign in to InvestAI before searching for companies.
          </p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
            Create a free account to unlock:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-sm mx-auto bg-[#FFF9F5] dark:bg-black/15 p-4 rounded-2xl border border-[#FFD8C4]/40">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <div className="h-4 w-4 rounded-full bg-[#FF6B2C]/10 text-[#FF6B2C] flex items-center justify-center shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Button Panel */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleAction("login")}
            className="w-full py-3.5 px-6 font-bold text-white rounded-xl bg-gradient-to-r from-[#FF6B2C] to-[#FF8A4D] hover:shadow-[0_4px_16px_rgba(255,107,44,0.25)] transition-all duration-300 transform active:scale-[0.98] cursor-pointer text-center"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => handleAction("signup")}
            className="w-full py-3.5 px-6 font-bold text-[#FF6B2C] bg-[#FFF3EB] dark:bg-transparent border border-[#FFD8C4] hover:bg-[#FFE7D8] dark:hover:bg-gray-800 rounded-xl transition-all duration-300 transform active:scale-[0.98] cursor-pointer text-center"
          >
            Create Account
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="mt-1 text-center text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer py-1"
          >
            Continue Browsing
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginRequiredModal;
