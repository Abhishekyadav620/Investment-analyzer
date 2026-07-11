import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Report from "./pages/Report";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const ToastNotification = () => {
  const { toast, closeToast } = useAuth();
  
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.15 } }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111827] text-white py-3.5 px-5 rounded-2xl shadow-xl border border-gray-800 backdrop-blur-md text-[14px] font-semibold"
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={closeToast}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/loading"
          element={
            <ProtectedRoute>
              <Loading />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <ToastNotification />
    </BrowserRouter>
  );
}

export default App;