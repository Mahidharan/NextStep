import axios from "axios";

const api = axios.create({
  baseURL: "https://nextstep-16qi.onrender.com",
  withCredentials: true,
});

export { api };
