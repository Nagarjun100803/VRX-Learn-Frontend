import axios from "axios";
import { useDebugStore } from "./dev-debug-store";

export const api = axios.create({
  baseURL: "https://vrx-learn-8e99f922.fastapicloud.dev/api/v1/",
  withCredentials: true, // IMPORTANT for cookie-based auth
});

// Capture logs in development only
if (process.env.NODE_ENV === "development") {
  api.interceptors.request.use((config) => {
    (config as any)._startTime = Date.now();
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      const config = response.config;
      useDebugStore.getState().addLog({
        id: Math.random().toString(36).substring(7),
        request: {
          method: config.method?.toUpperCase() || "GET",
          url: config.url || "",
          params: config.params,
          data: config.data,
        },
        response: {
          status: response.status,
          data: response.data,
        },
        timestamp: new Date().toLocaleTimeString(),
      });
      return response;
    },
    (error) => {
      const config = error.config || {};
      useDebugStore.getState().addLog({
        id: Math.random().toString(36).substring(7),
        request: {
          method: config.method?.toUpperCase() || "GET",
          url: config.url || "",
          params: config.params,
          data: config.data,
        },
        error: {
          type: error.name,
          message: error.message,
          raw: error.response?.data,
        },
        timestamp: new Date().toLocaleTimeString(),
      });
      return Promise.reject(error);
    }
  );
}
