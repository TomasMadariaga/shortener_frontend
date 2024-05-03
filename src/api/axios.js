import axios from "axios";

const instance = axios.create({
  baseURL: "https://shorter-production-130a.up.railway.app/",
  withCredentials: true,
});

export default instance;
