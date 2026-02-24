import { useState } from "react";
import { C } from "@/lib/data";

interface Props {
  chapterId: number;
  chapterTitle: string;
  chapterColor: string;
  playerName: string;
  onClose: () => void;
}

export default function EmailCaptureModal({
  chapterId,
  chapterTitle,
  chapterColor,
  playerName,
  onClose,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const handleSkip = () => onClose();

  // ── Shared styles ──
  const overlay: React.CSSProperties = {
    position: "fixed", inset: 0,
    background: "rgba(26,35,50,0.75)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 20, zIndex: 1000,
  };
  const modal: React.CSSProperties = {
    background: "#fff", borderRadius: 24,
    padding: "36px 28px 28px",
    maxWidth: 420, width: "100%",
    boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
    textAlign: "center", position: "relative",
    animation: "kvModalPop 0.25s ease",
  };

  return (
    <>
      <style>{`
        @keyframes kvModalPop {
          from { transform: scale(0.93); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
      `}</style>

      <div style={overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div style={modal}>

          {/* Star burst */}
          <div style={{
            width: 68, height: 68,
            background: "linear-gradient(135deg,#D4A843,#F5E6B8)",
            borderRadius: "50%", fontSize: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 18px",
            boxShadow: "0 4px 20px rgba(212,168,67,0.35)",
          }}>⭐</div>

          {/* Chapter badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: chapterColor + "18", border: `1px solid ${chapterColor}30`,
            borderRadius: 20, padding: "4px 12px",
            fontSize: 11, fontWeight: 700, color: chapterColor,
            textTransform: "uppercase", letterSpacing: 1,
            fontFamily: "'Trebuchet MS',sans-serif",
            marginBottom: 14,
          }}>
            🎉 Chapter {chapterId} Complete!
          </div>

          {status === "success" ? (
            /* ── SUCCESS STATE ── */
            <div>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 700, color: C.navy, lineHeight: 1.3, marginBottom: 10 }}>
                You're in! 🎉
              </h2>
              <p style={{ fontSize: 14, color: C.textLight, lineHeight: 1.6, marginBottom: 24, fontFamily: "'Trebuchet MS',sans-serif" }}>
                Check your inbox for a welcome email from The Kid Vault Family. Your first weekly money tip is on its way!
              </p>
              <button
                onClick={onClose}
                style={{ background: C.gold, color: C.navy, border: "none", borderRadius: 12, padding: "13px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif", width: "100%" }}
              >
                Continue to Activity →
              </button>
            </div>
          ) : (
            /* ── DEFAULT STATE ── */
            <>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: 21, fontWeight: 700, color: C.navy, lineHeight: 1.3, marginBottom: 10 }}>
                Amazing work, {playerName}! ⭐
              </h2>
              <p style={{ fontSize: 14, color: C.textLight, lineHeight: 1.65, marginBottom: 20, fontFamily: "'Trebuchet MS',sans-serif" }}>
                Want <strong style={{ color: C.navy }}>free weekly money tips</strong> to keep the learning going at home? Parents love our quick ideas for teaching kids about money.
              </p>

              {/* Benefits */}
              <div style={{
                background: C.cream, border: `1px solid ${C.border}`,
                borderRadius: 14, padding: "14px 16px",
                marginBottom: 20, textAlign: "left",
              }}>
                {[
                  ["💡", "Weekly money tips for parents"],
                  ["🔔", "New chapter alerts"],
                  ["🎁", "Free printable activities"],
                  ["🏫", "Classroom & homeschool ideas"],
                ].map(([icon, text], i, arr) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "5px 0",
                    borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
                    fontSize: 13, color: C.text,
                    fontFamily: "'Trebuchet MS',sans-serif",
                  }}>
                    <span style={{ fontSize: 15, flexShrink: 0 }}>{icon}</span>
                    {text}
                  </div>
                ))}
              </div>

              {/* Input row */}
              <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <input
                  type="email"
                  placeholder="Parent's email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  disabled={status === "loading"}
                  style={{
                    flex: 1, minWidth: 0,
                    padding: "13px 16px",
                    border: `2px solid ${errorMsg ? "#f44336" : C.border}`,
                    borderRadius: 12, fontSize: 15,
                    color: C.navy, fontFamily: "'Trebuchet MS',sans-serif",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  style={{
                    background: status === "loading" ? C.border : C.gold,
                    color: C.navy, border: "none",
                    borderRadius: 12, padding: "13px 18px",
                    fontSize: 15, fontWeight: 700,
                    cursor: status === "loading" ? "default" : "pointer",
                    fontFamily: "'Trebuchet MS',sans-serif",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s",
                  }}
                >
                  {status === "loading" ? "..." : "Get Tips →"}
                </button>
              </div>

              {/* Error message */}
              {errorMsg && (
                <p style={{ fontSize: 12, color: "#f44336", marginBottom: 8, fontFamily: "'Trebuchet MS',sans-serif" }}>
                  {errorMsg}
                </p>
              )}

              {/* Privacy note */}
              <p style={{ fontSize: 11, color: C.textLight, marginBottom: 16, fontFamily: "'Trebuchet MS',sans-serif" }}>
                🔒 No spam, ever. Unsubscribe anytime.
              </p>

              {/* Skip link */}
              <button
                onClick={handleSkip}
                style={{
                  background: "none", border: "none",
                  fontSize: 13, color: C.textLight,
                  cursor: "pointer", textDecoration: "underline",
                  textUnderlineOffset: 2,
                  fontFamily: "'Trebuchet MS',sans-serif",
                }}
              >
                Skip for now — go to Activity
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
