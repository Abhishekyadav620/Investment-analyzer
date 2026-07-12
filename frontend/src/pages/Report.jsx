import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import BackgroundEffects from "../components/BackgroundEffects";
import ReportHeader from "../components/report/ReportHeader";
import NavigationTabs from "../components/report/NavigationTabs";
import ScoreCard from "../components/report/ScoreCard";
import GaugeCard from "../components/report/GaugeCard";
import ScoreBreakdown from "../components/report/ScoreBreakdown";
import StrengthCard from "../components/report/StrengthCard";
import RiskCard from "../components/report/RiskCard";
import ValuationChart from "../components/report/ValuationChart";
import Timeline from "../components/report/Timeline";
import ProsCons from "../components/report/ProsCons";
import AIAccordion from "../components/report/AIAccordion";
import RecommendationCard from "../components/report/RecommendationCard";
import GrowthAnalysis from "../components/report/GrowthAnalysis";
import ProfitabilityAnalysis from "../components/report/ProfitabilityAnalysis";
import FinancialHealth from "../components/report/FinancialHealth";
import RiskAssessment from "../components/report/RiskAssessment";
import MarketSentiment from "../components/report/MarketSentiment";
import TechnicalAnalysis from "../components/report/TechnicalAnalysis";
import parseInvestmentReport from "../components/report/parseInvestmentReport";
import { readInvestmentReport, saveInvestmentReport } from "../utils/reportStorage";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "financials", label: "Financials" },
  { id: "news", label: "News" },
  { id: "risks", label: "Risks" },
  { id: "valuation", label: "Valuation" },
  { id: "analytics", label: "Analytics" },
  { id: "ai-analysis", label: "AI Analysis" },
];

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const company = location.state?.company;
  const report = location.state?.report;
  const analysis = location.state?.analysis;

  const [resolvedReport, setResolvedReport] = useState(report ?? null);
  const [resolvedCompany, setResolvedCompany] = useState(company ?? null);
  const [resolvedAnalysis, setResolvedAnalysis] = useState(analysis ?? null);
  const [hasAttemptedRecovery, setHasAttemptedRecovery] = useState(Boolean(company && report));

  console.log("location.state:", location.state);
  console.log("Recovered storage:", readInvestmentReport());

  useEffect(() => {
    if (company && report) {
      saveInvestmentReport({
        company,
        report,
        analysis,
      });
      setResolvedCompany(company);
      setResolvedReport(report);
      setResolvedAnalysis(analysis ?? null);
      setHasAttemptedRecovery(true);
      return;
    }

    const saved = readInvestmentReport();
    if (saved?.company && saved?.report) {
      setResolvedAnalysis(saved.analysis ?? null);
      setResolvedCompany(saved.company);
      setResolvedReport(saved.report);
      setHasAttemptedRecovery(true);
      return;
    }

    console.log("Report unavailable because location.state and browser storage are empty", {
      locationState: location.state,
      sessionStorageValue: typeof window !== "undefined" ? window.sessionStorage.getItem("investmentReport") : null,
      localStorageValue: typeof window !== "undefined" ? window.localStorage.getItem("investmentReport") : null,
    });

    setHasAttemptedRecovery(true);
  }, [company, report, analysis, location.state]);

  const parsedReport = useMemo(() => parseInvestmentReport(resolvedReport || ""), [resolvedReport]);
  const [activeTab, setActiveTab] = useState("overview");

  const normalizedCompany =
    resolvedAnalysis?.company ||
    resolvedCompany ||
    "Investment Report";
  const ticker =
    resolvedAnalysis?.ticker ||
    "Not Available";
  const recommendation =
    resolvedAnalysis?.recommendation ||
    parsedReport.recommendation ||
    "HOLD";
  const score =
    resolvedAnalysis?.score ??
    parsedReport.score ??
    0;
  const confidence =
    resolvedAnalysis?.confidence ??
    parsedReport.confidence ??
    0;

  const riskLevel = score >= 75 ? "Low" : score >= 55 ? "Medium" : "High";
  const expectedReturn = recommendation === "SELL" ? -8 : recommendation === "HOLD" ? 12 : 18;
  const probability = confidence >= 80 ? "High" : confidence >= 60 ? "Medium" : "Low";

  useEffect(() => {
    const sections = tabs.map((tab) => document.getElementById(tab.id)).filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveTab(visible.target.id);
        }
      },
      {
        rootMargin: "-22% 0px -62% 0px",
        threshold: [0.08, 0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!hasAttemptedRecovery) {
    return (
      <div className="theme-transition bg-page relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="rounded-[24px] border border-[#F1E6DE] bg-white px-8 py-6 text-sm font-semibold text-[#6B7280] shadow-[0_20px_60px_rgba(17,24,39,0.06)]">
            Restoring report...
          </div>
        </div>
      </div>
    );
  }

  if (!resolvedReport || !resolvedCompany) {
    return (
      <div className="theme-transition bg-page relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
          <div className="max-w-md rounded-[24px] border border-[#F1E6DE] bg-white p-8 text-center shadow-[0_20px_60px_rgba(17,24,39,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6B7280]">Report unavailable</p>
            <h1 className="mt-4 text-3xl font-semibold text-[#111827]">Open a company analysis from the home page</h1>
            <p className="text-secondary mt-4 leading-7">
              The dashboard needs a company and markdown report in route state to render the structured view.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-primary mt-6 flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-transition bg-page relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <div className="relative z-10">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8 lg:py-10">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#6B7280] transition-colors hover:text-[#111827]"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <div className="space-y-6">
            <ReportHeader
              company={normalizedCompany}
              ticker={ticker}
              recommendation={recommendation}
              summary={
                resolvedAnalysis?.summary ??
                parsedReport.summary
              }
              currentPrice={resolvedAnalysis?.currentPrice}
              marketCap={resolvedAnalysis?.marketCap}
              exchange={resolvedAnalysis?.exchange}
              industry={resolvedAnalysis?.industry}
            />

            <NavigationTabs tabs={tabs} activeTab={activeTab} onTabChange={scrollToSection} />

            <section id="overview" className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <ScoreCard score={score} confidence={confidence} />
                <ScoreBreakdown
                  score={score}
                  breakdown={resolvedAnalysis?.scoreBreakdown}
                />
              </div>

              <GaugeCard recommendation={recommendation} />
            </section>

            <section id="financials" className="grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
              <StrengthCard strengths={parsedReport.strengths} />
              <RiskCard risks={parsedReport.risks} />
              <ValuationChart
                valuation={resolvedAnalysis?.valuationView}
                valuationLabel={resolvedAnalysis?.valuationLabel}
              />
            </section>

            <section id="news">
              <Timeline catalysts={parsedReport.catalysts} />
            </section>

            <section id="risks">
              <ProsCons pros={parsedReport.pros} cons={parsedReport.cons} />
            </section>

            <section id="valuation">
              <AIAccordion
                thesis={parsedReport.thesis}
                summary={parsedReport.summary}
                catalysts={parsedReport.catalysts}
                valuation={parsedReport.valuation}
                risks={parsedReport.risks}
                verdict={parsedReport.verdict}
              />
            </section>

            <section id="analytics" className="grid gap-6 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr]">
              <GrowthAnalysis
                growthScore={resolvedAnalysis?.scoreBreakdown?.growth}
                growthDescription={resolvedAnalysis?.growthDescription}
              />
              <ProfitabilityAnalysis
                profitabilityScore={resolvedAnalysis?.scoreBreakdown?.profitability}
                profitabilityDescription={resolvedAnalysis?.profitabilityDescription}
              />
              <FinancialHealth
                financialHealthScore={resolvedAnalysis?.scoreBreakdown?.financialHealth}
                financialHealthDescription={resolvedAnalysis?.financialHealthDescription}
              />
              <RiskAssessment
                riskScore={resolvedAnalysis?.scoreBreakdown?.risk}
                riskDescription={resolvedAnalysis?.riskDescription}
              />
              <MarketSentiment
                sentimentScore={resolvedAnalysis?.scoreBreakdown?.marketSentiment}
                sentimentDescription={resolvedAnalysis?.sentimentDescription}
              />
              <TechnicalAnalysis
                technicalScore={resolvedAnalysis?.scoreBreakdown?.technicalAnalysis}
                technicalDescription={resolvedAnalysis?.technicalDescription}
              />
            </section>

            <section id="ai-analysis">
              <RecommendationCard
                recommendation={recommendation}
                score={score}
                confidence={confidence}
                risk={riskLevel}
                investmentHorizon="3–5 Years"
                expectedReturn={expectedReturn}
                probability={probability}
                onViewDetails={() => scrollToSection("financials")}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
