import axios from "axios";

axios.interceptors.request.use((config) => {
  config.headers["app-id"] = "62ed51927d052a158c8a07a3";
  return config;
});

export const request = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
