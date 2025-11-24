import { useState, useEffect } from "react";
import { api } from "../lib/api";

export function useLeaderboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/leaderboard");
      setData(response.data);
    } catch (err: any) {
      console.error("Failed to load leaderboard:", err);
      setError(err.response?.data?.error || "Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchLeaderboard };
}