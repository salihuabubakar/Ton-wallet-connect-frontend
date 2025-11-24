import axios from "axios";

export const api = axios.create({
  baseURL: "/",
});

export function setAuthToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}