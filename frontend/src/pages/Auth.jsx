import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  BarChart3,
  ArrowRight,
  TrendingUp,
  Activity,
  Award,
  CheckCircle2,
  X,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import FloatingInput from "../components/FloatingInput";
import heroImage from "../assets/leftsideLogin.png";

// Google G-Logo SVG Component
const GoogleIcon = () => (
  <svg className="mr-2.5 h-4 w-4" viewBox="0 0 24 24" width="16" height="16">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, startGoogleAuth, isLoggedIn } = useAuth();

  // Tab State: "login" or "signup"
  const [activeTab, setActiveTab] = useState("login");

  // Read location state for tab switching triggers (redirects from search block)
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  // Redirection when logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Form Field States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Form Validation & Interaction States
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Google OAuth Popup Simulation State
  const [googleAuthMode, setGoogleAuthMode] = useState(null); // 'login' | 'signup' | null
  const [googleStep] = useState(0); // 0: select profile, 1: loading, 2: success

  // Candle Chart hover details state
  const [hoveredCandle, setHoveredCandle] = useState(null);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(loginEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (loginPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await login(loginEmail, loginPassword, rememberMe);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setErrors({ form: err.message || "Authentication failed." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (signupName.trim().length < 2) {
      newErrors.name = "Full Name must be at least 2 characters.";
    }
    if (!validateEmail(signupEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
    if (signupPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!passwordRegex.test(signupPassword)) {
      newErrors.password = "Password must include at least one letter, one number, and one special character.";
    }
    if (signupPassword !== signupConfirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the Terms & Privacy Policy.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await signup(signupName, signupEmail, signupPassword);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setErrors({ form: err.message || "Registration failed." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerGoogleAuth = () => {
    startGoogleAuth();
  };


  // Mock Candle Chart Details
  const candleData = [
    { o: 120, h: 135, l: 115, c: 130, date: "10:00 AM", isBull: true },
    { o: 130, h: 142, l: 128, c: 138, date: "11:00 AM", isBull: true },
    { o: 138, h: 140, l: 122, c: 125, date: "12:00 PM", isBull: false },
    { o: 125, h: 134, l: 120, c: 132, date: "01:00 PM", isBull: true },
    { o: 132, h: 155, l: 130, c: 150, date: "02:00 PM", isBull: true },
  ];

  return (
    <div
      className="flex min-h-screen lg:h-screen lg:overflow-hidden items-center justify-center transition-colors duration-300 relative"
      style={{
        background: "linear-gradient(135deg, #FFF9F5 0%, #FFF3EB 45%, #FFE7D8 100%)",
        color: "#111827",
      }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-40 animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(255,107,44,0.2) 0%, rgba(255,107,44,0) 70%)"
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(255,163,102,0.15) 0%, rgba(255,163,102,0) 70%)"
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 z-10 flex h-screen items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center">

          {/* ────────────────── LEFT COLUMN (45%): BRANDING & ILLUSTRATION ────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start py-8 select-none">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-[#FF6B2C] to-[#FF8A4D] text-white">
                <BarChart3 size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#111827]">
                InvestAI
              </span>
            </div>

            {/* Headline and Subtext */}
            <div className="text-center lg:text-left mb-12 max-w-xl mx-auto lg:mx-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#111827]">
                Invest Smarter <br />
                <span className="text-[#FF6B2C]">with AI</span>
              </h1>
              <p className="text-[16px] text-[#6B7280] leading-relaxed">
                Professional investment research powered by artificial intelligence and real-time financial data.
              </p>
            </div>

            {/* Clean Abstract Design */}
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              {/* Abstract geometric shapes */}
              <div className="relative">
                {/* Large circle */}
                <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br from-[#FF6B2C]/20 to-[#FF8A4D]/10" />
                
                {/* Medium circle */}
                <div className="absolute top-20 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-[#FF8A4D]/15 to-[#FF6B2C]/5" />
                
                {/* Small accent */}
                <div className="absolute bottom-10 left-20 w-16 h-16 rounded-full bg-[#FF6B2C]/10" />
                
                {/* Grid pattern overlay */}
                <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-sm">
                  <div className="space-y-4">
                    {/* Feature 1 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FF6B2C]/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp size={16} className="text-[#FF6B2C]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#111827] text-sm">AI-Powered Analysis</h3>
                        <p className="text-xs text-[#6B7280] mt-1">Advanced algorithms for market insights</p>
                      </div>
                    </div>
                    
                    {/* Feature 2 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center flex-shrink-0">
                        <Activity size={16} className="text-[#22C55E]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#111827] text-sm">Real-Time Data</h3>
                        <p className="text-xs text-[#6B7280] mt-1">Live market updates and tracking</p>
                      </div>
                    </div>
                    
                    {/* Feature 3 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                        <Award size={16} className="text-[#3B82F6]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#111827] text-sm">Portfolio Optimization</h3>
                        <p className="text-xs text-[#6B7280] mt-1">Smart recommendations for growth</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────── RIGHT COLUMN (55%): AUTHENTICATION CARD ────────────────── */}
          <div className="lg:col-span-7 flex justify-center py-8">

            {/* Clean White Authentication Card */}
            <motion.div
              className="w-full max-w-[420px] bg-white rounded-2xl border border-[#FF6B2C]/20 shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Form Success Animation overlay */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    className="absolute inset-0 rounded-[24px] bg-[#FFF8F2] z-20 flex flex-col items-center justify-center p-8 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-[#FFF3EB] rounded-full flex items-center justify-center mb-4 text-[#FF6B2C]"
                    >
                      <CheckCircle2 size={36} />
                    </motion.div>
                    <h3 className="text-xl font-extrabold mb-1 text-[#111827]">Welcome back!</h3>
                    <p className="text-gray-500 text-xs max-w-xs font-semibold">
                      Authenticating session and returning to research...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-[#111827]">
                  {activeTab === "login" ? "Welcome Back" : "Create your account"}
                </h2>
                <p className="text-sm text-[#6B7280]">
                  {activeTab === "login"
                    ? "Sign in to continue using InvestAI."
                    : "Join professional investors on the leading AI analytics network."}
                </p>
              </div>

              {/* Top Sliding Tab Indicator Selector */}
              <div className="relative flex p-1 bg-gray-100 rounded-lg mb-6">

                {/* Active Tab sliding backdrop capsule */}
                <motion.div
                  className="absolute top-1 bottom-1 rounded-md bg-white shadow-sm"
                  layoutId="activeTabPill"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  style={{
                    width: "calc(50% - 4px)",
                    left: activeTab === "login" ? "4px" : "50%",
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("login");
                    setErrors({});
                  }}
                  className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${activeTab === "login"
                    ? "text-[#111827]"
                    : "text-[#6B7280] hover:text-[#111827]"
                    }`}
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("signup");
                    setErrors({});
                  }}
                  className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${activeTab === "signup"
                    ? "text-[#111827]"
                    : "text-[#6B7280] hover:text-[#111827]"
                    }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Validation Global Error */}
              {errors.form && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex gap-2 text-red-600 text-sm items-center">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Tab Form Views */}
              <AnimatePresence mode="wait">
                {activeTab === "login" ? (
                  /* ── LOGIN FORM VIEW ── */
                  <motion.form
                    key="loginForm"
                    onSubmit={handleLoginSubmit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    noValidate
                  >
                    <FloatingInput
                      id="login-email"
                      type="email"
                      label="Email Address"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      icon={Mail}
                      error={errors.email}
                      required
                    />

                    <FloatingInput
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      label="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      icon={Lock}
                      error={errors.password}
                      required
                      rightElement={
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="p-1 text-gray-400 hover:text-[#FF6B2C] transition-colors focus:outline-none cursor-pointer"
                          aria-label={showLoginPassword ? "Hide password" : "Show password"}
                        >
                          {showLoginPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      }
                    />

                    <div className="flex items-center justify-between mb-5">
                      <label className="flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-all mr-2 ${rememberMe
                            ? "bg-[#FF6B2C] border-[#FF6B2C] text-white shadow-sm"
                            : "border-[#FFD8C4] hover:border-[#FF6B2C] bg-white"
                            }`}
                        >
                          {rememberMe && (
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-gray-500">Remember Me</span>
                      </label>

                      <a
                        href="#forgot"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("A simulation password reset link has been dispatched.");
                        }}
                        className="text-[11px] font-extrabold text-[#FF6B2C] hover:text-[#FF8A4D] transition-colors"
                      >
                        Forgot Password?
                      </a>
                    </div>

                    {/* Primary Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 font-semibold text-white rounded-lg bg-gradient-to-r from-[#FF6B2C] to-[#FF8A4D] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-250 disabled:opacity-50 flex items-center justify-center cursor-pointer text-sm"
                    >
                      {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className="flex items-center gap-2">
                          Sign In
                          <ArrowRight size={16} />
                        </span>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-5">
                      <div className="flex-grow border-t border-gray-200" />
                      <span className="px-3 text-xs text-gray-400">or</span>
                      <div className="flex-grow border-t border-gray-200" />
                    </div>

                    {/* Google Button */}
                    <button
                      type="button"
                      onClick={() => triggerGoogleAuth("login")}
                      className="w-full py-3 px-6 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg flex items-center justify-center transition-all duration-250 hover:bg-gray-50 cursor-pointer text-sm"
                    >
                      <GoogleIcon />
                      Continue with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-[#6B7280]">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("signup");
                          setErrors({});
                        }}
                        className="font-semibold text-[#FF6B2C] hover:text-[#FF8A4D] transition-colors cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </p>
                  </motion.form>
                ) : (
                  /* ── SIGNUP FORM VIEW ── */
                  <motion.form
                    key="signupForm"
                    onSubmit={handleSignupSubmit}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    noValidate
                  >
                    <FloatingInput
                      id="signup-name"
                      type="text"
                      label="Full Name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      icon={User}
                      error={errors.name}
                      required
                    />

                    <FloatingInput
                      id="signup-email"
                      type="email"
                      label="Email Address"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      icon={Mail}
                      error={errors.email}
                      required
                    />

                    <FloatingInput
                      id="signup-password"
                      type={showSignupPassword ? "text" : "password"}
                      label="Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      icon={Lock}
                      error={errors.password}
                      required
                      rightElement={
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="p-1 text-gray-400 hover:text-[#FF6B2C] transition-colors focus:outline-none cursor-pointer"
                        >
                          {showSignupPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      }
                    />

                    <FloatingInput
                      id="signup-confirm-password"
                      type={showSignupPassword ? "text" : "password"}
                      label="Confirm Password"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      icon={Lock}
                      error={errors.confirmPassword}
                      required
                    />

                    <div className="flex flex-col mb-5">
                      <label className="flex items-start cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={agreeToTerms}
                          onChange={(e) => setAgreeToTerms(e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-all mr-2.5 mt-0.5 shrink-0 ${agreeToTerms
                            ? "bg-[#FF6B2C] border-[#FF6B2C] text-white shadow-sm"
                            : "border-[#FFD8C4] hover:border-[#FF6B2C] bg-white"
                            }`}
                        >
                          {agreeToTerms && (
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-gray-500 leading-normal">
                          I agree to the{" "}
                          <a
                            href="#terms"
                            onClick={(e) => {
                              e.preventDefault();
                              alert("Mockup terms agreement clicked.");
                            }}
                            className="font-extrabold text-[#FF6B2C] hover:text-[#FF8A4D] transition-colors"
                          >
                            Terms & Privacy Policy
                          </a>
                        </span>
                      </label>
                      {errors.terms && (
                        <span className="mt-1 block pl-2 text-[11px] font-bold text-red-500 animate-pulse">
                          {errors.terms}
                        </span>
                      )}
                    </div>

                    {/* Primary Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 font-semibold text-white rounded-lg bg-gradient-to-r from-[#FF6B2C] to-[#FF8A4D] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-250 disabled:opacity-50 flex items-center justify-center cursor-pointer text-sm"
                    >
                      {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className="flex items-center gap-2">
                          Create Account
                          <ArrowRight size={16} />
                        </span>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-5">
                      <div className="flex-grow border-t border-gray-200" />
                      <span className="px-3 text-xs text-gray-400">or</span>
                      <div className="flex-grow border-t border-gray-200" />
                    </div>

                    {/* Google Button */}
                    <button
                      type="button"
                      onClick={() => triggerGoogleAuth("signup")}
                      className="w-full py-3 px-6 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg flex items-center justify-center transition-all duration-250 hover:bg-gray-50 cursor-pointer text-sm"
                    >
                      <GoogleIcon />
                      Continue with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-[#6B7280]">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("login");
                          setErrors({});
                        }}
                        className="font-semibold text-[#FF6B2C] hover:text-[#FF8A4D] transition-colors cursor-pointer"
                      >
                        Login
                      </button>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>

            </motion.div>
          </div>

        </div>
      </div>

      {/* ────────────────── SIMULATED GOOGLE OAUTH POPUP MODAL ────────────────── */}
      <AnimatePresence>
        {googleAuthMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop overlay */}
            <motion.div
              className="absolute inset-0 bg-black/45 backdrop-blur-[4px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGoogleAuthMode(null)}
            />

            {/* Modal Content container */}
            <motion.div
              className="bg-white text-[#111827] w-full max-w-[420px] rounded-2xl shadow-2xl border border-[#FFD8C4] overflow-hidden relative z-10"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >

              {/* Google Brand Header */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-xs font-semibold text-gray-500">Sign in with Google</span>
                </div>
                <button
                  type="button"
                  onClick={() => setGoogleAuthMode(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>

              {googleStep === 0 && (
                /* Step 0: Profile Selection */
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-[#111827]">Choose an account</h4>
                    <p className="text-xs text-[#6B7280] mt-1">
                      to continue to <span className="font-extrabold text-[#FF6B2C]">InvestAI</span>
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <button
                      type="button"
                      onClick={startGoogleAuth}
                      className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#FFF0E6]/50 border border-transparent hover:border-[#FFD8C4]/60 transition-all text-left w-full cursor-pointer"
                    >
                      <img
                        className="w-10 h-10 rounded-full bg-gray-100"
                        src="https://api.dicebear.com/7.x/initials/svg?seed=Abhishek"
                        alt="Abhishek Yadav"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-[#111827]">Abhishek Yadav</div>
                        <div className="text-xs text-[#6B7280]">abhishek.yadav@gmail.com</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={startGoogleAuth}
                      className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#FFF0E6]/50 border border-transparent hover:border-[#FFD8C4]/60 transition-all text-left w-full cursor-pointer"
                    >
                      <img
                        className="w-10 h-10 rounded-full bg-gray-100"
                        src="https://api.dicebear.com/7.x/initials/svg?seed=InvestAI"
                        alt="Guest User"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-[#111827]">InvestAI Demo User</div>
                        <div className="text-xs text-[#6B7280]">guest.investor@gmail.com</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {googleStep === 1 && (
                /* Step 1: Loading spinner state */
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 border-3 border-[#FF6B2C] border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-sm font-semibold text-gray-600">Signing you in securely...</p>
                </div>
              )}

              {googleStep === 2 && (
                /* Step 2: Success Checkmark */
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <p className="text-sm font-bold text-gray-800">Authentication successful!</p>
                </div>
              )}

              {/* Privacy Footer */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-[10px] text-gray-400 text-center leading-normal">
                Google will share your credentials with InvestAI for access.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Auth;
