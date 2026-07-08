import { BarChart3, ArrowRight } from "lucide-react";
import PageContainer from "./PageContainer";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Examples", href: "#examples" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  return (
    <header className="theme-transition bg-nav relative z-30 border-b border-default backdrop-blur-md">
      <PageContainer className="flex h-20 items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <BarChart3 className="text-brand" size={28} />
          <span className="text-primary text-xl font-bold">InvestAI</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link text-base font-medium">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#search"
            className="btn-primary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            Get Started
            <ArrowRight size={16} />
          </a>
        </div>
      </PageContainer>
    </header>
  );
};

export default Navbar;
