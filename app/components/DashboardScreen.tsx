import { useState } from "react";
import { api } from "../lib/api";
import { useLeaderboard } from "../hooks/useLeaderboard";
import Header from "./Header";
import { getHoursUntilNextCheckin, formatLastCheckIn } from "../utils/timeFormat";

interface DashboardScreenProps {
  profile: any;
  walletAddress: string;
  onProfileUpdate: (address: string) => void;
  onLogout: () => void;
}

export default function DashboardScreen({
  profile,
  walletAddress,
  onProfileUpdate,
  onLogout,
}: DashboardScreenProps) {
  const [checkinMessage, setCheckinMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { 
    data: leaderboard, 
    loading: leaderboardLoading, 
    refetch: refetchLeaderbord 
  } =
    useLeaderboard();

  const handleCheckin = async () => {
    // prevent double check-in until next window
    const hoursUntilNext = getHoursUntilNextCheckin(profile?.lastCheckIn);
    if (hoursUntilNext > 0) {
      setCheckinMessage(
        `✗ Already checked in. Next check-in in about ${hoursUntilNext} ${hoursUntilNext === 1 ? "hour" : "hours"}.`
      );
      return;
    }

    setLoading(true);
    setCheckinMessage("");
    try {
      const response = await api.post("/checkin", {
        walletAddress: walletAddress,
      });
      setCheckinMessage(
        `✓ Check-in successful! New streak: ${response.data.streak}`
      );
      setTimeout(() => {
        onProfileUpdate(walletAddress);
        setCheckinMessage("");
      }, 1500);
      refetchLeaderbord();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || "Check-in failed";
      setCheckinMessage(`✗ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const hoursUntilNextCheckin = getHoursUntilNextCheckin(profile?.lastCheckIn);

  return (
    <div>
      <Header
        profile={profile}
        walletAddress={walletAddress}
        onLogout={onLogout}
      />

      <main
        style={{
          backgroundColor: "#030712",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          minHeight: "calc(100vh - 70px)",
          padding: "40px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "rgba(255, 255, 255, 0.87)",
              margin: "0 0 8px 0",
            }}
          >
            TON Hero Streak
          </h1>
          <p
            style={{
              color: "#a0a0a0",
              margin: "0 0 32px 0",
              fontSize: "16px",
            }}
          >
            Connect your wallet, check in daily, and climb the leaderboard
          </p>

          {/* Stats Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                backgroundColor: "#1a1a2e",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <p style={{ color: "#a0a0a0", margin: 0, fontSize: "14px" }}>
                  Hero Points
                </p>
                <span style={{ fontSize: "24px" }}>🏆</span>
              </div>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#646cff",
                  margin: 0,
                }}
              >
                {profile?.heroPoints || 0}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#1a1a2e",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <p style={{ color: "#a0a0a0", margin: 0, fontSize: "14px" }}>
                  Daily Streak
                </p>
                <span style={{ fontSize: "24px" }}>🔥</span>
              </div>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#646cff",
                  margin: 0,
                }}
              >
                {profile?.streak || 0} days
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#1a1a2e",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <p style={{ color: "#a0a0a0", margin: 0, fontSize: "14px" }}>
                  Last Check-in
                </p>
                <span style={{ fontSize: "24px" }}>📅</span>
              </div>
              <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.87)", margin: 0 }}>
                {formatLastCheckIn(profile?.lastCheckIn)}
              </p>
            </div>
          </div>

          {/* Check-in Section */}
          <div
            style={{
              backgroundColor: "#1a1a2e",
              border: "1px solid #333",
              borderRadius: "12px",
              padding: "32px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <p
              style={{
                color: "#a0a0a0",
                margin: "0 0 16px 0",
                fontSize: "14px",
              }}
            >
              ⏰ Next check-in available in about {hoursUntilNextCheckin} {hoursUntilNextCheckin === 1 ? "hour" : "hours"}
            </p>

            <button
              onClick={handleCheckin}
              disabled={loading || hoursUntilNextCheckin > 0}
              title={
              hoursUntilNextCheckin > 0
                ? `Next check-in in about ${hoursUntilNextCheckin} ${
                  hoursUntilNextCheckin === 1 ? "hour" : "hours"
                }`
                : "Check in now"
              }
              style={{
              padding: "12px 32px",
              fontSize: "16px",
              fontWeight: "600",
              background: "linear-gradient(135deg, #646cff 0%, #8e9fff 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor:
                loading || hoursUntilNextCheckin > 0 ? "not-allowed" : "pointer",
              opacity: loading || hoursUntilNextCheckin > 0 ? 0.7 : 1,
              transition: "all 0.25s",
              }}
            >
              {loading
              ? "Checking in..."
              : hoursUntilNextCheckin > 0
              ? "Check-in Locked"
              : "Check-in"}
            </button>

            <p
              style={{
                color: "#a0a0a0",
                margin: "16px 0 0 0",
                fontSize: "14px",
              }}
            >
              Check in daily to earn +10 hero points and maintain your streak!
            </p>

            {checkinMessage && (
              <p
                style={{
                  marginTop: "16px",
                  color: checkinMessage.includes("✓")
                    ? "#4ade80"
                    : "#ff6b6b",
                  fontSize: "14px",
                }}
              >
                {checkinMessage}
              </p>
            )}
          </div>

          {/* Leaderboard */}
          <div
            style={{
              backgroundColor: "#1a1a2e",
              border: "1px solid #333",
              borderRadius: "12px",
              padding: "24px",
              overflowX: "auto",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "rgba(255, 255, 255, 0.87)",
                margin: "0 0 20px 0",
              }}
            >
              🏆 Top Heroes
            </h2>

            {leaderboardLoading ? (
              <p style={{ color: "#a0a0a0", textAlign: "center" }}>
                Loading leaderboard...
              </p>
            ) : leaderboard.length === 0 ? (
              <p style={{ color: "#a0a0a0", textAlign: "center" }}>
                No data available
              </p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #333" }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px",
                          color: "#a0a0a0",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        Rank
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px",
                          color: "#a0a0a0",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        Wallet Address
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          padding: "12px",
                          color: "#a0a0a0",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        Hero Points
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user: any, i: number) => (
                      <tr key={i} style={{ borderBottom: "1px solid #333" }}>
                        <td
                          style={{
                            padding: "12px",
                            color: "rgba(255, 255, 255, 0.87)",
                          }}
                        >
                          {i + 1}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            color: "rgba(255, 255, 255, 0.87)",
                            fontFamily: "monospace",
                            fontSize: "12px",
                          }}
                        >
                          {user.walletAddress}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "12px",
                            color: "#646cff",
                            fontWeight: "600",
                          }}
                        >
                          {user.heroPoints} pts
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}