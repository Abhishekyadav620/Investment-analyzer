import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import BackgroundEffects from "../components/BackgroundEffects";
import StatsBar from "../components/StatsBar";

const Home = () => {
  return (
    <div className="theme-transition bg-page relative min-h-screen">
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <FeatureCard />
      </main>
      <StatsBar />
    </div>
  );
};

export default Home;
