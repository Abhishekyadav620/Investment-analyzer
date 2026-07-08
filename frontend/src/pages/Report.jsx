import { useLocation, useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import BackgroundEffects from "../components/BackgroundEffects";

const Report = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const company = state?.company;
  const report = state?.report;

  if (!company || !report) {
    return (
      <div className="theme-transition bg-page relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
          <p className="text-secondary mb-6">No report found.</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-primary flex items-center gap-2 rounded-xl px-6 py-3 font-semibold"
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
        <div className="mx-auto max-w-4xl px-6 py-10">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-secondary mb-8 flex items-center gap-2 transition-colors hover:text-brand"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <h1 className="text-primary mb-6 text-3xl font-bold">
            <span className="hero-gradient-text">{company}</span> — Investment Report
          </h1>

          <article className="theme-transition bg-card prose-report rounded-2xl border border-card p-8 leading-relaxed shadow-sm [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5">
            <ReactMarkdown>{report}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Report;
