import { useState, useEffect } from "react";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ExampleCompanies from "./ExampleCompanies";
import { useAuth } from "../context/AuthContext";
import { FaApple, FaAmazon, FaMicrosoft } from "react-icons/fa";
import { SiTesla, SiNvidia, SiMeta } from "react-icons/si";
import { Building2 } from "lucide-react";

const SearchBar = () => {
  const [company, setCompany] = useState("");
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, pendingSearchQuery, setPendingSearchQuery, setShowAuthModal } = useAuth();

  // Automatic search resumption after login
  useEffect(() => {
    if (isLoggedIn && pendingSearchQuery) {
      setCompany(pendingSearchQuery);
      setIsLoadingLocal(true);
      const timer = setTimeout(() => {
        setIsLoadingLocal(false);
        navigate("/loading", { state: { company: pendingSearchQuery } });
        setPendingSearchQuery(""); // Clear the pending query
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, pendingSearchQuery, navigate, setPendingSearchQuery]);

  const handleSubmit = () => {
    const trimmed = company.trim();
    if (trimmed === "") return;

    if (isLoggedIn) {
      // Normal flow for logged-in users
      navigate("/loading", { state: { company: trimmed } });
    } else {
      // Unauthenticated search interception with 0.8s loader
      setIsLoadingLocal(true);
      setTimeout(() => {
        setIsLoadingLocal(false);
        setPendingSearchQuery(trimmed); // Store query for post-login auto-run
        setShowAuthModal(true); // Open premium warning modal
      }, 800);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div id="search" className="w-full max-w-[600px]">
      <div className="theme-transition bg-input flex h-16 overflow-hidden rounded-2xl border border-default shadow-sm focus-within:border-[#FF6B2C] focus-within:ring-2 focus-within:ring-[#FF6B2C]/10">
        <div className="flex w-[70%] items-center gap-3 px-4">
          <Search className="text-secondary shrink-0" size={20} />
          <input
            type="text"
            placeholder="Enter company name (e.g. Apple, Tesla, Microsoft)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoadingLocal}
            className="text-primary min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-secondary disabled:opacity-50"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoadingLocal}
          className="btn-primary flex w-[30%] items-center justify-center gap-2 text-sm font-semibold cursor-pointer disabled:opacity-70"
          style={{
            background: "linear-gradient(to right, #FF6B2C, #FF8A4D)",
          }}
        >
          {isLoadingLocal ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Sparkles size={16} />
          )}
          <span className="hidden sm:inline">
            {isLoadingLocal ? "Analyzing..." : "Analyze Company"}
          </span>
          <span className="sm:hidden">
            {isLoadingLocal ? "Wait..." : "Analyze"}
          </span>
        </button>
      </div>

      <div className="mt-5">
        <ExampleCompanies />
      </div>
    </div>
  );
};

export default SearchBar;
