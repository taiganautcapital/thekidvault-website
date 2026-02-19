import React, { useState } from "react";
import { C, CH } from "@/lib/data";
import { Logo, btnS } from "@/components/ui";

interface Props {
  earnedStars: number | Record<string, boolean>;
  totalStars: number;
  playerName: string;
  stars?: Record<string, boolean>;
  onDone: () => void;
}

export default function CertificateAct({ earnedStars, totalStars, playerName, stars, onDone }: Props) {
  const [certName, setCertName] = useState(playerName || "");
  const [nameSet, setNameSet] = useState(!!playerName);
  const [downloading, setDownloading] = useState(false);

  // Support both number and stars-object forms
  const starCount = typeof earnedStars === "number" ? earnedStars : Object.keys(earnedStars).length;
  const starsObj = stars || (typeof earnedStars === "object" ? earnedStars : {});

  // Check if all prior chapters complete (when stars object provided)
  let allPriorDone = true;
  if (stars) {
    for (let ci = 0; ci < 6; ci++) {
      const cc = CH[ci];
      for (const l of cc.lessons) { if (!stars[l.id]) { allPriorDone = false; break; } }
      if (!stars[`ch${cc.id}-quiz`] || !stars[`ch${cc.id}-act`]) allPriorDone = false;
      if (!allPriorDone) break;
    }
    const ch7 = CH[6];
    for (const l of ch7.lessons) { if (!stars[l.id]) allPriorDone = false; }
    if (!stars["ch7-quiz"]) allPriorDone = false;
  }

  if (stars && !allPriorDone) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 8 }}>Certificate Locked</div>
        <div style={{ fontSize: 14, color: C.textLight, lineHeight: 1.6, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 20 }}>
          Complete all 7 chapters — every lesson, quiz, and activity — to unlock your certificate!
        </div>
        <div style={{ background: "#FFF3E0", borderRadius: 12, padding: 16, textAlign: "left", fontSize: 13, color: "#E65100", fontFamily: "'Trebuchet MS',sans-serif" }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Your progress:</div>
          {CH.map((c, i) => {
            const cLessons = c.lessons.filter(l => stars[l.id]).length;
            const cQuiz = stars[`ch${c.id}-quiz`] ? 1 : 0;
            const cAct = stars[`ch${c.id}-act`] ? 1 : 0;
            const cDone = cLessons + cQuiz + cAct;
            const cTotal = c.lessons.length + 2;
            return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: cDone === cTotal ? "#2E7D32" : "#E65100" }}>
                <span>{c.icon} Ch. {c.id}: {c.t}</span>
                <span style={{ fontWeight: 700 }}>{cDone === cTotal ? "✅" : `${cDone}/${cTotal}`}</span>
              </div>
            );
          })}
        </div>
        <button onClick={onDone} style={{ marginTop: 20, background: C.navy, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 50, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif" }}>Back to Chapters</button>
      </div>
    );
  }

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      try {
        const w = window as any;
        let JsPDF = null;
        if (w.jspdf?.jsPDF) JsPDF = w.jspdf.jsPDF;
        else if (w.jsPDF) JsPDF = w.jsPDF;
        if (!JsPDF) { alert("PDF library is still loading. Please wait and try again."); setDownloading(false); return; }

        const doc = new JsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        const pw = 297, ph = 210;
        doc.setFillColor(26, 35, 50); doc.rect(0, 0, pw, ph, "F");
        doc.setDrawColor(212, 168, 67); doc.setLineWidth(2); doc.roundedRect(12, 12, pw - 24, ph - 24, 6, 6, "S");
        doc.setLineWidth(0.5); doc.roundedRect(16, 16, pw - 32, ph - 32, 4, 4, "S");
        doc.setFillColor(212, 168, 67); doc.roundedRect(pw / 2 - 8, 28, 16, 16, 2, 2, "F");
        doc.setTextColor(26, 35, 50); doc.setFont("helvetica", "bold"); doc.setFontSize(10);
        doc.text("K | V", pw / 2, 38, { align: "center" });
        doc.setTextColor(212, 168, 67); doc.setFont("times", "bold"); doc.setFontSize(28);
        doc.text("Certificate of Achievement", pw / 2, 60, { align: "center" });
        doc.setTextColor(245, 230, 184); doc.setFont("times", "normal"); doc.setFontSize(12);
        doc.text("The Kid Vault \u2014 Financial Education Graduate", pw / 2, 70, { align: "center" });
        doc.setDrawColor(212, 168, 67); doc.setLineWidth(0.4); doc.line(pw / 2 - 50, 75, pw / 2 + 50, 75);
        doc.setTextColor(255, 255, 255); doc.setFont("times", "bold"); doc.setFontSize(32);
        doc.text(certName, pw / 2, 90, { align: "center" });
        doc.line(pw / 2 - 50, 95, pw / 2 + 50, 95);
        doc.setTextColor(212, 168, 67); doc.setFont("helvetica", "bold"); doc.setFontSize(18);
        doc.text(`${starCount} / ${totalStars} Stars Earned`, pw / 2, 108, { align: "center" });
        doc.setTextColor(180, 180, 200); doc.setFont("helvetica", "normal"); doc.setFontSize(10);
        doc.text("Completed all 7 chapters, quizzes, and activities covering money basics, saving,", pw / 2, 120, { align: "center" });
        doc.text("interest, investing, diversification, and financial planning.", pw / 2, 126, { align: "center" });
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const now = new Date();
        doc.setTextColor(245, 230, 184); doc.setFontSize(11);
        doc.text(`${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`, pw / 2, 140, { align: "center" });
        doc.setDrawColor(100, 100, 120); doc.setLineWidth(0.3); doc.line(55, 168, 130, 168);
        doc.setTextColor(150, 150, 170); doc.setFontSize(9);
        doc.text("Student Signature", 92.5, 174, { align: "center" });
        const sx = pw - 92.5, sy = 160;
        doc.setDrawColor(212, 168, 67); doc.setLineWidth(1.5); doc.circle(sx, sy, 16, "S");
        doc.setLineWidth(0.8); doc.circle(sx, sy, 12.5, "S");
        for (let si = 0; si < 24; si++) {
          const ang = Math.PI * 2 * si / 24;
          doc.setFillColor(212, 168, 67); doc.circle(sx + Math.cos(ang) * 14.2, sy + Math.sin(ang) * 14.2, 0.4, "F");
        }
        doc.setTextColor(212, 168, 67); doc.setFont("helvetica", "bold"); doc.setFontSize(5);
        doc.text("CERTIFIED", sx, sy - 3, { align: "center" });
        doc.setFontSize(7.5); doc.text("KV", sx, sy + 3, { align: "center" });
        doc.setFontSize(4.5); doc.text("COMPLETE", sx, sy + 7.5, { align: "center" });
        doc.setTextColor(120, 120, 140); doc.setFont("helvetica", "normal"); doc.setFontSize(8);
        doc.text("thekidvault.com", pw / 2, 192, { align: "center" });
        doc.save(`${certName.replace(/[^a-zA-Z0-9]/g, "_")}_KidVault_Certificate.pdf`);
      } catch (e: any) {
        alert("PDF error: " + e.message);
      }
      setDownloading(false);
    }, 100);
  };

  if (!nameSet) return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 16 }}>🎉 You did it! Enter your name for the certificate:</div>
      <input
        value={certName}
        onChange={e => setCertName(e.target.value)}
        placeholder="Your name"
        onKeyDown={e => { if (e.key === "Enter" && certName.trim()) setNameSet(true); }}
        style={{ padding: "12px 20px", borderRadius: 10, border: `2px solid ${C.gold}`, fontSize: 16, width: "100%", maxWidth: 300, textAlign: "center", marginBottom: 16, boxSizing: "border-box" }}
      />
      <br />
      <button onClick={() => { if (certName.trim()) setNameSet(true); }} disabled={!certName.trim()} style={{ ...btnS(certName.trim() ? C.gold : "#ddd", certName.trim() ? C.navy : "#999", { opacity: certName.trim() ? 1 : 0.5 }) }}>
        Create My Certificate →
      </button>
    </div>
  );

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ background: `linear-gradient(135deg,${C.navy},${C.navyLight})`, borderRadius: 20, padding: "32px 24px", marginBottom: 20, border: `4px solid ${C.gold}` }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><Logo size={60} /></div>
        <h3 style={{ color: C.gold, fontSize: 24, margin: "8px 0 4px", fontFamily: "Georgia,serif" }}>Certificate of Achievement</h3>
        <p style={{ color: C.goldLight, fontSize: 14, margin: "0 0 8px" }}>The Kid Vault — Financial Education Graduate</p>
        <div style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: "16px 0", fontFamily: "Georgia,serif" }}>{certName}</div>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ color: C.gold, fontSize: 36, fontWeight: 700 }}>⭐ {starCount} / {totalStars}</div>
          <div style={{ color: C.goldLight, fontSize: 13, marginTop: 4 }}>Stars Earned</div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.6 }}>Completed all 7 chapters, quizzes, and activities covering money basics, saving, interest, investing, diversification, and financial planning.</p>
        <div style={{ color: C.goldLight, fontSize: 12, marginTop: 12 }}>thekidvault.com</div>
      </div>
      <button onClick={handleDownload} disabled={downloading} style={{ ...btnS(C.navy, "#fff", { width: "100%", marginBottom: 16, opacity: downloading ? 0.7 : 1 }) }}>
        {downloading ? "⏳ Generating..." : "📥 Download Certificate (PDF)"}
      </button>
      <button onClick={onDone} style={{ ...btnS(C.gold, C.navy, { width: "100%" }) }}>Finish! 🎉</button>
    </div>
  );
}
