import { TonConnectButton, useTonAddress, useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { Wallet, Loader } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";

interface WalletLoginScreenProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
  onProfileUpdate: (address: string) => void;
  isLoading: boolean;
  setIsAuthenticated?: (auth: boolean) => void;
}

export default function WalletLoginScreen({
  onConnect,
  onDisconnect,
  onProfileUpdate,
  isLoading,
  setIsAuthenticated,
}: WalletLoginScreenProps) {
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const { login } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const authenticateWallet = async (address: string) => {
    try {
      setIsAuthenticating(true);
      setAuthError(null);

      const domain = window.location.host;

      const challengeRes = await api.post("/auth/challenge", {
        walletAddress: address,
      });

      const { nonce, message } = challengeRes.data;

      const signed = await tonConnectUI.signData({
        type: "text",
        text: message,
      });

      const verifyRes = await api.post("/auth/verify", {
        address: address,
        domain: signed.domain || domain,
        nonce,
        public_key: wallet?.account.publicKey,
        signature: signed.signature,
        timestamp: signed.timestamp,
        walletStateInit: wallet?.account.walletStateInit,
        payload: {
          type: "text",
          text: message,
        },
      });

      if (verifyRes.data.token) {
        login(verifyRes.data.token);
        onProfileUpdate(address);
        setIsAuthenticated && setIsAuthenticated(true);
      }

      setIsAuthenticating(false);
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || "Authentication failed");
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    if (userFriendlyAddress) {
      onConnect(userFriendlyAddress);
    } else {
      onDisconnect();
    }
  }, [userFriendlyAddress]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          padding: "48px",
          backgroundColor: "#1a1a2e",
          border: "1px solid #444",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "16px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #646cff 0%, #8e9fff 100%)",
            display: "inline-block",
            marginBottom: "24px",
          }}
        >
          <Wallet style={{ width: "32px", height: "32px", color: "white" }} />
        </div>

        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "rgba(255, 255, 255, 0.87)",
            margin: "0 0 16px 0",
          }}
        >
          TON Hero Streak
        </h1>

        <p
          style={{
            color: "#a0a0a0",
            fontSize: "16px",
            margin: "0 0 32px 0",
            lineHeight: "1.6",
          }}
        >
          Connect your wallet, check in daily, and climb the leaderboard to become a TON Hero!
        </p>

        <TonConnectButton />

        {userFriendlyAddress && (
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              backgroundColor: "#0a0e27",
              borderRadius: "8px",
              border: "1px solid #333",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#a0a0a0",
                margin: "0 0 8px 0",
              }}
            >
              Connected Address:
            </p>
            <p
              style={{
                fontSize: "13px",
                fontFamily: "monospace",
                color: "rgba(255, 255, 255, 0.87)",
                wordBreak: "break-all",
                margin: "0 0 16px 0",
              }}
            >
              {userFriendlyAddress}
            </p>

            <button
              onClick={() => authenticateWallet(userFriendlyAddress)}
              disabled={isAuthenticating}
              style={{
                padding: "12px 32px",
                fontSize: "16px",
                fontWeight: "600",
                background: "linear-gradient(135deg, #646cff 0%, #8e9fff 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: isAuthenticating ? "not-allowed" : "pointer",
                opacity: isAuthenticating ? 0.7 : 1,
                transition: "all 0.25s",
              }}
            >
              {isAuthenticating ? "Authenticating..." : "Authenticate"}
            </button>
          </div>
        )}

        {isAuthenticating && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "#a0a0a0",
              marginTop: "24px",
            }}
          >
            <Loader
              style={{
                width: "16px",
                height: "16px",
                animation: "spin 1s linear infinite",
              }}
            />
            <span>Signing message...</span>
          </div>
        )}

        {authError && (
          <p
            style={{
              color: "#ff6b6b",
              fontSize: "14px",
              margin: "24px 0 0 0",
              textAlign: "center",
            }}
          >
            {authError}
          </p>
        )}

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}