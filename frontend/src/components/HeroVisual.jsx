import { TrendingUp, ArrowUpRight } from "lucide-react";
import rightSideImg from "../assets/rightsideimg.png";

const HeroVisual = () => {
  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      <div className="animate-float-slow hero-dashboard w-full max-w-[560px]">
        <div className="hero-dashboard-inner relative">
          <img
            src={rightSideImg}
            alt="Investment analysis dashboard with charts and AI insights"
          />

          <div className="float-card pointer-events-none absolute left-4 top-4 rounded-xl px-4 py-3 shadow-lg">
            <p className="float-card-label text-xs">Market Sentiment</p>
            <p className="text-sm font-bold text-emerald-500">Bullish +12.4%</p>
          </div>

          <div className="float-card pointer-events-none absolute right-4 top-6 rounded-xl px-4 py-3 shadow-lg">
            <p className="float-card-label text-xs">AI Confidence Score</p>
            <p className="text-lg font-bold text-brand">92%</p>
          </div>

          <div className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            <TrendingUp size={14} />
            Strong Buy
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
