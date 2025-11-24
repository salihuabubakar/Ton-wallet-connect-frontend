import { useState, useCallback } from "react";
import { api } from "../lib/api";

export function useProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (walletAddress: string) => {
    if (!walletAddress) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/profile?wallet=${walletAddress}`);
      setProfile(response.data);
    } catch (err: any) {
      console.error("Failed to load profile:", err);
      setError(err.response?.data?.error || "Failed to load profile");
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { profile, isLoading, error, fetchProfile, setProfile };
}
