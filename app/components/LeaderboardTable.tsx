import { useLeaderboard } from "~/hooks/useLeaderboard";

export default function LeaderboardTable() {
  const { data, loading, error } = useLeaderboard();

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Leaderboard</h3>
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #646cff" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>Rank</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Wallet Address</th>
              <th style={{ textAlign: "right", padding: "10px" }}>Hero Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #444" }}>
                <td style={{ padding: "10px" }}>{i + 1}</td>
                <td style={{ padding: "10px" }}>{u.walletAddress}</td>
                <td style={{ textAlign: "right", padding: "10px" }}>{u.heroPoints} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}