import { useState, useEffect } from "react";
import { api, setAuthToken } from "../lib/api";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setAuthToken(savedToken);
      setToken(savedToken);
    }
    setIsReady(true);
  }, []);

  const login = (t: string) => {
    localStorage.setItem("authToken", t);
    setAuthToken(t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
  };

  return { token, login, logout, isReady };
}