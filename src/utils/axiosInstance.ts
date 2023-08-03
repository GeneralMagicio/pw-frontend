import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://localhost:7070",
  withCredentials: true,
  headers: {
      "Content-type": "application/json",
  },
});