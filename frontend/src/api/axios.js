import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh when access token expires
// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const original = err.config;
//     if (err.response?.status === 401 && !original._retry) {
//       original._retry = true;
//       try {
//         const res = await api.post("/auth/refresh");
//         const { accessToken } = res.data;
//         localStorage.setItem("accessToken", accessToken);
//         api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//         original.headers.Authorization = `Bearer ${accessToken}`;
//         return api(original); // retry the failed request
//       } catch (refreshErr) {
//         localStorage.removeItem("accessToken");
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(err);
//   }
// );

export default api;
