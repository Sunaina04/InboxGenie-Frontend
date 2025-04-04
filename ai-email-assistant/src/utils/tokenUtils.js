import axios from "axios";

const TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes in milliseconds

export const isTokenExpired = (tokenTimestamp) => {
  if (!tokenTimestamp) return true;
  const now = Date.now();
  const expiryTime = tokenTimestamp + 3600 * 1000; // 1 hour in milliseconds
  return now >= (expiryTime - TOKEN_EXPIRY_BUFFER);
};

export const refreshGoogleToken = async () => {
  try {
    const refreshToken = localStorage.getItem("google_refresh_token");
    if (!refreshToken) {
      // If no refresh token, clear everything and redirect to login
      clearTokensAndRedirect();
      throw new Error("No refresh token found");
    }

    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken
      }
    );

    const { access_token, expires_in } = response.data;
    localStorage.setItem("gmail_access_token", access_token);
    localStorage.setItem("token_timestamp", Date.now().toString());
    
    return access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    // Only redirect if refresh token request fails
    if (error.response?.status === 400 || error.response?.status === 401) {
      clearTokensAndRedirect();
    }
    throw error;
  }
};

export const getValidToken = async () => {
  try {
    const tokenTimestamp = parseInt(localStorage.getItem("token_timestamp") || "0");
    const accessToken = localStorage.getItem("gmail_access_token");

    if (!accessToken || isTokenExpired(tokenTimestamp)) {
      return await refreshGoogleToken();
    }

    return accessToken;
  } catch (error) {
    console.error("Error getting valid token:", error);
    throw error;
  }
};

const clearTokensAndRedirect = () => {
  localStorage.removeItem("gmail_access_token");
  localStorage.removeItem("google_refresh_token");
  localStorage.removeItem("token_timestamp");
  localStorage.removeItem("userInfo");
  window.location.href = "/login";
}; 