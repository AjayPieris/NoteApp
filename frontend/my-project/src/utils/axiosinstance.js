import axios from "axios";               // Import axios library
import { API_URL } from "./constants";   // Import backend base URL

// Create custom axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,                      // Base server URL
  timeout: 10000,                        // Max wait 10 sec
  headers: {
    "Content-Type": "application/json",  // Send data as JSON
  }
});

// Add interceptor (runs before every request)
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // Get saved token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Add token to headers
    }
    return config; // Continue with request
  },
  (error) => {
    return Promise.reject(error); // Handle error
  }
);

export default axiosInstance; // Export for use in other files
