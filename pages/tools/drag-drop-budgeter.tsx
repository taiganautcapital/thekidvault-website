import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { C, FEEDBACK_URL, gaEvent } from "@/lib/data";
import { Logo, FeedbackButton } from "@/components/ui";

// ── Bucket config ──
const BUCKETS = [
  {
    id: "spend",
    label: "Spending",
    icon: "🛒",
    target: 40,
    color: "#E8725A",
    lightColor: "#E8725A18",
    desc: "Things you want to buy now",
  },
  {
    id: "goals",
    label: "Goals",
    icon: "🎯",
    target: 30,
    color: "#4A9B7F",
    lightColor: "#4A9B7F18",
    desc: "Saving up for something big",
  },
  {
    id: "future",
    label: "Future",
    icon: "🚀",
    target: 20,
    color: "#4A8FBF",
    lightColor: "#4A8FBF18",
    desc: "Long-term savings & investing",
  },
  {
    id: "give",
    label: "Giving",
    icon: "💝",
    target: 10,
    color: "#9B6FC3",
    lightColor: "#9B6FC318",
    desc: "Helping others & donating",
  },
];

const AMOUNTS = [10, 20, 50];

// ── Coin value denominations ──
const COIN_TYPES = [
  { value: 1, label: "1", emoji: "🟡" },
  { value: 5, label: "5", emoji: "🟠" },
  { value: 10, label: "10", emoji: "⚪" },
];

interface Coin {
  id: number;
  value: number;
  bucketId: string | null;
}

function getFeedback(buckets: Record<string, number>, total: number): {
  message: string;
  color: string;
  emoji: string;
} {
  const pcts = BUCKETS.map((b) => ({
    ...b,
    actual: total > 0 ? Math.round((buckets[b.id] / total) * 100) : 0,
  }));

  const allClose = pcts.every((b) => Math.abs(b.actual - b.target) <= 8);
  const spendHigh = pcts[0].actual > 60;
  const giveLow = pcts[3].actual === 0 && total > 0;
  const futureZero = pcts[2].actual === 0 && total > 0;
  const goalZero = pcts[1].actual === 0 && total > 0;

  if (allClose) return {
    emoji: "🎉",
    message: "That's super close to the 40/30/20/10 plan — one of the most popular ways to split money! Remember, there's no perfect answer. What matters is having a plan.",
    color: "#4A9B7F",
  };
  if (spendHigh) return {
    emoji: "🤔",
    message: "You're spending most of it — that's fun now, but future-you might wish you saved a little more! Even putting 10% away each time adds up big over years.",
    color: "#E8725A",
  };
  if (giveLow && futureZero) return {
    emoji: "💡",
    message: "Great start! Try putting even a tiny bit into Future and Giving — you might be surprised how good it feels to save for others and your future self.",
    color: "#4A8FBF",
  };
  if (goalZero) return {
    emoji: "🎯",
    message: "Nothing in Goals yet! Goals are what make saving exciting — pick something you really want and work toward it. It makes spending feel more meaningful too.",
    color: "#D4A843",
  };
  return {
    emoji: "✨",
    message: "Nice split! The classic 40/30/20/10 plan is a great guide, but everyone's situation is different. What matters is being intentional — you're already doing that!",
    color: "#9B6FC3",
  };
}

const DragDropBudgeter: NextPage = () => {
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(20);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [dragCoinId, setDragCoinId] = useState<number | null>(null);
  const [dragOverBucket, setDragOverBucket] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasTracked, setHasTracked] = useState(false);
  const nextId = useRef(0);

  // Build coins with good denomination variety for each preset amount
  const buildCoins = (amount: number): Coin[] => {
    const result: Coin[] = [];
    // Hand-crafted sets: enough coins to split meaningfully, splits cleanly into 40/30/20/10
    // $10  → 10x $1  (each coin = 10%, put 4/3/2/1 coins per bucket)
    // $20  → 2x $5 + 10x $1  (spend $8, goals $6, future $4, give $2)
    // $50  → 4x $10 + 2x $5  (spend $20, goals $15, future $10, give $5)
    const sets: Record<number, number[]> = {
      10: [1,1,1,1,1,1,1,1,1,1],
      20: [5,5,1,1,1,1,1,1,1,1,1,1],
      50: [10,10,10,10,5,5],
    };
    const denoms = sets[amount] ?? (() => {
      // Fallback: greedy with variety
      const r: number[] = [];
      let rem = amount;
      for (const d of [10, 5, 1]) { while (rem >= d) { r.push(d); rem -= d; } }
      return r;
    })();
    for (const d of denoms) {
      result.push({ id: nextId.current++, value: d, bucketId: null });
    }
    return result;
  };

  useEffect(() => {
    setCoins(buildCoins(totalAmount));
    setShowFeedback(false);
    setHasTracked(false);
  }, [totalAmount]);

  // Bucket totals
  const bucketTotals = BUCKETS.reduce((acc, b) => {
    acc[b.id] = coins.filter((c) => c.bucketId === b.id).reduce((s, c) => s + c.value, 0);
    return acc;
  }, {} as Record<string, number>);

  const unassigned = coins.filter((c) => c.bucketId === null);
  const totalAssigned = coins.filter((c) => c.bucketId !== null).reduce((s, c) => s + c.value, 0);
  const allAssigned = unassigned.length === 0;

  // Show feedback when all assigned
  useEffect(() => {
    if (allAssigned && coins.length > 0) {
      setShowFeedback(true);
      if (!hasTracked) {
        gaEvent("tool_budgeter_completed", { total: totalAmount });
        setHasTracked(true);
      }
    }
  }, [allAssigned, coins.length]);

  // Drag handlers
  const handleDragStart = (coinId: number) => setDragCoinId(coinId);
  const handleDragOver = (e: React.DragEvent, bucketId: string) => {
    e.preventDefault();
    setDragOverBucket(bucketId);
  };
  const handleDrop = (e: React.DragEvent, bucketId: string) => {
    e.preventDefault();
    if (dragCoinId === null) return;
    setCoins((prev) => prev.map((c) => c.id === dragCoinId ? { ...c, bucketId } : c));
    setDragCoinId(null);
    setDragOverBucket(null);
  };
  const handleDragEnd = () => { setDragCoinId(null); setDragOverBucket(null); };

  // Click to remove from bucket (return to unassigned)
  const handleCoinClick = (coinId: number, bucketId: string | null) => {
    if (bucketId !== null) {
      setCoins((prev) => prev.map((c) => c.id === coinId ? { ...c, bucketId: null } : c));
      setShowFeedback(false);
    }
  };

  // Touch support
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const touchCoinId = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent, coinId: number) => {
    touchCoinId.current = coinId;
    touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchCoinId.current === null) return;
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const bucketEl = el?.closest("[data-bucket-id]") as HTMLElement | null;
    if (bucketEl) {
      const bucketId = bucketEl.dataset.bucketId!;
      setCoins((prev) => prev.map((c) => c.id === touchCoinId.current ? { ...c, bucketId } : c));
    }
    touchCoinId.current = null;
  };

  const feedback = allAssigned ? getFeedback(bucketTotals, totalAmount) : null;

  const coinStyle = (coin: Coin, inBucket = false): React.CSSProperties => {
    const colorMap: Record<number, { bg: string; border: string; text: string }> = {
      1:  { bg: "#D4A843", border: "#C4963A", text: C.navy },
      5:  { bg: "#CD7F32", border: "#B8702A", text: "#fff" },
      10: { bg: "#C0C0C0", border: "#A0A0A0", text: C.navy },
    };
    const colors = colorMap[coin.value] || colorMap[1];
    return {
      width: inBucket ? 36 : 44,
      height: inBucket ? 36 : 44,
      borderRadius: "50%",
      background: `radial-gradient(circle at 35% 35%, ${colors.bg}, ${colors.border})`,
      border: `2px solid ${colors.border}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: inBucket ? 10 : 12,
      fontWeight: 700,
      color: colors.text,
      fontFamily: "Georgia,serif",
      cursor: inBucket ? "pointer" : "grab",
      userSelect: "none",
      boxShadow: inBucket
        ? "inset 0 1px 3px rgba(0,0,0,0.2)"
        : "0 3px 8px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.3)",
      flexShrink: 0,
      transition: "transform 0.15s",
      position: "relative",
    };
  };

  return (
    <>
      <Head>
        <title>Drag & Drop Budgeter for Kids – The Kid Vault</title>
        <meta name="description" content="Drag coins into your four money buckets — Spending, Goals, Future, and Giving. Learn the 40/30/20/10 budgeting method for kids. Free interactive tool." />
        <meta property="og:title" content="Drag & Drop Budgeter – The Kid Vault" />
        <meta property="og:url" content="https://www.thekidvault.com/tools/drag-drop-budgeter" />
      </Head>

      <div style={{ minHeight: "100vh", background: C.cream, fontFamily: "Georgia,serif", color: C.navy }}>

        {/* ── NAV ── */}
        <nav style={{
          background: C.navy, padding: "12px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 100,
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => router.push("/")}>
            <Logo size={28} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Georgia,serif" }}>The Kid Vault</span>
          </div>
          <button onClick={() => router.push("/tools")} style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8, padding: "7px 16px", color: "#fff",
            fontSize: 13, cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 600,
          }}>
            ← All Tools
          </button>
        </nav>

        {/* ── HERO HEADER ── */}
        <div style={{
          background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
          padding: "52px 24px 64px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.035,
            backgroundImage: `repeating-linear-gradient(0deg, ${C.gold} 0px, ${C.gold} 1px, transparent 1px, transparent 48px),
              repeating-linear-gradient(90deg, ${C.gold} 0px, ${C.gold} 1px, transparent 1px, transparent 48px)`,
          }} />
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
            <div style={{ fontSize: 52, marginBottom: 16, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }}>🪣</div>
            <h1 style={{
              color: "#fff", fontSize: "clamp(28px,6vw,44px)",
              margin: "0 0 16px", fontFamily: "Georgia,serif", fontWeight: 700, lineHeight: 1.15,
            }}>
              Drag & Drop Budgeter
            </h1>
            <p style={{
              color: "rgba(255,255,255,0.68)", fontSize: "clamp(15px,2.5vw,17px)",
              lineHeight: 1.75, fontFamily: "'Trebuchet MS',sans-serif",
              margin: "0 auto", maxWidth: 460,
            }}>
              Drag your coins into the four money buckets. See what your split looks like!
            </p>
          </div>
          <svg viewBox="0 0 1440 52" style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block" }}>
            <path d="M0,28 C360,52 1080,0 1440,28 L1440,52 L0,52 Z" fill={C.cream} />
          </svg>
        </div>

        {/* ── MAIN ── */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 16px 80px" }}>

          {/* Amount picker */}
          <div style={{ marginBottom: 28, textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 12 }}>
              How much money are you budgeting?
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {AMOUNTS.map((amt) => (
                <button key={amt} onClick={() => setTotalAmount(amt)} style={{
                  padding: "10px 24px", borderRadius: 50,
                  border: `2px solid ${totalAmount === amt ? C.gold : C.border}`,
                  background: totalAmount === amt ? C.gold + "18" : "#fff",
                  color: C.navy, fontSize: 16, fontWeight: 700,
                  cursor: "pointer", fontFamily: "Georgia,serif",
                  transition: "all 0.2s",
                }}>
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Coin legend */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
            {[
              { value: 1, bg: "#D4A843", border: "#C4963A", text: C.navy },
              { value: 5, bg: "#CD7F32", border: "#B8702A", text: "#fff" },
              { value: 10, bg: "#C0C0C0", border: "#A0A0A0", text: C.navy },
            ].map((coin) => (
              <div key={coin.value} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif" }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: `radial-gradient(circle at 35% 35%, ${coin.bg}, ${coin.border})`,
                  border: `1.5px solid ${coin.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, color: coin.text, fontFamily: "Georgia,serif",
                }}>${coin.value}</div>
                = ${coin.value} coin
              </div>
            ))}
          </div>

          {/* Unassigned coin tray */}
          <div style={{
            background: "#fff", borderRadius: 16,
            border: `2px dashed ${unassigned.length === 0 ? "#A8D5B5" : C.border}`,
            padding: "16px 20px", marginBottom: 24,
            transition: "border-color 0.3s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, fontFamily: "'Trebuchet MS',sans-serif" }}>
                {unassigned.length === 0 ? "✅ All coins assigned!" : `💰 Your coins — drag each into a bucket below`}
              </div>
              <div style={{ fontSize: 12, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif" }}>
                ${unassigned.reduce((s, c) => s + c.value, 0)} remaining
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, minHeight: 52 }}>
              {unassigned.map((coin) => (
                <div
                  key={coin.id}
                  draggable
                  onDragStart={() => handleDragStart(coin.id)}
                  onDragEnd={handleDragEnd}
                  onTouchStart={(e) => handleTouchStart(e, coin.id)}
                  onTouchEnd={handleTouchEnd}
                  title={`$${coin.value} coin — drag to a bucket`}
                  style={coinStyle(coin)}
                >
                  ${coin.value}
                </div>
              ))}
              {unassigned.length === 0 && (
                <div style={{ fontSize: 13, color: "#4A9B7F", fontFamily: "'Trebuchet MS',sans-serif", padding: "8px 0" }}>
                  Scroll down to see your results! 👇
                </div>
              )}
            </div>
          </div>

          {/* Buckets grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 14, marginBottom: 28,
          }}>
            {BUCKETS.map((bucket) => {
              const total = bucketTotals[bucket.id];
              const pct = totalAmount > 0 ? Math.round((total / totalAmount) * 100) : 0;
              const isOver = dragOverBucket === bucket.id;
              const diff = pct - bucket.target;

              return (
                <div
                  key={bucket.id}
                  data-bucket-id={bucket.id}
                  onDragOver={(e) => handleDragOver(e, bucket.id)}
                  onDrop={(e) => handleDrop(e, bucket.id)}
                  onDragLeave={() => setDragOverBucket(null)}
                  style={{
                    background: isOver ? bucket.lightColor : "#fff",
                    border: `2px solid ${isOver ? bucket.color : C.border}`,
                    borderRadius: 16,
                    padding: "16px 14px",
                    transition: "all 0.2s",
                    transform: isOver ? "scale(1.02)" : "none",
                    boxShadow: isOver ? `0 8px 24px ${bucket.color}25` : "0 2px 8px rgba(0,0,0,0.04)",
                    minHeight: 160,
                    display: "flex", flexDirection: "column",
                  }}
                >
                  {/* Bucket header */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 20 }}>{bucket.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{bucket.label}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif", lineHeight: 1.4 }}>
                      {bucket.desc}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 4 }}>
                      <span style={{ color: bucket.color, fontWeight: 700 }}>${total} ({pct}%)</span>
                      <span style={{ color: C.textLight }}>target: {bucket.target}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: C.border, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: 3,
                        width: `${Math.min(pct, 100)}%`,
                        background: `linear-gradient(90deg, ${bucket.color}, ${bucket.color}BB)`,
                        transition: "width 0.4s ease",
                      }} />
                    </div>
                    {total > 0 && (
                      <div style={{ fontSize: 10, color: Math.abs(diff) <= 8 ? "#4A9B7F" : diff > 0 ? "#E8725A" : C.textLight, fontFamily: "'Trebuchet MS',sans-serif", marginTop: 3 }}>
                        {Math.abs(diff) <= 8 ? "✓ Near target!" : diff > 0 ? `↑ ${diff}% above target` : `↓ ${Math.abs(diff)}% below target`}
                      </div>
                    )}
                  </div>

                  {/* Coins in bucket */}
                  <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 5, alignContent: "flex-start" }}>
                    {coins.filter((c) => c.bucketId === bucket.id).map((coin) => (
                      <div
                        key={coin.id}
                        onClick={() => handleCoinClick(coin.id, coin.bucketId)}
                        title="Click to return to tray"
                        style={coinStyle(coin, true)}
                      >
                        ${coin.value}
                      </div>
                    ))}
                    {coins.filter((c) => c.bucketId === bucket.id).length === 0 && (
                      <div style={{
                        width: "100%", height: 40, borderRadius: 8,
                        border: `1.5px dashed ${bucket.color}40`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, color: `${bucket.color}80`,
                        fontFamily: "'Trebuchet MS',sans-serif",
                      }}>
                        drop here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset button */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <button onClick={() => { setCoins(buildCoins(totalAmount)); setShowFeedback(false); setHasTracked(false); }} style={{
              background: "transparent", border: `2px solid ${C.border}`,
              borderRadius: 50, padding: "9px 22px",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif",
              transition: "all 0.2s",
            }}>
              ↺ Reset & Try Again
            </button>
          </div>

          {/* Feedback section */}
          {showFeedback && feedback && (
            <div style={{
              background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
              borderRadius: 20, padding: "28px 24px",
              border: `2px solid ${feedback.color}60`,
              boxShadow: `0 8px 32px rgba(26,35,50,0.15)`,
              marginBottom: 28,
              animation: "fadeInUp 0.4s ease",
            }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
                <span style={{ fontSize: 32 }}>{feedback.emoji}</span>
                <p style={{ fontSize: 15, color: "#fff", lineHeight: 1.7, fontFamily: "'Trebuchet MS',sans-serif", margin: 0 }}>
                  {feedback.message}
                </p>
              </div>

              {/* Split summary */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {BUCKETS.map((b) => {
                  const pct = totalAmount > 0 ? Math.round((bucketTotals[b.id] / totalAmount) * 100) : 0;
                  const close = Math.abs(pct - b.target) <= 8;
                  return (
                    <div key={b.id} style={{
                      background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 8px", textAlign: "center",
                      border: `1px solid ${close ? b.color + "60" : "rgba(255,255,255,0.08)"}`,
                    }}>
                      <div style={{ fontSize: 16, marginBottom: 4 }}>{b.icon}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: b.color, fontFamily: "Georgia,serif" }}>{pct}%</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontFamily: "'Trebuchet MS',sans-serif" }}>{b.label}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "'Trebuchet MS',sans-serif", marginTop: 2 }}>target: {b.target}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* The 40/30/20/10 explainer */}
          <div style={{
            background: C.gold + "10", borderRadius: 16, padding: "20px 22px",
            border: `1px solid ${C.gold}25`, marginBottom: 28,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.goldDark, fontFamily: "'Trebuchet MS',sans-serif", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
              💡 The 40/30/20/10 Plan
            </div>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, fontFamily: "'Trebuchet MS',sans-serif", margin: "0 0 12px" }}>
              A popular budgeting guide: spend <strong>40%</strong>, save for goals <strong>30%</strong>, invest for the future <strong>20%</strong>, and give <strong>10%</strong>. It's a great starting point!
            </p>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, fontFamily: "'Trebuchet MS',sans-serif", margin: 0 }}>
              But remember — <strong>everyone's situation is different.</strong> Maybe you're saving for something big right now and need 50% in Goals. Maybe you love giving and want to put more there. <em>The best budget is one that reflects YOUR values and goals.</em>
            </p>
          </div>

          {/* Back to tools */}
          <div style={{ textAlign: "center" }}>
            <button onClick={() => router.push("/tools")} style={{
              background: "transparent", border: `2px solid ${C.border}`,
              borderRadius: 50, padding: "12px 28px",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              color: C.navy, fontFamily: "'Trebuchet MS',sans-serif",
            }}>
              ← Explore More Tools
            </button>
          </div>
        </div>
      </div>

      <FeedbackButton url={FEEDBACK_URL} />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        [draggable="true"]:hover { transform: scale(1.1); }
      `}</style>
    </>
  );
};

export default DragDropBudgeter;
