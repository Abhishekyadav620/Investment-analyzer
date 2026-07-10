import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ExampleCompanies from "./ExampleCompanies";

const SearchBar = () => {
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (company.trim() === "") return;
    console.log("SearchBar navigating to /loading", { company: company.trim() });
    navigate("/loading", { state: { company: company.trim() } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div id="search" className="w-full max-w-[600px]">
      <div className="theme-transition bg-input flex h-16 overflow-hidden rounded-2xl border border-default shadow-sm">
        <div className="flex w-[70%] items-center gap-3 px-4">
          <Search className="text-secondary shrink-0" size={20} />
          <input
            type="text"
            placeholder="Enter company name (e.g. Apple, Tesla, Microsoft)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-primary min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-secondary"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary flex w-[30%] items-center justify-center gap-2 text-sm font-semibold"
        >
          <Sparkles size={16} />
          <span className="hidden sm:inline">Analyze Company</span>
          <span className="sm:hidden">Analyze</span>
        </button>
      </div>

      <div className="mt-5">
        <ExampleCompanies />
      </div>
    </div>
  );
};

export default SearchBar;
