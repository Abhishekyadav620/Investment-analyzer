import { BarChart3, Newspaper, ShieldCheck, TrendingUp, ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";
import PageContainer from "./PageContainer";

const features = [
  {
    title: "Financial Analysis",
    description:
      "Deep dive into financial statements, ratios, growth metrics and key insights.",
    icon: BarChart3,
    iconBg: "icon-bg-brand",
    iconColor: "icon-brand",
    linkColor: "link-brand",
  },
  {
    title: "Latest News",
    description:
      "Real-time news aggregation and sentiment analysis from trusted sources.",
    icon: Newspaper,
    iconBg: "icon-bg-purple",
    iconColor: "icon-purple",
    linkColor: "link-purple",
  },
  {
    title: "SWOT Analysis",
    description:
      "AI-generated strengths, weaknesses, opportunities and threats analysis.",
    icon: ShieldCheck,
    iconBg: "icon-bg-green",
    iconColor: "icon-green",
    linkColor: "link-green",
  },
  {
    title: "Investment Recommendation",
    description:
      "AI-powered recommendations with confidence score and detailed reasoning.",
    icon: TrendingUp,
    iconBg: "icon-bg-red",
    iconColor: "icon-red",
    linkColor: "link-red",
  },
];

const FeatureCard = () => {
  return (
    <section id="features" className="relative z-10 pb-16 md:pb-24 lg:pb-[120px]">
      <PageContainer>
        <FadeIn>
          <h2 className="text-primary mb-12 text-3xl font-bold md:text-[2.5rem]">
            Everything you need to invest smarter
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="card-hover theme-transition bg-card flex h-full flex-col rounded-2xl border border-card p-8 shadow-sm"
                >
                  <div className={`inline-flex rounded-xl p-3 ${feature.iconBg}`}>
                    <Icon className={feature.iconColor} size={24} />
                  </div>
                  <h3 className="text-primary mt-6 text-2xl font-bold">{feature.title}</h3>
                  <p className="text-secondary mt-3 flex-1 text-base leading-[1.7]">
                    {feature.description}
                  </p>
                  <button
                    type="button"
                    className={`mt-6 flex items-center gap-1 text-base font-semibold ${feature.linkColor}`}
                  >
                    Learn more
                    <ArrowRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        </FadeIn>
      </PageContainer>
    </section>
  );
};

export default FeatureCard;
