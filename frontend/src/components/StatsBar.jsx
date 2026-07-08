import { Lock, Shield, Users, Star, Zap } from "lucide-react";
import FadeIn from "./FadeIn";
import PageContainer from "./PageContainer";

const stats = [
  {
    icon: Lock,
    value: "Secure & Private",
    label: "Encrypted and never shared",
  },
  {
    icon: Shield,
    value: "No Data Stored",
    label: "Searches stay private",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Analyses Completed",
  },
  {
    icon: Star,
    value: "98%",
    label: "User Satisfaction",
  },
  {
    icon: Zap,
    value: "3s",
    label: "Average Response Time",
  },
];

const StatsBar = () => {
  return (
    <section id="about" className="theme-transition bg-stats relative z-10">
      <PageContainer>
        <FadeIn>
          <div className="flex min-h-[100px] items-center py-6">
            <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-5 md:gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.value} className="flex items-center gap-4">
                    <div className="theme-transition bg-stats-icon rounded-xl p-3">
                      <Icon className="text-brand" size={20} />
                    </div>
                    <div>
                      <p className="text-stats text-lg font-bold">{stat.value}</p>
                      <p className="text-stats-sub text-sm">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </PageContainer>
    </section>
  );
};

export default StatsBar;
