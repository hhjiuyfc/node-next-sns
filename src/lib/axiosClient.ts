import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  },
});

export default instance;
