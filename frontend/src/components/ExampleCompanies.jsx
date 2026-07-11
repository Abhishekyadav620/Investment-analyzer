import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Building2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

import { FaApple, FaAmazon, FaMicrosoft } from "react-icons/fa";
import { SiTesla, SiNvidia, SiMeta } from "react-icons/si";

const companies = [
  {
    name: "Apple",
    icon: FaApple,
  },
  {
    name: "Nvidia",
    icon: SiNvidia,
  },
  {
    name: "Tesla",
    icon: SiTesla,
  },
  {
    name: "Microsoft",
    icon: FaMicrosoft,
  },
  {
    name: "Amazon",
    icon: FaAmazon,
  },
  {
    name: "Meta",
    icon: SiMeta,
  },
  {
    name: "TCS",
    icon: Building2,
  },
  {
    name: "Reliance",
    icon: Building2,
  },
];

const ExampleCompanies = () => {
  const navigate = useNavigate();
  const [loadingCompany, setLoadingCompany] = useState("");

  const {
    isLoggedIn,
    setPendingSearchQuery,
    setShowAuthModal,
  } = useAuth();

  const handleSelect = (name) => {
    if (loadingCompany) return;

    if (isLoggedIn) {
      navigate("/loading", {
        state: { company: name },
      });
    } else {
      setLoadingCompany(name);

      setTimeout(() => {
        setLoadingCompany("");
        setPendingSearchQuery(name);
        setShowAuthModal(true);
      }, 800);
    }
  };

  return (
    <div id="examples">
      <p className="text-secondary mb-3 text-sm font-medium">
        Try these companies
      </p>

      <div className="flex flex-wrap gap-3">
        {companies.map((company) => {
          const Icon = company.icon;
          const isLoading = loadingCompany === company.name;

          return (
            <button
              key={company.name}
              type="button"
              onClick={() => handleSelect(company.name)}
              disabled={loadingCompany !== "" && !isLoading}
              className="group theme-transition bg-chip text-primary flex items-center gap-3 rounded-xl border border-[#FFD8C4] dark:border-gray-800 px-4 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B2C] hover:bg-[#FFF0E6] hover:shadow-lg cursor-pointer disabled:opacity-50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B2C]/10 text-[#FF6B2C] transition-all duration-300 group-hover:bg-[#FF6B2C] group-hover:text-white">
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Icon size={18} />
                )}
              </span>

              <span className="text-sm font-medium">
                {company.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExampleCompanies;