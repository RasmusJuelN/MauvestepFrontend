import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


// Axios instance for API requests
//Includes base configuration and interceptors for authentication

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

 // Retrieves token from localStorage or sessionStorage and send it with every request
apiClient.interceptors.request.use(
  (config) => {
    // Check localStorage first (for "Remember Me" sessions)
    let token = localStorage.getItem("token");
    
    // If not in localStorage, check sessionStorage (for non-remembered sessions)
    if (!token) {
      token = sessionStorage.getItem("token");
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


 // Response interceptor handles 401 errors and clears auth state
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear from both storages
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("refreshToken");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
