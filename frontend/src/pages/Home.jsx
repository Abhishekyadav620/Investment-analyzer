import { AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import BackgroundEffects from "../components/BackgroundEffects";
import StatsBar from "../components/StatsBar";
import LoginRequiredModal from "../components/LoginRequiredModal";

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
      
      <AnimatePresence>
        <LoginRequiredModal />
      </AnimatePresence>
    </div>
  );
};

export default Home;
