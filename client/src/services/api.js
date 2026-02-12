import axios from 'axios';

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "https://petamigo.onrender.com/api";

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
