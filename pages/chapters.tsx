import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { C, CH, FEEDBACK_URL, TOTAL_STARS, chapterStarCount, chapterTotalStars } from "@/lib/data";
import { Logo, btnS, FeedbackButton } from "@/components/ui";
import { useProfiles } from "@/lib/useProfiles";
import CertificateAct from "@/components/CertificateAct";
import { gaEvent } from "@/lib/data";

const TOOLS = [
  { icon: "🎯", label: "Dream Goal Calculator", sub: "How long to save for anything", href: "/tools/dream-goal-calculator" },
  { icon: "🗺️", label: "Choose Your Path", sub: "Money adventure stories", href: "/tools/choose-your-path" },
  { icon: "🪣", label: "Drag & Drop Budgeter", sub: "Sort money into 4 buckets", href: "/tools/drag-drop-budgeter" },
];

const ChaptersPage: NextPage = () => {
  const router = useRouter();
  const { activeProfile, hydrated } = useProfiles();
  const [showCert, setShowCert] = useState(false);

  useEffect(() => {
    if (hydrated && !activeProfile) {
      router.replace("/welcome?next=/chapters");
    }
  }, [hydrated, activeProfile, router]);

  if (!hydrated || !activeProfile) return null;

  const stars = activeProfile.stars;
  const earnedStars = Object.keys(stars).length;
  const allDone = earnedStars >= TOTAL_STARS;

  const handleChapterClick = (i: number) => {
    gaEvent("chapter_start", { chapter: i + 1 });
    router.push(`/chapter/${i + 1}`);
  };

  return (
    <>
      <Head>
        <title>Your Chapters – The Kid Vault</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ minHeight: "100vh", background: C.cream, fontFamily: "Georgia,serif", color: C.navy }}>

        {/* NAV */}
        <nav style={{ background: C.navy, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => router.push("/")}>
            <Logo size={28} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Georgia,serif" }}>The Kid Vault</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: C.gold, fontSize: 14, fontWeight: 700, fontFamily: "'Trebuchet MS',sans-serif" }}>⭐ {earnedStars}/{TOTAL_STARS}</span>
            <button onClick={() => router.push("/welcome")} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 13, cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif" }}>
              {activeProfile.name} ▾
            </button>
          </div>
        </nav>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 48px" }}>
          <h2 style={{ fontSize: "clamp(22px,5vw,28px)", marginBottom: 8, fontFamily: "Georgia,serif" }}>Hey {activeProfile.name}! 👋</h2>
          <p style={{ color: C.textLight, fontSize: 15, marginBottom: 32, fontFamily: "'Trebuchet MS',sans-serif" }}>Keep going — every star gets you closer to your certificate!</p>

          {/* Certificate banner */}
          {allDone && (
            <div onClick={() => setShowCert(true)} style={{ background: `linear-gradient(135deg,${C.gold}20,${C.goldLight}40)`, border: `2px solid ${C.gold}`, borderRadius: 16, padding: 20, marginBottom: 24, cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🎓</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.navy }}>Your Certificate is Ready!</div>
              <div style={{ fontSize: 14, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif", marginTop: 4 }}>Click here to view and download your certificate.</div>
            </div>
          )}

          {/* Certificate modal */}
          {showCert && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowCert(false)}>
              <div onClick={e => e.stopPropagation()} style={{ background: C.cream, borderRadius: 20, padding: 24, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
                <CertificateAct earnedStars={earnedStars} totalStars={TOTAL_STARS} playerName={activeProfile.name} onDone={() => setShowCert(false)} />
              </div>
            </div>
          )}

          {/* Chapter cards */}
          {CH.map((c, i) => {
            const cst = chapterStarCount(stars, i);
            const ct = chapterTotalStars(i);
            const pct = Math.round(cst / ct * 100);
            return (
              <div key={i} onClick={() => handleChapterClick(i)}
                style={{ background: "#fff", borderRadius: 16, padding: "16px 20px", marginBottom: 12, border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.3s", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: c.c + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{c.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: c.c, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'Trebuchet MS',sans-serif" }}>Chapter {c.id}</div>
                    <div style={{ fontSize: "clamp(15px,4vw,18px)", fontWeight: 700, color: C.navy }}>{c.t}</div>
                    <div style={{ fontSize: 13, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.d}</div>
                  </div>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>⭐ {cst}/{ct}</div>
                  </div>
                </div>
                <div style={{ marginTop: 10, height: 5, borderRadius: 3, background: C.border }}>
                  <div style={{ height: 5, borderRadius: 3, background: `linear-gradient(90deg,${C.gold},${C.goldDark})`, width: `${pct}%`, transition: "width 0.5s" }} />
                </div>
              </div>
            );
          })}

          {/* Divider */}
          <div style={{ maxWidth: 100, height: 2, background: `linear-gradient(90deg,transparent,${C.gold},transparent)`, margin: "24px auto 8px", borderRadius: 2 }} />
          <p style={{ textAlign: "center", fontSize: 11, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Want more?</p>

          {/* Tools card */}
          <div
            style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(46,196,182,0.25)", background: "linear-gradient(135deg,#1b3a47,#162e3c)", boxShadow: "0 4px 20px rgba(46,196,182,0.08)" }}
          >
            {/* Teal top accent line */}
            <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#2EC4B6,transparent)" }} />

            <div style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: C.teal, fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 700, marginBottom: 7 }}>🛠️ Interactive Tools</div>
              <div style={{ fontSize: "clamp(17px,4vw,20px)", fontWeight: 700, color: "#fff", marginBottom: 6, lineHeight: 1.2 }}>
                Learn Money by <em style={{ color: C.teal }}>Doing</em>
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 16 }}>
                Calculators, games &amp; stories that bring your lessons to life.
              </div>
              <div onClick={() => router.push("/tools")} style={{ display: "inline-block", background: C.teal, color: C.navy, padding: "9px 22px", borderRadius: 50, fontSize: 13, fontWeight: 700, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 18, cursor: "pointer" }}>
                Explore Tools →
              </div>

              {/* 3 horizontal pills — stack on mobile via CSS class */}
              <div className="tools-pills">
                {TOOLS.map((tool, i) => (
                  <div key={i} onClick={() => router.push(tool.href)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, padding: "10px 12px", position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
                    <div style={{ position: "absolute", top: 10, right: 10, width: 6, height: 6, borderRadius: "50%", background: C.teal, boxShadow: "0 0 6px rgba(46,196,182,0.6)" }} />
                    <div style={{ fontSize: 16, marginBottom: 5 }}>{tool.icon}</div>
                    <div style={{ color: "#fff", fontSize: 11, fontWeight: 700, fontFamily: "'Trebuchet MS',sans-serif", lineHeight: 1.3, marginBottom: 2 }}>{tool.label}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "'Trebuchet MS',sans-serif", lineHeight: 1.3 }}>{tool.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <FeedbackButton url={FEEDBACK_URL} />
    </>
  );
};

export default ChaptersPage;
