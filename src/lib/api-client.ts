import axios from "axios";

export const api = axios.create({
  baseURL: "https://vrx-learn-8e99f922.fastapicloud.dev/api/v1/",
  withCredentials: true, // IMPORTANT for cookie-based auth
});
