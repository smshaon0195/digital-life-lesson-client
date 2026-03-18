import axios from "axios";

const axiosSecure = axios.create({
  // backend URL
  baseURL: "http://localhost:3000",
});

// 🔹 Add token automatically
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
