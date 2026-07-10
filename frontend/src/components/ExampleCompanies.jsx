import { useNavigate } from "react-router-dom";

const companies = [
  { name: "Apple", domain: "apple.com" },
  { name: "Nvidia", domain: "nvidia.com" },
  { name: "Tesla", domain: "tesla.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Amazon", domain: "amazon.com" },
  { name: "Meta", domain: "meta.com" },
  { name: "TCS", domain: "tcs.com" },
];

const ExampleCompanies = () => {
  const navigate = useNavigate();

  const handleSelect = (name) => {
    navigate("/loading", { state: { company: name } });
  };

  const getBadgeLabel = (name) => name.charAt(0).toUpperCase();

  return (
    <div id="examples">
      <p className="text-secondary mb-3 text-sm font-medium">Try these companies</p>
      <div className="flex flex-wrap gap-3">
        {companies.map((company) => (
          <button
            key={company.name}
            type="button"
            onClick={() => handleSelect(company.name)}
            className="theme-transition bg-chip text-primary flex items-center gap-2 rounded-xl border border-default px-4 py-2 text-base shadow-sm transition hover:shadow-md"
          >
              <span className="bg-brand/15 text-brand flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold">
                {getBadgeLabel(company.name)}
              </span>
            {company.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExampleCompanies;
