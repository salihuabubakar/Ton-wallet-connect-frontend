import { useEffect, useState } from "react";

interface ProfileCardProps {
  profile: any;
  onProfileUpdate: (walletAddress: string) => void;
}

export default function ProfileCard({ profile, onProfileUpdate }: ProfileCardProps) {
  const [localProfile, setLocalProfile] = useState(profile);

  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  if (!localProfile) {
    return <div>No profile data available</div>;
  }

  return (
    <div style={{ 
      marginTop: 20, 
      padding: 20, 
      border: "1px solid #444", 
      borderRadius: 8,
      backgroundColor: "#1a1a1a"
    }}>
      <h2 style={{ marginTop: 0 }}>Your Profile</h2>
      
      <div style={{ display: "grid", gap: "16px" }}>
        <div>
          <p style={{ color: "#a0a0a0", margin: "0 0 4px 0", fontSize: "14px" }}>Wallet Address</p>
          <p style={{ 
            fontFamily: "monospace", 
            wordBreak: "break-all",
            margin: 0,
            color: "rgba(255, 255, 255, 0.87)"
          }}>
            {localProfile.walletAddress || localProfile.wallet_address}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <p style={{ color: "#a0a0a0", margin: "0 0 4px 0", fontSize: "14px" }}>Daily Streak</p>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#646cff" }}>
              {localProfile.streak || 0} days
            </p>
          </div>
          
          <div>
            <p style={{ color: "#a0a0a0", margin: "0 0 4px 0", fontSize: "14px" }}>Hero Points</p>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#646cff" }}>
              {localProfile.heroPoints || 0} pts
            </p>
          </div>
        </div>

        {localProfile.last_check_in && (
          <div>
            <p style={{ color: "#a0a0a0", margin: "0 0 4px 0", fontSize: "14px" }}>Last Check-in</p>
            <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.87)" }}>
              {new Date(localProfile.last_check_in).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}