import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import axios from "axios";
import BackgroundEffects from "../components/BackgroundEffects";

const steps = [
  "Fetching financial data",
  "Scanning latest news",
  "Running SWOT analysis",
  "Generating investment recommendation",
];

const Loading = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const company = state?.company;
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!company) {
      navigate("/");
      return;
    }

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);

    const analyze = async () => {
      try {
        const { data } = await axios.post("http://localhost:5000/api/analyze", {
          company,
        });
        navigate("/report", { state: { company, report: data.report } });
      } catch {
        navigate("/report", {
          state: {
            company,
            report: `# ${company} — Analysis Unavailable\n\nThe backend server is not running. Start the backend and try again.`,
            error: true,
          },
        });
      }
    };

    analyze();

    return () => clearInterval(stepInterval);
  }, [company, navigate]);

  return (
    <div className="theme-transition bg-page relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <Loader2 className="text-brand mb-8 animate-spin" size={48} />
        <h1 className="text-primary mb-2 text-3xl font-bold">
          Analyzing <span className="hero-gradient-text">{company}</span>
        </h1>
        <p className="text-secondary mb-10">This may take a moment...</p>
        <ul className="w-full max-w-md space-y-3">
          {steps.map((step, index) => (
            <li
              key={step}
              className={`theme-transition flex items-center gap-3 rounded-xl border px-4 py-3 ${
                index <= currentStep ? "step-active" : "step-idle"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  index <= currentStep ? "bg-[var(--brand)]" : "bg-[var(--border-default)]"
                }`}
              />
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Loading;
