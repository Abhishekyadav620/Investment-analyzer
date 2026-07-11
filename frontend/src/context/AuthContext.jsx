import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const JWT_STORAGE_KEY = "investai_jwt_token";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Intercept and query resumption states
  const [pendingSearchQuery, setPendingSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Toast notifications state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Auto-dismiss toasts
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Check stored JWT and fetch profile from backend during initialization
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const oauthToken = params.get("token");
        const oauthError = params.get("error");

        if (oauthToken) {
          localStorage.setItem(JWT_STORAGE_KEY, oauthToken);
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (oauthError) {
          window.history.replaceState({}, document.title, window.location.pathname);
          throw new Error(oauthError);
        }

        let token = oauthToken || localStorage.getItem(JWT_STORAGE_KEY);
        if (!token) {
          token = sessionStorage.getItem(JWT_STORAGE_KEY);
        }

        if (token) {
          // Validate token with backend GET /api/auth/me
          const response = await axios.get(`${API_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data && response.data.success) {
            const serverUser = response.data.user;
            setUser({
              name: serverUser.name,
              email: serverUser.email,
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${serverUser.name}`,
            });
          } else {
            throw new Error("Token validation failed");
          }
        }
      } catch (error) {
        console.warn("Session token expired or invalid, clearing storage");
        localStorage.removeItem(JWT_STORAGE_KEY);
        sessionStorage.removeItem(JWT_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { user: loggedInUser, token } = response.data;

      // Save token depending on Remember Me choice
      if (rememberMe) {
        localStorage.setItem(JWT_STORAGE_KEY, token);
      } else {
        sessionStorage.setItem(JWT_STORAGE_KEY, token);
      }

      const clientUser = {
        name: loggedInUser.name,
        email: loggedInUser.email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${loggedInUser.name}`,
      };

      setUser(clientUser);
      setShowAuthModal(false); // Close search intercept modal
      showToast(`✅ Welcome back, ${clientUser.name}`, "success");
      return clientUser;
    } catch (error) {
      console.error("Backend login error:", error);
      const errMsg = error.response?.data?.message || "Invalid email or password.";
      throw new Error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });

      const { user: registeredUser, token } = response.data;

      // Store in session storage by default
      sessionStorage.setItem(JWT_STORAGE_KEY, token);

      const clientUser = {
        name: registeredUser.name,
        email: registeredUser.email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${registeredUser.name}`,
      };

      setUser(clientUser);
      setShowAuthModal(false); // Close search intercept modal
      showToast("🎉 Account created successfully!", "success");
      return clientUser;
    } catch (error) {
      console.error("Backend signup error:", error);
      const errMsg = error.response?.data?.message || "Registration failed.";
      throw new Error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (name = "Google Investor", email = "investor@google.com") => {
    setIsLoading(true);
    const googleEmail = email.toLowerCase();
    const googlePassword = "GoogleOAuth_DummyPassword_Sec_998";

    try {
      // 1. Try to login
      const response = await axios.post(`${API_URL}/login`, {
        email: googleEmail,
        password: googlePassword,
      });
      
      const { user: loggedInUser, token } = response.data;
      localStorage.setItem(JWT_STORAGE_KEY, token);

      const clientUser = {
        name: loggedInUser.name,
        email: loggedInUser.email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${loggedInUser.name}`,
      };

      setUser(clientUser);
      setShowAuthModal(false);
      showToast(`✅ Welcome back, ${loggedInUser.name}`, "success");
      return clientUser;
    } catch (loginErr) {
      // 2. If login fails (user does not exist yet), sign them up
      try {
        const signupResponse = await axios.post(`${API_URL}/signup`, {
          name,
          email: googleEmail,
          password: googlePassword,
        });

        const { user: registeredUser, token } = signupResponse.data;
        localStorage.setItem(JWT_STORAGE_KEY, token);

        const clientUser = {
          name: registeredUser.name,
          email: registeredUser.email,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${registeredUser.name}`,
        };

        setUser(clientUser);
        setShowAuthModal(false);
        showToast(`✅ Welcome back, ${name}`, "success");
        return clientUser;
      } catch (signupErr) {
        console.error("Google Auth register error:", signupErr);
        setIsLoading(false);
        throw new Error("Google Authentication failed on server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(JWT_STORAGE_KEY);
    sessionStorage.removeItem(JWT_STORAGE_KEY);
    showToast("👋 Logged out successfully.", "success");
  };

  const startGoogleAuth = () => {
    window.location.assign(`${API_URL}/google`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        signup,
        startGoogleAuth,
        // Kept for backwards compatibility with any existing consumers. The
        // Auth page uses startGoogleAuth, which starts Passport's OAuth flow.
        loginWithGoogle,
        logout,
        pendingSearchQuery,
        setPendingSearchQuery,
        showAuthModal,
        setShowAuthModal,
        toast,
        showToast,
        closeToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
