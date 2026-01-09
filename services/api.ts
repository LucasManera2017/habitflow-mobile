import axios from "axios";

const apiUrl = "https://habitflow-backend-zt02.onrender.com";

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
});
