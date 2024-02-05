import axios from "axios";

// Set config defaults when creating the instance
export const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
});