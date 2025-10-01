import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GetToken() {
  return localStorage.getItem("accessToken") || "";
}

export function SaveToken(token: string) {
  localStorage.setItem("accessToken", token);
}

// export function RemoveToken() {
//   return localStorage.removeItem("accessToken");
// }

export const BaseAPI = import.meta.env.VITE_API_URL;

export const MyAxios = axios.create({
  baseURL: BaseAPI,
});

MyAxios.interceptors.request.use(
  (config) => {
    const token = GetToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
