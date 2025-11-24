import { useState } from "react";
import { api } from "../lib/api";

interface CheckinButtonProps {
  profile: any;
  onCheckIn: (walletAddress: string) => void;
}

export default function CheckinButton({ profile, onCheckIn }: CheckinButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleCheckin = async () => {
    if (!profile) {
      setMessage("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      const response = await api.post("/checkin", {
        walletAddress: profile.walletAddress || profile.wallet_address
      });

      if (response.data) {
        setMessage(`✓ Check-in successful! New streak: ${response.data.streak}`);
        onCheckIn(profile.walletAddress || profile.wallet_address);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || "Check-in failed";
      setMessage(`✗ ${errorMessage}`);
      console.error("Check-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button 
        onClick={handleCheckin} 
        disabled={loading || !profile}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "600",
          backgroundColor: loading ? "#555" : "#646cff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background-color 0.25s",
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? "Checking in..." : "Daily Check-in"}
      </button>
      
      {message && (
        <p style={{ 
          marginTop: "12px", 
          color: message.includes("✓") ? "#4ade80" : "#f87171",
          fontSize: "14px"
        }}>
          {message}
        </p>
      )}
    </div>
  );
}