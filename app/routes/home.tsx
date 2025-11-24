import WalletConnect from "../components/WalletLogin";
import DashboardScreen from "../components/DashboardScreen";
import { useState, useCallback, useEffect } from "react";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "~/hooks/useProfile";

export default function Home() {
  const { token, logout } = useAuth();
  const { profile, fetchProfile, isLoading, setProfile } = useProfile();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleWalletConnect = useCallback(
    (address: string) => {
      fetchProfile(address);
    },
    [fetchProfile]
  );

  const handleWalletDisconnect = useCallback(() => {
    setProfile(null);
  }, []);

  const handleProfileUpdate = useCallback(
    (walletAddress: string) => {
      fetchProfile(walletAddress);
    },
    [fetchProfile]
  );

  const handleLogout = () => {
    logout();
    setProfile(null);
  };

  if ((isAuthenticated || token) && profile) {
    return (
      <DashboardScreen
        profile={profile}
        walletAddress={profile?.walletAddress}
        onProfileUpdate={handleProfileUpdate}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <>
      <div style={{ padding: "40px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1>Welcome to TON Network Wallet Connect Feature</h1>
          <p style={{ color: "#a0a0a0", fontSize: "16px" }}>
            Connect your wallet to get started
          </p>
        </div>
        <WalletConnect
          onConnect={handleWalletConnect}
          onDisconnect={handleWalletDisconnect}
          onProfileUpdate={handleProfileUpdate}
          isLoading={isLoading}
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
    </>
  );
}
