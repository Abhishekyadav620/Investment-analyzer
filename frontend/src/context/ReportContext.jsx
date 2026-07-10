import { createContext, useContext, useState } from "react";

const ReportContext = createContext(null);

const STORAGE_KEY = "iim_report_data";

const getInitialReport = () => {
  if (typeof window === "undefined") return null;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const ReportProvider = ({ children }) => {
  const [reportData, setReportData] = useState(getInitialReport);

  const saveReport = ({ company, report, error }) => {
    const data = { company, report, error: Boolean(error) };
    setReportData(data);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // sessionStorage unavailable (private mode, etc.) — in-memory state still works
    }
  };

  const clearReport = () => {
    setReportData(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <ReportContext.Provider value={{ reportData, saveReport, clearReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReport must be used within ReportProvider");
  }
  return context;
};