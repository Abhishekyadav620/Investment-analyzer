import { Sparkles, Zap, UserX } from "lucide-react";
import SearchBar from "./SearchBar";
import HeroVisual from "./HeroVisual";
import FadeIn from "./FadeIn";
import PageContainer from "./PageContainer";

const trustItems = [
  { icon: Sparkles, label: "100% AI-Powered" },
  { icon: UserX, label: "No Signup Required" },
  { icon: Zap, label: "Instant Results" },
];

const HeroSection = () => {
  return (
    <section id="how-it-works" className="relative z-10 pt-8 pb-16 md:pt-10 md:pb-20 lg:pb-24">
      <PageContainer>
        <FadeIn className="grid grid-cols-12 items-center gap-8 lg:gap-12">
          <div className="col-span-12 flex flex-col items-start lg:col-span-6">
            <div className="theme-transition bg-badge inline-flex items-center gap-2 rounded-full border border-badge px-4 py-2 text-xs font-semibold tracking-wide text-brand">
              <Sparkles size={12} />
              AI POWERED INVESTMENT RESEARCH
            </div>

            <h1 className="text-primary mt-5 max-w-[600px] text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-[4rem]">
              <span className="hero-gradient-text">AI Investment</span>
              <br />
              Research Agent
            </h1>

            <p className="text-secondary mt-6 max-w-[600px] text-lg leading-[1.7]">
              Get comprehensive AI-powered analysis of any public company. Financials,
              news, SWOT analysis and investment recommendations in seconds.
            </p>

            <div className="mt-8 w-full max-w-[600px]">
              <SearchBar />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-8">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="text-secondary flex items-center gap-2 text-base">
                  <Icon size={16} className="text-brand" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <HeroVisual />
          </div>
        </FadeIn>
      </PageContainer>
    </section>
  );
};

export default HeroSection;
