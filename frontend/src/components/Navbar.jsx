import { BarChart3, ArrowRight, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import PageContainer from "./PageContainer";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Examples", href: "#examples" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className="theme-transition bg-nav relative z-30 border-b border-default backdrop-blur-md">
      <PageContainer className="flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <BarChart3 className="text-brand" size={28} />
          <span className="text-primary text-xl font-bold">InvestAI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link text-base font-medium">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-black/30 border border-default py-1.5 pl-2.5 pr-4 rounded-full">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full bg-orange-50 dark:bg-orange-500/10"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#FF6B2C]/10 text-[#FF6B2C] flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-semibold text-primary">{user.name}</span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="text-gray-500 dark:text-gray-400 hover:text-[#FF6B2C] dark:hover:text-[#FF6B2C] transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Log Out"
                aria-label="Log out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3.5">
              <Link
                to="/auth"
                className="text-sm font-bold text-secondary hover:text-primary transition-colors px-2 py-1"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="btn-primary flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </PageContainer>
    </header>
  );
};

export default Navbar;
