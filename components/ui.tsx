import React, { useState, useRef } from "react";
import { C, VOCAB } from "@/lib/data";

// ---- LOGO ----
export function Logo({ size = 90 }: { size?: number }) {
  const id = `kv${size}${Math.random().toString(36).slice(2, 6)}`;
  const op = (s: number) => {
    const cx = s / 2, cy = s / 2, r = s * 0.46;
    let d = "";
    for (let i = 0; i < 8; i++) {
      const a = (Math.PI * 2 * i) / 8 - Math.PI / 8;
      d += (i === 0 ? "M" : "L") + (cx + r * Math.cos(a)).toFixed(1) + " " + (cy + r * Math.sin(a)).toFixed(1) + " ";
    }
    return d + "Z";
  };
  return (
    <svg width={size} height={size} viewBox="0 0 90 90">
      <defs>
        <linearGradient id={`g${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.gold} />
          <stop offset="100%" stopColor={C.goldDark} />
        </linearGradient>
        <mask id={id}>
          <rect width="90" height="90" fill="white" />
          <rect x="44" y="22" width="2" height="46" fill="black" opacity="0.6" />
          <text x="31" y="58" textAnchor="middle" fontFamily="Georgia,serif" fontSize="32" fontWeight="700" fill="black">K</text>
          <text x="59" y="58" textAnchor="middle" fontFamily="Georgia,serif" fontSize="32" fontWeight="700" fill="black">V</text>
        </mask>
      </defs>
      <path d={op(90)} fill={`url(#g${id})`} mask={`url(#${id})`} />
    </svg>
  );
}

// ---- BUTTON STYLE HELPER ----
export const btnS = (
  bg: string,
  fg: string,
  extra: React.CSSProperties = {}
): React.CSSProperties => ({
  background: bg,
  color: fg,
  border: "none",
  padding: "14px 32px",
  borderRadius: 50,
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "'Trebuchet MS',sans-serif",
  transition: "all 0.3s ease",
  ...extra,
});

// ---- VOCAB TOOLTIP ----
export function Tip({ word, children }: { word: string; children?: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const def = VOCAB[word] || "";
  return (
    <span
      ref={ref}
      style={{ position: "relative", display: "inline" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)}
    >
      <span style={{ borderBottom: `2px dotted ${C.gold}`, cursor: "help", color: C.navy, fontWeight: 600 }}>
        {children || word}
      </span>
      {show && def && (
        <span style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
          background: C.navy, color: "#fff", padding: "10px 14px", borderRadius: 10, fontSize: 13,
          lineHeight: 1.5, width: "min(260px, 80vw)", zIndex: 999, boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 400, textAlign: "left", pointerEvents: "none",
        }}>
          <span style={{ color: C.gold, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 4 }}>
            {word}
          </span>
          {def}
          <span style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `6px solid ${C.navy}` }} />
        </span>
      )}
    </span>
  );
}

// ---- LESSON TEXT with vocab tooltips ----
export function LessonText({ text }: { text: string }) {
  const vocabKeys = Object.keys(VOCAB).sort((a, b) => b.length - a.length);
  type Part = { type: "text"; val: string } | { type: "vocab"; word: string; display: string };
  let parts: Part[] = [{ type: "text", val: text }];

  for (const vk of vocabKeys) {
    const searchWord = vk.includes("(") ? vk.split("(")[0].trim() : vk;
    const regex = new RegExp(`(${searchWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const newParts: Part[] = [];
    for (const part of parts) {
      if (part.type !== "text") { newParts.push(part); continue; }
      const splits = part.val.split(regex);
      for (const s of splits) {
        if (s.toLowerCase() === searchWord.toLowerCase()) {
          newParts.push({ type: "vocab", word: vk, display: s });
        } else if (s) {
          newParts.push({ type: "text", val: s });
        }
      }
    }
    parts = newParts;
  }

  return (
    <span>
      {parts.map((p, i) =>
        p.type === "vocab"
          ? <Tip key={i} word={p.word}>{p.display}</Tip>
          : <span key={i}>{(p as { type: "text"; val: string }).val}</span>
      )}
    </span>
  );
}

// ---- FEEDBACK BUTTON ----
export function FeedbackButton({ url }: { url: string }) {
  return (
    <div
      onClick={() => window.open(url, "_blank")}
      style={{
        position: "fixed", bottom: 24, right: 24, background: C.teal, color: "#fff",
        padding: "12px 20px", borderRadius: 50, fontSize: 14, fontWeight: 700,
        fontFamily: "'Trebuchet MS',sans-serif", cursor: "pointer",
        boxShadow: "0 4px 20px rgba(46,196,182,0.4)", zIndex: 1000,
      }}
    >
      💬 Feedback
    </div>
  );
}
