import axios from "axios";
import Qs from "qs";
import authStore from "../stores/authStore";

const { REACT_APP_API_URL } = process.env;

const BASE_URL = `${REACT_APP_API_URL}`;

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

const csrfToken = getCookie("csrftoken");

const instance = axios.create({
  baseURL: BASE_URL, // Backend URL
  withCredentials: true, // This will send cookies (including CSRF token) with requests
  headers: {
    "X-CSRFToken": csrfToken, // Include CSRF token in headers
  },
});

export default instance;
