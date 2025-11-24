import { useState } from "react";
import { Wallet, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useTonConnectUI } from "@tonconnect/ui-react";

interface HeaderProps {
  profile: any;
  walletAddress: string;
  onLogout: () => void;
}

export default function Header({
  profile,
  walletAddress,
  onLogout,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [tonConnectUI] = useTonConnectUI();

  const handleDisconnect = () => {
    tonConnectUI.disconnect();
    localStorage.removeItem("authToken");
    onLogout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        backgroundColor: "#1a1a2e",
        borderBottom: "1px solid #333",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "rgba(255, 255, 255, 0.87)",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #646cff 0%, #8e9fff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Wallet style={{ width: "18px", height: "18px", color: "white" }} />
        </div>
        <span className="brand-text" style={{ display: "inline" }}>TON Hero</span>
      </div>

      {/* Desktop Menu */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="desktop-menu">
        <div style={{ display: "flex", gap: "24px", fontSize: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ color: "#a0a0a0" }}>🏆</span>
            <span style={{ color: "rgba(255, 255, 255, 0.87)" }}>
              {profile?.heroPoints || 0} points
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ color: "#a0a0a0" }}>🔥</span>
            <span style={{ color: "rgba(255, 255, 255, 0.87)" }}>
              {profile?.streak || 0} day streak
            </span>
          </div>
          <div style={{ color: "#4ade80" }}>✓ Connected</div>
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              backgroundColor: "#0a0e27",
              border: "1px solid #333",
              borderRadius: "6px",
              padding: "8px 12px",
              color: "rgba(255, 255, 255, 0.87)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
            }}
          >
            {walletAddress?.substring(0, 6)}...{walletAddress?.substring(-4)}
            <ChevronDown style={{ width: "14px", height: "14px" }} />
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "8px",
                backgroundColor: "#1a1a2e",
                border: "1px solid #333",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                zIndex: 1000,
                minWidth: "280px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid #333",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    color: "#a0a0a0",
                    margin: "0 0 8px 0",
                  }}
                >
                  My Account
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    fontFamily: "monospace",
                    color: "rgba(255, 255, 255, 0.87)",
                    wordBreak: "break-all",
                    margin: 0,
                    maxWidth: "260px",
                  }}
                >
                  {walletAddress}
                </p>
              </div>

              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #333",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#a0a0a0" }}>Hero Points</span>
                  <span style={{ color: "rgba(255, 255, 255, 0.87)" }}>
                    {profile?.heroPoints || 0}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#a0a0a0" }}>Daily Streak</span>
                  <span style={{ color: "rgba(255, 255, 255, 0.87)" }}>
                    {profile?.streak || 0} days
                  </span>
                </div>
              </div>

              <button
                onClick={handleDisconnect}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#ff6b6b",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <LogOut style={{ width: "16px", height: "16px" }} />
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: "none",
          backgroundColor: "transparent",
          border: "none",
          color: "rgba(255, 255, 255, 0.87)",
          cursor: "pointer",
          padding: "8px",
          alignItems: "center",
          gap: "8px",
        }}
        className="mobile-menu-btn"
      >
        {mobileMenuOpen ? (
          <X style={{ width: "24px", height: "24px" }} />
        ) : (
          <Menu style={{ width: "24px", height: "24px" }} />
        )}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 1px)",
            left: 0,
            right: 0,
            backgroundColor: "#1a1a2e",
            borderBottom: "1px solid #333",
            zIndex: 999,
            display: "block",
          }}
        >
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #333" }}>
            <div style={{ display: "flex", gap: "16px", fontSize: "13px", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: "#a0a0a0" }}>🏆</span>
                <span style={{ color: "rgba(255, 255, 255, 0.87)" }}>
                  {profile?.heroPoints || 0}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: "#a0a0a0" }}>🔥</span>
                <span style={{ color: "rgba(255, 255, 255, 0.87)" }}>
                  {profile?.streak || 0}
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: "11px",
                color: "#a0a0a0",
                margin: "0 0 8px 0",
              }}
            >
              Wallet Address:
            </p>
            <p
              style={{
                fontSize: "12px",
                fontFamily: "monospace",
                color: "rgba(255, 255, 255, 0.87)",
                wordBreak: "break-all",
                margin: 0,
              }}
            >
              {walletAddress}
            </p>
          </div>

          <button
            onClick={handleDisconnect}
            style={{
              width: "100%",
              padding: "12px 24px",
              backgroundColor: "transparent",
              border: "none",
              color: "#ff6b6b",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <LogOut style={{ width: "16px", height: "16px" }} />
            Disconnect
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .brand-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}