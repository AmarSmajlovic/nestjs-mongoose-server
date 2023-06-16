import { getSession, refreshSession } from "@/auth";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import cookie from "cookie";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(async (config: any) => {
  const cookies = cookie.parse(document.cookie);

  if (!cookies.access_token) {
    const newAccessToken = await refreshSession();
    config.headers["Authorization"] = `Bearer ${newAccessToken}`;
    return config;
  }
  config.headers["Authorization"] = `Bearer ${cookies.access_token}`;
  return config;
});
