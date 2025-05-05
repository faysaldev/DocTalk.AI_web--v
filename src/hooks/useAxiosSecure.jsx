import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  // Request interceptor to add the authorization header for secure calls
  axiosSecure.interceptors.request.use(
    function (config) {
      // Get the token from the "docUser" object in localStorage
      const storedData = localStorage.getItem("docUser");
      let token = null;

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          token = parsedData.isAuthenticated;
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
        }
      }

      // Add the Bearer token to the request headers
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // Intercepts 401 and 403 status to handle unauthorized or forbidden requests
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        // Add your logout logic here if needed
        console.warn("Unauthorized or forbidden request. Redirecting to login...");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
