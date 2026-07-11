// Cryptographic helper functions for client-side password hashing and JWT simulation

/**
 * Hash a password using the browser's native Web Crypto SHA-256 API.
 * @param {string} password - Raw password text.
 * @returns {Promise<string>} Hex representation of the hash.
 */
export const hashPassword = async (password) => {
  if (!password) return "";
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

/**
 * Base64 URL encodes an object.
 */
const base64UrlEncode = (obj) => {
  const str = JSON.stringify(obj);
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

/**
 * Base64 URL decodes a string.
 */
const base64UrlDecode = (str) => {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
};

/**
 * Generate a structured base64 JWT token.
 * @param {object} user - User detail payload.
 * @param {boolean} rememberMe - Whether to extend expiry.
 * @returns {string} Fully structured JWT string.
 */
export const generateJWT = (user, rememberMe = false) => {
  const header = { alg: "HS256", typ: "JWT" };
  const expiryHours = rememberMe ? 24 * 7 : 2; // 7 days or 2 hours
  const payload = {
    name: user.name,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * expiryHours,
  };
  return `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.mock_sec_sig`;
};

/**
 * Verify if a token is a valid unexpired JWT.
 * @param {string} token - Structured JWT string.
 * @returns {object|null} Decoded user payload or null if invalid/expired.
 */
export const verifyJWT = (token) => {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = base64UrlDecode(parts[1]);
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      console.warn("JWT token has expired");
      return null;
    }
    return { name: payload.name, email: payload.email };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
