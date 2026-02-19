import React, { useState } from "react";
import { C } from "@/lib/data";
import { btnS } from "@/components/ui";

interface ActProps { onDone: () => void; playerName?: string; }

// ---- MONEY IDEA ----
function MoneyIdeaAct({ onDone }: ActProps) {
  const [enjoy, setE] = useState<number | null>(null);
  const [good, setG] = useState<number | null>(null);
  const ej = ["🐾 Animals", "🍳 Cooking", "🎨 Art & Crafts", "⚽ Sports", "🤝 Helping", "💻 Technology"];
  const gd = ["😊 Patience", "🎨 Creativity", "🏃 Being Active", "👂 Listening", "🔧 Building", "📖 Explaining"];
  const ideas: Record<string, string> = {
    "0-0":"Pet sitting & dog walking","0-1":"Custom pet portraits","0-2":"Dog treat baker","0-3":"Pet fitness trainer","0-4":"Animal shelter volunteer coordinator","0-5":"Pet care blog",
    "1-0":"Neighborhood baking business","1-1":"Custom cake decorator","1-2":"Cooking class for kids","1-3":"Healthy snack delivery","1-4":"Community meal organizer","1-5":"Recipe video creator",
    "2-0":"Face painting at events","2-1":"Handmade jewelry shop","2-2":"Custom greeting cards","2-3":"Sports team banner designer","2-4":"Art fundraiser organizer","2-5":"Art tutor",
    "3-0":"Sports equipment organizer","3-1":"Custom sports gear designer","3-2":"Backyard sports camp","3-3":"Personal fitness buddy","3-4":"Youth sports referee","3-5":"Sports skills coach",
    "4-0":"Elderly neighbor helper","4-1":"Gift wrapping service","4-2":"Yard work & garden helper","4-3":"Errand runner","4-4":"Community event planner","4-5":"Homework tutor",
    "5-0":"Tech setup helper","5-1":"Website designer","5-2":"Phone repair helper","5-3":"Gaming tournament organizer","5-4":"Digital skills teacher","5-5":"Tech blog creator"
  };
  const sel: React.CSSProperties = { padding: "10px 16px", borderRadius: 10, cursor: "pointer", fontSize: 14, border: "2px solid", transition: "all 0.2s" };
  return (
    <div>
      <p style={{ fontSize: 15, color: C.text, marginBottom: 16 }}>What do you enjoy most?</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {ej.map((e, i) => <button key={i} onClick={() => setE(i)} style={{ ...sel, borderColor: enjoy === i ? C.gold : C.border, background: enjoy === i ? C.gold + "15" : "#fff", fontWeight: enjoy === i ? 700 : 400, color: C.navy }}>{e}</button>)}
      </div>
      <p style={{ fontSize: 15, color: C.text, marginBottom: 16 }}>What are you good at?</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {gd.map((g, i) => <button key={i} onClick={() => setG(i)} style={{ ...sel, borderColor: good === i ? C.gold : C.border, background: good === i ? C.gold + "15" : "#fff", fontWeight: good === i ? 700 : 400, color: C.navy }}>{g}</button>)}
      </div>
      {enjoy !== null && good !== null && (
        <div style={{ background: C.gold + "12", borderRadius: 14, padding: 20, textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Your Money Idea</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.navy }}>{ideas[`${enjoy}-${good}`]}</div>
        </div>
      )}
      {enjoy !== null && good !== null && <button onClick={onDone} style={{ ...btnS(C.gold, C.navy, { width: "100%" }) }}>Complete Activity ⭐</button>}
    </div>
  );
}

// ---- BUDGET BUILDER ----
function BudgetAct({ onDone }: ActProps) {
  const [sp, setSp] = useState(8); const [bg, setBg] = useState(6); const [fu, setFu] = useState(4); const [gi, setGi] = useState(2);
  const tot = sp + bg + fu + gi;
  const bk = [{ l: "🛒 Spending", v: sp, s: setSp, tg: 40 }, { l: "🎯 Big Goals", v: bg, s: setBg, tg: 30 }, { l: "🔮 Future", v: fu, s: setFu, tg: 20 }, { l: "🎁 Giving", v: gi, s: setGi, tg: 10 }];
  const ok = tot > 0 && Math.abs(sp / tot * 100 - 40) < 8 && Math.abs(bg / tot * 100 - 30) < 8 && Math.abs(fu / tot * 100 - 20) < 8 && Math.abs(gi / tot * 100 - 10) < 8;
  return (
    <div>
      <div style={{ background: C.navy, borderRadius: 12, padding: 16, marginBottom: 20, textAlign: "center" }}>
        <span style={{ color: C.goldLight, fontSize: 14 }}>Total: </span><span style={{ color: C.gold, fontSize: 24, fontWeight: 700 }}>${tot}</span><span style={{ color: C.goldLight, fontSize: 14 }}> of $20</span>
      </div>
      {bk.map((b, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, flexWrap: "wrap", gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{b.l}</span>
            <span style={{ fontSize: 13, color: C.textLight }}>${b.v} ({tot > 0 ? Math.round(b.v / tot * 100) : 0}%) — target: {b.tg}%</span>
          </div>
          <input type="range" min="0" max="20" value={b.v} onChange={e => b.s(parseInt(e.target.value))} style={{ width: "100%", accentColor: C.gold }} />
        </div>
      ))}
      <div style={{ background: ok ? "#E8F5E9" : "#FFF3E0", borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 16, fontSize: 14 }}>
        {ok ? "🎉 Great job! Your budget matches the 40/30/20/10 plan!" : "💡 Try to get close to: 40% spending, 30% big goals, 20% future, 10% giving!"}
      </div>
      <button onClick={onDone} style={{ ...btnS(C.gold, C.navy, { width: "100%" }) }}>Complete Activity ⭐</button>
    </div>
  );
}

// ---- INTEREST CALCULATOR ----
function InterestAct({ onDone }: ActProps) {
  const [amt, setAmt] = useState(100); const [rate, setRate] = useState(6); const [yrs, setYrs] = useState(10); const [mode, setMode] = useState("compound");
  const data = [];
  for (let y = 0; y <= yrs; y++) { data.push({ y, s: Math.round(amt + amt * (rate / 100) * y), c: Math.round(amt * Math.pow(1 + rate / 100, y)) }); }
  const mx = Math.max(...data.map(d => Math.max(d.s, d.c)));
  const final = data[data.length - 1][mode === "compound" ? "c" : "s"];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[{ l: "Amount", v: amt, s: setAmt, opts: [10, 50, 100, 500, 1000], f: (v: number) => "$" + v }, { l: "Rate", v: rate, s: setRate, opts: [2, 4, 6, 8, 10, 12], f: (v: number) => v + "%" }, { l: "Years", v: yrs, s: setYrs, opts: [5, 10, 20, 30, 40], f: (v: number) => v + " yrs" }].map((x, i) => (
          <div key={i}><div style={{ fontSize: 12, color: C.textLight, marginBottom: 4 }}>{x.l}</div>
            <select value={x.v} onChange={e => x.s(+e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14 }}>
              {x.opts.map(o => <option key={o} value={o}>{x.f(o)}</option>)}
            </select></div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["compound", "simple"].map(m => <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `2px solid ${mode === m ? C.gold : C.border}`, background: mode === m ? C.gold + "15" : "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, color: C.navy }}>{m === "compound" ? "⛄ Compound" : "📝 Simple"}</button>)}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 150, marginBottom: 8, padding: "0 4px" }}>
        {data.map((d, i) => { const val = mode === "compound" ? d.c : d.s; const h = Math.max(4, (val / mx) * 130); return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 9, color: C.textLight, marginBottom: 2 }}>{i === 0 || i === data.length - 1 ? "$" + val : ""}</div>
            <div style={{ width: "100%", height: h, borderRadius: "3px 3px 0 0", background: `linear-gradient(180deg,${C.gold},${C.goldDark})`, transition: "height 0.5s" }} />
          </div>
        ); })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textLight, marginBottom: 16 }}><span>Year 0</span><span>Year {yrs}</span></div>
      <div style={{ background: C.navy, borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 16 }}>
        <div style={{ color: C.goldLight, fontSize: 13 }}>After {yrs} years, ${amt} becomes...</div>
        <div style={{ color: C.gold, fontSize: 28, fontWeight: 700 }}>${final.toLocaleString()}</div>
        <div style={{ color: C.goldLight, fontSize: 12, marginTop: 4 }}>That's ${(final - amt).toLocaleString()} in {mode} interest!</div>
      </div>
      <button onClick={onDone} style={{ ...btnS(C.gold, C.navy, { width: "100%" }) }}>Complete Activity ⭐</button>
    </div>
  );
}

// ---- BIZ DETECTIVE ----
function BizDetectiveAct({ onDone }: ActProps) {
  const [picked, setP] = useState<number | null>(null); const [rev, setR] = useState(false);
  const biz = [
    { n: "Sparkle Car Wash", e: "🚗", earn: "$120/wk", grow: "📈 Growing", comp: "2 nearby", con: "⭐⭐⭐⭐", sc: 85, res: "Great pick! Steady demand, growing customer base." },
    { n: "Frozen Yogurt Palace", e: "🍦", earn: "$200/wk (summer)", grow: "📊 Seasonal", comp: "5 nearby", con: "⭐⭐", sc: 55, res: "Risky — great in summer, struggles in winter with lots of competition." },
    { n: "Code Tutoring Hub", e: "💻", earn: "$80/wk", grow: "🚀 Fast growing", comp: "1 nearby", con: "⭐⭐⭐⭐⭐", sc: 92, res: "Excellent! Low competition, high demand, very consistent." }
  ];
  return (
    <div>
      <p style={{ fontSize: 14, color: C.text, marginBottom: 16 }}>Investigate 3 businesses and pick the best investment:</p>
      {biz.map((b, i) => (
        <div key={i} onClick={() => !rev && setP(i)} style={{ background: picked === i ? C.gold + "12" : "#fff", border: `2px solid ${picked === i ? C.gold : C.border}`, borderRadius: 14, padding: 16, cursor: rev ? "default" : "pointer", marginBottom: 10 }}>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: C.navy }}>{b.e} {b.n}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 13, color: C.text }}>
            <div>📊 {b.earn}</div><div>{b.grow}</div><div>🪪 {b.comp}</div><div>Consistency: {b.con}</div>
          </div>
          {rev && <div style={{ marginTop: 10, padding: 10, borderRadius: 8, fontSize: 13, fontWeight: 600, background: b.sc > 80 ? "#E8F5E9" : b.sc > 60 ? "#FFF8E1" : "#FFEBEE", color: b.sc > 80 ? "#2E7D32" : b.sc > 60 ? "#F57F17" : "#C62828" }}>Score: {b.sc}/100 — {b.res}</div>}
        </div>
      ))}
      {picked !== null && !rev && <button onClick={() => setR(true)} style={{ ...btnS(C.navy, "#fff", { width: "100%", marginBottom: 12 }) }}>Reveal Results 🔍</button>}
      {rev && <button onClick={onDone} style={{ ...btnS(C.gold, C.navy, { width: "100%" }) }}>Complete Activity ⭐</button>}
    </div>
  );
}

// ---- RISK RANKER ----
function RiskRankerAct({ onDone }: ActProps) {
  const [items, setI] = useState([
    { id: 0, n: "Savings Account", e: "🏦", r: 0 }, { id: 1, n: "Government Bond", e: "🏛️", r: 1 },
    { id: 2, n: "S&P 500 Index Fund", e: "📊", r: 2 }, { id: 3, n: "Individual Tech Stock", e: "📱", r: 3 },
    { id: 4, n: "Friend's Startup", e: "🚀", r: 4 }, { id: 5, n: "Rare Collectible Card", e: "🃏", r: 5 }
  ].sort(() => Math.random() - 0.5));
  const [chk, setChk] = useState(false);
  const mv = (idx: number, dir: number) => { if (chk) return; const n = [...items]; const s = idx + dir; if (s < 0 || s >= n.length) return; [n[idx], n[s]] = [n[s], n[idx]]; setI(n); };
  const score = items.reduce((s, it, i) => s + (it.r === i ? 1 : 0), 0);
  return (
    <div>
      <p style={{ fontSize: 14, color: C.text, marginBottom: 16 }}>Arrange from LOWEST risk (top) to HIGHEST risk (bottom):</p>
      {items.map((it, i) => (
        <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, background: chk ? (it.r === i ? "#E8F5E9" : "#FFEBEE") : "#fff", border: `1px solid ${C.border}`, marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: C.textLight, fontWeight: 700, width: 20 }}>{i + 1}.</span>
          <span style={{ fontSize: 18 }}>{it.e}</span>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: C.navy }}>{it.n}</span>
          {!chk && <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => mv(i, -1)} style={{ background: C.border, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 14 }}>↑</button>
            <button onClick={() => mv(i, 1)} style={{ background: C.border, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 14 }}>↓</button>
          </div>}
          {chk && <span style={{ fontSize: 16 }}>{it.r === i ? "✅" : "❌"}</span>}
        </div>
      ))}
      {!chk
        ? <button onClick={() => setChk(true)} style={{ ...btnS(C.navy, "#fff", { width: "100%", marginTop: 12 }) }}>Check My Ranking</button>
        : <div>
          <div style={{ textAlign: "center", padding: 12, background: C.gold + "15", borderRadius: 10, marginTop: 12, marginBottom: 12, fontSize: 15, fontWeight: 700, color: C.navy }}>You got {score}/6 correct!</div>
          <button onClick={onDone} style={{ ...btnS(C.gold, C.navy, { width: "100%" }) }}>Complete Activity ⭐</button>
        </div>
      }
    </div>
  );
}

// ---- PORTFOLIO BUILDER ----
function PortfolioAct({ onDone }: ActProps) {
  const [st, setSt] = useState(60); const [bo, setBo] = useState(30); const [sa, setSa] = useState(10);
  const [sim, setSim] = useState(false); const [fv, setFv] = useState(0);
  const tot = st + bo + sa;
  const stP = tot > 0 ? st / tot : 0; const boP = tot > 0 ? bo / tot : 0; const saP = tot > 0 ? sa / tot : 0;
  const doSim = () => { setFv(Math.round(stP * 100 * Math.pow(1 + (Math.random() * 0.14 - 0.02), 5) + boP * 100 * Math.pow(1 + (Math.random() * 0.04 + 0.01), 5) + saP * 100 * Math.pow(1.03, 5))); setSim(true); };
  const risk = stP > 0.7 ? "High risk, high potential!" : stP > 0.4 ? "Balanced mix — nice!" : "Conservative and safe.";
  return (
    <div>
      <div style={{ background: C.navy, borderRadius: 12, padding: 16, marginBottom: 20, textAlign: "center" }}>
        <span style={{ color: C.goldLight, fontSize: 14 }}>Investing: </span><span style={{ color: C.gold, fontSize: 24, fontWeight: 700 }}>$100</span>
      </div>
      {[{ l: "📈 Stocks (high growth, high risk)", v: st, s: setSt }, { l: "📋 Bonds (steady, medium risk)", v: bo, s: setBo }, { l: "🏦 Savings (safe, low growth)", v: sa, s: setSa }].map((x, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4, flexWrap: "wrap", gap: 4 }}>
            <span style={{ fontWeight: 600, color: C.navy }}>{x.l}</span>
            <span style={{ color: C.textLight }}>${x.v} ({tot > 0 ? Math.round(x.v / tot * 100) : 0}%)</span>
          </div>
          <input type="range" min="0" max="100" value={x.v} onChange={e => { x.s(parseInt(e.target.value)); setSim(false); }} style={{ width: "100%", accentColor: C.gold }} />
        </div>
      ))}
      {!sim
        ? <button onClick={doSim} style={{ ...btnS(C.navy, "#fff", { width: "100%", marginBottom: 12 }) }}>Simulate 5 Years 🎲</button>
        : <div>
          <div style={{ background: C.gold + "15", borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: C.textLight }}>After 5 years, $100 became roughly...</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.navy }}>${fv}</div>
            <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>{risk}</div>
          </div>
          <button onClick={onDone} style={{ ...btnS(C.gold, C.navy, { width: "100%" }) }}>Complete Activity ⭐</button>
        </div>
      }
    </div>
  );
}

// ---- ROUTER ----
export default function Activities({ type, onDone, playerName }: { type: string; onDone: () => void; playerName?: string }) {
  switch (type) {
    case "money-idea": return <MoneyIdeaAct onDone={onDone} />;
    case "budget-builder": return <BudgetAct onDone={onDone} />;
    case "interest-calc": return <InterestAct onDone={onDone} />;
    case "biz-detective": return <BizDetectiveAct onDone={onDone} />;
    case "risk-ranker": return <RiskRankerAct onDone={onDone} />;
    case "portfolio-builder": return <PortfolioAct onDone={onDone} />;
    default: return <div>Activity coming soon!</div>;
  }
}
