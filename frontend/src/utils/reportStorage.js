const STORAGE_KEY = "investmentReport";

/**
 * Safely parse JSON
 */
const safeParse = (value) => {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

/**
 * Save report
 *
 * Supports:
 * saveInvestmentReport({ company, report, analysis })
 *
 * or
 *
 * saveInvestmentReport(company, report)
 */
export function saveInvestmentReport(arg1, arg2) {
  if (typeof window === "undefined") return;

  let company;
  let report;
  let analysis = null;

  if (typeof arg1 === "object" && arg1 !== null) {
    company = arg1.company;
    report = arg1.report;
    analysis = arg1.analysis ?? null;
  } else {
    company = arg1;
    report = arg2;
  }

  if (!company || !report) return;

  const payload = JSON.stringify({
    company,
    report,
    analysis,
  });

  try {
    sessionStorage.setItem(STORAGE_KEY, payload);
  } catch (err) {
    console.warn("Unable to write sessionStorage:", err);
  }

  try {
    localStorage.setItem(STORAGE_KEY, payload);
  } catch (err) {
    console.warn("Unable to write localStorage:", err);
  }
}

/**
 * Read report
 */
export function readInvestmentReport() {
  if (typeof window === "undefined") return null;

  try {
    const sessionValue = sessionStorage.getItem(STORAGE_KEY);

    if (sessionValue) {
      const parsed = safeParse(sessionValue);
      if (parsed) return parsed;
    }
  } catch {}

  try {
    const localValue = localStorage.getItem(STORAGE_KEY);

    if (localValue) {
      const parsed = safeParse(localValue);
      if (parsed) return parsed;
    }
  } catch {}

  return null;
}

/**
 * Clear report
 */
export function clearInvestmentReport() {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

/**
 * Check if report exists
 */
export function hasInvestmentReport() {
  return readInvestmentReport() !== null;
}