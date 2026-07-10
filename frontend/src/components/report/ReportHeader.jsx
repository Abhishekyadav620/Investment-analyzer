import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const metricClass =
  "rounded-2xl border border-[#F3E8E1] bg-white/80 px-4 py-3 shadow-[0_10px_30px_rgba(17,24,39,0.04)]";

const InfoMetric = ({ label, value }) => (
  <div className={metricClass}>
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
      {label}
    </p>

    <p className="mt-2 text-sm font-semibold text-[#111827]">
      {value ?? "Not Available"}
    </p>
  </div>
);

const ReportHeader = ({
  company,
  ticker,
  recommendation,
  summary,

  currentPrice,
  marketCap,
  exchange,
  industry,
}) => {
  const initials = (company || ticker || "AI")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="rounded-[24px] border border-[#F1E6DE] bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.06)] md:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div className="flex items-start gap-5">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#FF6B2C_0%,#FFB18D_100%)] text-2xl font-black text-white shadow-[0_20px_40px_rgba(255,107,44,0.25)]">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold tracking-tight text-[#111827] md:text-4xl">
                  {company}
                </h1>

                {recommendation && (
                  <span className="rounded-full bg-[#FFF1EA] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B2C]">
                    {recommendation}
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#6B7280]">
                <span className="rounded-full bg-[#FFF9F5] px-3 py-1 font-semibold text-[#FF6B2C]">
                  {ticker}
                </span>

                <span className="hidden h-1 w-1 rounded-full bg-[#D1D5DB] sm:inline-block" />

                <span>Premium AI Investment Dashboard</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <InfoMetric
              label="Current Price"
              value={
                currentPrice !== undefined &&
                currentPrice !== null &&
                currentPrice !== "Not Available"
                  ? `$${currentPrice}`
                  : "Not Available"
              }
            />

            <InfoMetric
              label="Sector"
              value={industry}
            />

            <InfoMetric
              label="Market Cap"
              value={marketCap}
            />

            <InfoMetric
              label="Exchange"
              value={exchange}
            />

            <InfoMetric
              label="Ticker"
              value={ticker}
            />

            <InfoMetric
              label="Company"
              value={company}
            />

            <InfoMetric
              label="Source"
              value="Finnhub + Tavily + Gemini"
            />
          </div>
        </div>

        <div className="rounded-[22px] border border-[#F1E6DE] bg-[#FFF9F5] p-5 shadow-inner shadow-white/50">
          <div className="flex h-full flex-col justify-between gap-5">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
              <TrendingUp className="text-[#FF6B2C]" size={16} />
              AI Summary
            </div>

            <p className="text-base leading-7 text-[#111827] md:text-[17px]">
              {summary}
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white px-4 py-3 shadow-[0_10px_25px_rgba(17,24,39,0.04)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                  Company
                </p>

                <p className="mt-2 text-sm font-semibold text-[#111827]">
                  {company}
                </p>
              </div>

              <div className="rounded-2xl bg-white px-4 py-3 shadow-[0_10px_25px_rgba(17,24,39,0.04)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                  Ticker
                </p>

                <p className="mt-2 text-sm font-semibold text-[#111827]">
                  {ticker}
                </p>
              </div>

              <div className="rounded-2xl bg-white px-4 py-3 shadow-[0_10px_25px_rgba(17,24,39,0.04)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                  Brand
                </p>

                <p className="mt-2 text-sm font-semibold text-[#111827]">
                  InvestAI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ReportHeader;