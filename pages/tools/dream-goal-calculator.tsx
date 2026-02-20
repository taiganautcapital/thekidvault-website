import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { C, FEEDBACK_URL, gaEvent } from "@/lib/data";
import { Logo, FeedbackButton } from "@/components/ui";

// ── Preset goals kids can tap to auto-fill ──
const PRESETS = [
  { label: "🎮 Gaming Headset", amount: 80 },
  { label: "🧱 LEGO Technic Set", amount: 60 },
  { label: "🛴 Scooter", amount: 120 },
  { label: "🎨 Art Supply Kit", amount: 45 },
  { label: "📚 Book Series", amount: 35 },
  { label: "🎒 Cool Backpack", amount: 55 },
];

// ── Motivational messages based on weeks ──
function getMotivation(weeks: number): { emoji: string; message: string; color: string } {
  if (weeks <= 4)  return { emoji: "🚀", message: "So close! Just a few weeks away!", color: "#4A9B7F" };
  if (weeks <= 8)  return { emoji: "💪", message: "You've got this — less than 2 months!", color: "#4A8FBF" };
  if (weeks <= 16) return { emoji: "🌱", message: "Great goal! Stay consistent and you'll get there.", color: "#9B6FC3" };
  if (weeks <= 26) return { emoji: "🧘", message: "Patience wins! Half a year of smart saving.", color: "#D49244" };
  return { emoji: "🌟", message: "Big dream! Every week of saving counts.", color: C.ch1 };
}

// ── Progress milestone labels ──
function getMilestone(pct: number): string | null {
  if (pct >= 100) return "🎉 Goal reached!";
  if (pct >= 75)  return "Almost there!";
  if (pct >= 50)  return "Halfway!";
  if (pct >= 25)  return "Great start!";
  return null;
}

const DreamGoalCalculator: NextPage = () => {
  const router = useRouter();
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState<number | "">("");
  const [weeklySavings, setWeeklySavings] = useState<number | "">("");
  const [alreadySaved, setAlreadySaved] = useState<number | "">(0);
  const [showBonus, setShowBonus] = useState(false);
  const [bonusWeeks, setBonusWeeks] = useState<number | "">(0);
  const [hasTracked, setHasTracked] = useState(false);

  const cost = Number(goalAmount) || 0;
  const saved = Number(alreadySaved) || 0;
  const weekly = Number(weeklySavings) || 0;
  const bonusWks = Number(bonusWeeks) || 0;

  const remaining = Math.max(0, cost - saved);
  const effectiveWeekly = weekly + (showBonus ? bonusWks : 0);
  const weeksToGoal = effectiveWeekly > 0 ? Math.ceil(remaining / effectiveWeekly) : 0;
  const totalSavedIfStartNow = weekly * weeksToGoal + saved;
  const progressPct = cost > 0 ? Math.min(100, Math.round((saved / cost) * 100)) : 0;
  const isReady = cost > 0 && weekly > 0;

  // Fire GA event once when result appears
  useEffect(() => {
    if (isReady && weeksToGoal > 0 && !hasTracked) {
      gaEvent("tool_dream_goal_calculated", { weeks: weeksToGoal, goal_amount: cost });
      setHasTracked(true);
    }
    if (!isReady) setHasTracked(false);
  }, [isReady, weeksToGoal]);

  const motivation = isReady ? getMotivation(weeksToGoal) : null;
  const milestone = getMilestone(progressPct);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px",
    borderRadius: 12, border: `2px solid ${C.border}`,
    fontSize: 16, fontFamily: "'Trebuchet MS',sans-serif",
    color: C.navy, background: "#fff", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 13, fontWeight: 700,
    color: C.navy, marginBottom: 7,
    fontFamily: "'Trebuchet MS',sans-serif",
    textTransform: "uppercase", letterSpacing: 1,
  };

  return (
    <>
      <Head>
        <title>Dream Goal Savings Calculator for Kids – The Kid Vault</title>
        <meta
          name="description"
          content="How long until you can buy your dream item? Enter your goal and weekly savings to find out. Free interactive savings tool for kids ages 6-12."
        />
        <meta property="og:title" content="Dream Goal Calculator – The Kid Vault" />
        <meta property="og:url" content="https://www.thekidvault.com/tools/dream-goal-calculator" />
      </Head>

      <div style={{ minHeight: "100vh", background: C.cream, fontFamily: "Georgia,serif", color: C.navy }}>

        {/* ── NAV ── */}
        <nav style={{
          background: C.navy, padding: "12px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 100,
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            <Logo size={28} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Georgia,serif" }}>
              The Kid Vault
            </span>
          </div>
          <button
            onClick={() => router.push("/tools")}
            style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8, padding: "7px 16px", color: "#fff",
              fontSize: 13, cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 600,
            }}
          >
            ← All Tools
          </button>
        </nav>

        {/* ── PAGE HEADER ── */}
        <div style={{
          background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
          padding: "52px 24px 64px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Grid pattern */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.035,
            backgroundImage: `repeating-linear-gradient(0deg, ${C.gold} 0px, ${C.gold} 1px, transparent 1px, transparent 48px),
              repeating-linear-gradient(90deg, ${C.gold} 0px, ${C.gold} 1px, transparent 1px, transparent 48px)`,
          }} />
          {/* Floating orbs */}
          {[
            { top: "12%", left: "6%", size: 70 },
            { top: "60%", left: "3%", size: 35 },
            { top: "20%", right: "8%", size: 50 },
            { top: "65%", right: "5%", size: 80 },
          ].map((orb, i) => (
            <div key={i} style={{
              position: "absolute", top: orb.top, left: (orb as any).left, right: (orb as any).right,
              width: orb.size, height: orb.size, borderRadius: "50%",
              border: `1px solid ${C.gold}25`, pointerEvents: "none",
            }} />
          ))}
          <div style={{ position: "relative", zIndex: 1, maxWidth: 580, margin: "0 auto" }}>
            <div style={{
              fontSize: 52, marginBottom: 16,
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
            }}>
              🎯
            </div>
            <h1 style={{
              color: "#fff", fontSize: "clamp(28px,6vw,44px)",
              margin: "0 0 16px", fontFamily: "Georgia,serif",
              fontWeight: 700, lineHeight: 1.15,
            }}>
              Dream Goal Calculator
            </h1>
            <p style={{
              color: "rgba(255,255,255,0.68)",
              fontSize: "clamp(15px,2.5vw,17px)",
              lineHeight: 1.75, fontFamily: "'Trebuchet MS',sans-serif",
              margin: "0 auto", maxWidth: 460,
            }}>
              What do you want to save for? Let's figure out how to get there! 💰
            </p>
          </div>
          <svg viewBox="0 0 1440 52" style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block" }}>
            <path d="M0,28 C360,52 1080,0 1440,28 L1440,52 L0,52 Z" fill={C.cream} />
          </svg>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "36px 20px 80px" }}>

          {/* Quick-pick presets */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: C.textLight,
              textTransform: "uppercase", letterSpacing: 1.5,
              fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 12,
            }}>
              Quick pick a goal:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setGoalName(p.label.replace(/^[^\s]+\s/, ""));
                    setGoalAmount(p.amount);
                  }}
                  style={{
                    padding: "8px 14px", borderRadius: 30,
                    border: `1.5px solid ${C.border}`,
                    background: goalAmount === p.amount ? C.gold + "20" : "#fff",
                    borderColor: goalAmount === p.amount ? C.gold : C.border,
                    fontSize: 13, cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif",
                    color: C.navy, fontWeight: goalAmount === p.amount ? 700 : 400,
                    transition: "all 0.2s",
                  }}
                >
                  {p.label} — ${p.amount}
                </button>
              ))}
            </div>
          </div>

          {/* ── FORM CARD ── */}
          <div style={{
            background: "#fff", borderRadius: 20,
            border: `1px solid ${C.border}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            padding: "28px 24px", marginBottom: 24,
          }}>
            <h2 style={{
              fontSize: 17, fontWeight: 700, color: C.navy,
              margin: "0 0 24px", fontFamily: "Georgia,serif",
            }}>
              Step 1: Tell me about your dream 💭
            </h2>

            {/* Goal name */}
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>What are you saving for?</label>
              <input
                type="text"
                placeholder='e.g. "New LEGO Technic Set"'
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = C.gold}
                onBlur={(e) => e.currentTarget.style.borderColor = C.border}
              />
            </div>

            {/* Goal amount */}
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>How much does it cost? ($)</label>
              <input
                type="number"
                placeholder="0"
                min="1"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value === "" ? "" : Number(e.target.value))}
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = C.gold}
                onBlur={(e) => e.currentTarget.style.borderColor = C.border}
              />
            </div>

            {/* Already saved */}
            <div style={{ marginBottom: 8 }}>
              <label style={labelStyle}>How much have you already saved? ($)</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={alreadySaved}
                onChange={(e) => setAlreadySaved(e.target.value === "" ? "" : Number(e.target.value))}
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = C.gold}
                onBlur={(e) => e.currentTarget.style.borderColor = C.border}
              />
            </div>

            {/* Progress bar if already saved something */}
            {cost > 0 && saved > 0 && (
              <div style={{ marginTop: 14, marginBottom: 8 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 12, color: C.textLight,
                  fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 6,
                }}>
                  <span>Already saved: ${saved}</span>
                  <span style={{ color: milestone ? C.ch4 : C.textLight, fontWeight: milestone ? 700 : 400 }}>
                    {milestone || `${progressPct}% there`}
                  </span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: C.border }}>
                  <div style={{
                    height: 8, borderRadius: 4,
                    background: `linear-gradient(90deg, ${C.ch4}, ${C.teal})`,
                    width: `${progressPct}%`,
                    transition: "width 0.5s ease",
                  }} />
                </div>
              </div>
            )}
          </div>

          {/* ── SAVINGS INPUTS ── */}
          <div style={{
            background: "#fff", borderRadius: 20,
            border: `1px solid ${C.border}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            padding: "28px 24px", marginBottom: 24,
          }}>
            <h2 style={{
              fontSize: 17, fontWeight: 700, color: C.navy,
              margin: "0 0 24px", fontFamily: "Georgia,serif",
            }}>
              Step 2: How much can you save? 💰
            </h2>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Your weekly savings ($)</label>
              <input
                type="number"
                placeholder="e.g. 5"
                min="1"
                value={weeklySavings}
                onChange={(e) => setWeeklySavings(e.target.value === "" ? "" : Number(e.target.value))}
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = C.gold}
                onBlur={(e) => e.currentTarget.style.borderColor = C.border}
              />
              <div style={{
                fontSize: 12, color: C.textLight, marginTop: 6,
                fontFamily: "'Trebuchet MS',sans-serif",
              }}>
                💡 This could be your allowance, chore money, or a mix!
              </div>
            </div>

            {/* Chore bonus toggle */}
            <div style={{
              background: C.gold + "10", borderRadius: 12,
              padding: "14px 16px", border: `1px solid ${C.gold}30`,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: showBonus ? 14 : 0 }}>
                <div>
                  <div style={{
                    fontSize: 13, fontWeight: 700, color: C.navy,
                    fontFamily: "'Trebuchet MS',sans-serif",
                  }}>
                    ⚡ Add a Chore Bonus?
                  </div>
                  <div style={{ fontSize: 12, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif", marginTop: 2 }}>
                    Extra chores = faster goal!
                  </div>
                </div>
                <button
                  onClick={() => setShowBonus(!showBonus)}
                  style={{
                    background: showBonus ? C.gold : "transparent",
                    border: `2px solid ${C.gold}`,
                    borderRadius: 20, padding: "5px 14px",
                    fontSize: 12, fontWeight: 700, cursor: "pointer",
                    color: showBonus ? C.navy : C.gold,
                    fontFamily: "'Trebuchet MS',sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  {showBonus ? "On ✓" : "Add it"}
                </button>
              </div>
              {showBonus && (
                <div>
                  <label style={{ ...labelStyle, fontSize: 12 }}>Extra chore money per week ($)</label>
                  <input
                    type="number"
                    placeholder="e.g. 3"
                    min="0"
                    value={bonusWeeks}
                    onChange={(e) => setBonusWeeks(e.target.value === "" ? "" : Number(e.target.value))}
                    style={{ ...inputStyle, fontSize: 15 }}
                    onFocus={(e) => e.currentTarget.style.borderColor = C.gold}
                    onBlur={(e) => e.currentTarget.style.borderColor = C.border}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ── RESULT ── */}
          {isReady && weeksToGoal > 0 && (
            <div style={{
              background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
              borderRadius: 20, padding: "32px 28px",
              border: `3px solid ${C.gold}`,
              boxShadow: "0 8px 32px rgba(26,35,50,0.2)",
              marginBottom: 20,
              animation: "fadeIn 0.4s ease",
            }}>
              {/* Goal name display */}
              {goalName && (
                <div style={{
                  fontSize: 13, color: C.goldLight, fontFamily: "'Trebuchet MS',sans-serif",
                  marginBottom: 12, fontStyle: "italic",
                }}>
                  Saving for: <strong style={{ color: C.gold }}>{goalName}</strong>
                </div>
              )}

              {/* Main number */}
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 8 }}>
                  You'll have your dream in...
                </div>
                <div style={{
                  fontSize: "clamp(52px,12vw,80px)", fontWeight: 700,
                  color: C.gold, lineHeight: 1, fontFamily: "Georgia,serif",
                }}>
                  {weeksToGoal}
                </div>
                <div style={{ fontSize: 18, color: "#fff", fontFamily: "'Trebuchet MS',sans-serif", marginTop: 4 }}>
                  {weeksToGoal === 1 ? "week" : "weeks"}
                </div>
                {weeksToGoal >= 4 && (
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "'Trebuchet MS',sans-serif", marginTop: 6 }}>
                    That's about {Math.round(weeksToGoal / 4.33)} {Math.round(weeksToGoal / 4.33) === 1 ? "month" : "months"}
                  </div>
                )}
              </div>

              {/* Weekly breakdown */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: 10, marginBottom: 20,
              }}>
                {[
                  { label: "Saving each week", value: `$${effectiveWeekly}` },
                  { label: "Weeks to go", value: weeksToGoal.toString() },
                  { label: "You've already saved", value: `$${saved}` },
                  { label: "Still needed", value: `$${remaining}` },
                ].map((stat) => (
                  <div key={stat.label} style={{
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 12, padding: "12px 14px",
                  }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 3 }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "Georgia,serif" }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Motivation */}
              {motivation && (
                <div style={{
                  background: motivation.color + "20",
                  border: `1px solid ${motivation.color}40`,
                  borderRadius: 12, padding: "14px 16px",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <span style={{ fontSize: 24 }}>{motivation.emoji}</span>
                  <span style={{
                    fontSize: 14, color: "#fff", lineHeight: 1.5,
                    fontFamily: "'Trebuchet MS',sans-serif",
                  }}>
                    {motivation.message}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Already have enough! */}
          {isReady && saved >= cost && (
            <div style={{
              background: `linear-gradient(135deg, #2E7D32, #388E3C)`,
              borderRadius: 20, padding: "32px 28px", textAlign: "center",
              border: "3px solid #66BB6A",
            }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: "Georgia,serif", marginBottom: 8 }}>
                You already have enough!
              </div>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", fontFamily: "'Trebuchet MS',sans-serif" }}>
                You've saved ${saved} — your {goalName || "dream item"} (${cost}) is within reach. Go get it! 🏆
              </div>
            </div>
          )}

          {/* Empty state prompt */}
          {!isReady && (
            <div style={{
              textAlign: "center", padding: "32px 20px",
              background: "#fff", borderRadius: 20,
              border: `2px dashed ${C.border}`,
            }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⬆️</div>
              <div style={{ fontSize: 15, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif", lineHeight: 1.6 }}>
                Fill in your goal cost and weekly savings above to see your results!
              </div>
            </div>
          )}

          {/* ── LEARNING TIP ── */}
          <div style={{
            marginTop: 28, background: C.gold + "12",
            borderRadius: 16, padding: "20px 22px",
            border: `1px solid ${C.gold}30`,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: C.goldDark,
              fontFamily: "'Trebuchet MS',sans-serif",
              textTransform: "uppercase", letterSpacing: 1, marginBottom: 8,
            }}>
              💡 Money Lesson
            </div>
            <p style={{
              fontSize: 14, color: C.text, lineHeight: 1.7,
              fontFamily: "'Trebuchet MS',sans-serif", margin: 0,
            }}>
              The #1 savings trick: <strong>pay yourself first</strong>. The moment you get money,
              put your weekly savings amount away <em>before</em> spending anything.
              It's the secret every great saver uses!
            </p>
          </div>

          {/* Back to tools */}
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button
              onClick={() => router.push("/tools")}
              style={{
                background: "transparent",
                border: `2px solid ${C.border}`,
                borderRadius: 50, padding: "12px 28px",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                color: C.navy, fontFamily: "'Trebuchet MS',sans-serif",
              }}
            >
              ← Explore More Tools
            </button>
          </div>
        </div>
      </div>

      <FeedbackButton url={FEEDBACK_URL} />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default DreamGoalCalculator;
