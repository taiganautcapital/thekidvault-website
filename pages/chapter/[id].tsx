import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { C, CH, FEEDBACK_URL, TOTAL_STARS, gaEvent } from "@/lib/data";
import { Logo, btnS, LessonText, FeedbackButton } from "@/components/ui";
import { useProfiles } from "@/lib/useProfiles";
import CertificateAct from "@/components/CertificateAct";
import Activities from "@/components/Activities";

interface Props { chapterIndex: number; }

// ---- SIDEBAR NAV ----
function LessonNav({ ch, lesIdx, phase, onGoLesson, onGoQuiz, onGoActivity, onSwitchChapter, stars, onClose, show }: any) {
  const [expanded, setExpanded] = useState(ch.id);
  const router = useRouter();
  return (
    <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: "min(300px,82vw)", background: C.navy, zIndex: 200, overflowY: "auto", transition: "transform 0.3s ease", transform: show ? "translateX(0)" : "translateX(-100%)", boxShadow: show ? "4px 0 24px rgba(0,0,0,0.3)" : "none" }}>
      <div style={{ padding: "16px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => { router.push("/chapters"); onClose(); }}>
          <Logo size={24} />
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "Georgia,serif" }}>The Kid Vault</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 22, cursor: "pointer", padding: 4 }}>✕</button>
      </div>
      <div style={{ padding: "12px 0" }}>
        {CH.map((c: any, ci: number) => {
          const isCurrent = c.id === ch.id;
          const isOpen = expanded === c.id;
          const cStarCount = c.lessons.filter((l: any) => stars[l.id]).length + (stars[`ch${c.id}-quiz`] ? 1 : 0) + (stars[`ch${c.id}-act`] ? 1 : 0);
          const cTotalCount = c.lessons.length + 2;
          return (
            <div key={ci}>
              <div onClick={() => setExpanded(isOpen ? null : c.id)} style={{ padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: isCurrent ? "rgba(255,255,255,0.06)" : "transparent", borderLeft: isCurrent ? `3px solid ${c.c}` : "3px solid transparent" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{c.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: c.c, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Trebuchet MS',sans-serif" }}>Ch. {c.id}</div>
                  <div style={{ color: isCurrent ? "#fff" : "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: isCurrent ? 700 : 400, fontFamily: "'Trebuchet MS',sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.t}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: C.gold, fontFamily: "'Trebuchet MS',sans-serif" }}>{cStarCount}/{cTotalCount}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}>{isOpen ? "▾" : "▸"}</span>
                </div>
              </div>
              {isOpen && (
                <div style={{ background: "rgba(0,0,0,0.15)" }}>
                  {c.lessons.map((l: any, li: number) => {
                    const active = isCurrent && phase === "lessons" && li === lesIdx;
                    const done = !!stars[l.id];
                    return (
                      <div key={li} onClick={() => { if (isCurrent) onGoLesson(li); else { onSwitchChapter(ci, li); } onClose(); }}
                        style={{ padding: "8px 16px 8px 36px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, background: active ? "rgba(255,255,255,0.08)" : "transparent" }}>
                        <span style={{ fontSize: 12, width: 16, textAlign: "center" }}>{done ? "⭐" : l.icon}</span>
                        <span style={{ color: active ? "#fff" : "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "'Trebuchet MS',sans-serif", fontWeight: active ? 600 : 400 }}>{l.t}</span>
                      </div>
                    );
                  })}
                  <div onClick={() => { if (isCurrent) onGoQuiz(); else onSwitchChapter(ci, -1, "quiz"); onClose(); }} style={{ padding: "8px 16px 8px 36px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, background: isCurrent && phase === "quiz" ? "rgba(255,255,255,0.08)" : "transparent" }}>
                    <span style={{ fontSize: 12, width: 16, textAlign: "center" }}>{stars[`ch${c.id}-quiz`] ? "⭐" : "❓"}</span>
                    <span style={{ color: isCurrent && phase === "quiz" ? "#fff" : "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "'Trebuchet MS',sans-serif" }}>Chapter Quiz</span>
                  </div>
                  <div onClick={() => { if (isCurrent) onGoActivity(); else onSwitchChapter(ci, -1, "activity"); onClose(); }} style={{ padding: "8px 16px 8px 36px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, background: isCurrent && phase === "activity" ? "rgba(255,255,255,0.08)" : "transparent", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, width: 16, textAlign: "center" }}>{stars[`ch${c.id}-act`] ? "⭐" : "🎮"}</span>
                    <span style={{ color: isCurrent && phase === "activity" ? "#fff" : "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "'Trebuchet MS',sans-serif" }}>Activity</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- CHAPTER PAGE ----
const ChapterPage: NextPage<Props> = ({ chapterIndex }) => {
  const router = useRouter();
  const { activeProfile, markStar, hydrated } = useProfiles();
  const [lesIdx, setLesIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [phase, setPhase] = useState<"lessons" | "quiz" | "activity">("lessons");
  const [qIdx, setQIdx] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [sideNav, setSideNav] = useState(false);

  useEffect(() => {
    if (hydrated && !activeProfile) {
      router.replace(`/welcome?next=/chapter/${chapterIndex + 1}`);
    }
  }, [hydrated, activeProfile, router, chapterIndex]);

  const ch = CH[chapterIndex];

if (!hydrated || !activeProfile) return (
  <>
    <Head>
      <title>{ch.seoTitle}</title>
      <meta name="description" content={ch.seoDesc} />
      <link rel="canonical" href={`https://www.thekidvault.com/chapter/${ch.id}`} />
      <meta property="og:title" content={ch.seoTitle} />
      <meta property="og:description" content={ch.seoDesc} />
      <meta property="og:url" content={`https://www.thekidvault.com/chapter/${ch.id}`} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="The Kid Vault" />
      <meta property="og:image" content="https://www.thekidvault.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ch.seoTitle} />
      <meta name="twitter:description" content={ch.seoDesc} />
      <meta name="twitter:image" content="https://www.thekidvault.com/og-image.png" />
    </Head>
    <div />
  </>
);

  const stars = activeProfile.stars;
  const earnedStars = Object.keys(stars).length;
  const les = ch.lessons[lesIdx];

  const goLesson = (i: number) => { setPhase("lessons"); setLesIdx(i); setCardIdx(0); setQIdx(0); setAnswered(null); };
  const goQuiz = () => { setPhase("quiz"); setQIdx(0); setAnswered(null); };
  const goActivity = () => { setPhase("activity"); };

  const nextCard = () => {
    if (cardIdx < les.content.length - 1) {
      setCardIdx(cardIdx + 1);
    } else {
      markStar(les.id);
      gaEvent("lesson_complete", { chapter: ch.id, lesson: lesIdx + 1 });
      if (lesIdx < ch.lessons.length - 1) { setLesIdx(lesIdx + 1); setCardIdx(0); }
      else goQuiz();
    }
  };

  const answerQuiz = (ai: number) => setAnswered(ai);

  const nextQuiz = () => {
    if (qIdx < ch.quiz.length - 1) { setQIdx(qIdx + 1); setAnswered(null); }
    else {
      markStar(`ch${ch.id}-quiz`);
      gaEvent("quiz_complete", { chapter: ch.id });
      goActivity();
    }
  };

  const onActivityDone = () => {
    markStar(`ch${ch.id}-act`);
    gaEvent("activity_complete", { chapter: ch.id });
    if (chapterIndex < CH.length - 1) {
      router.push(`/chapter/${chapterIndex + 2}`);
    } else {
      router.push("/chapters");
    }
  };

  const switchChapter = (ci: number, li: number, ph?: string) => {
    router.push(`/chapter/${ci + 1}`).then(() => {
      // State reset happens via page reload; phase is default "lessons"
    });
  };

  const navBar: React.CSSProperties = { background: C.navy, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 };

  return (
    <>
      <Head>
  <title>{ch.seoTitle}</title>
  <meta name="description" content={ch.seoDesc} />
  <link rel="canonical" href={`https://www.thekidvault.com/chapter/${ch.id}`} />

  {/* Open Graph */}
  <meta property="og:title" content={ch.seoTitle} />
  <meta property="og:description" content={ch.seoDesc} />
  <meta property="og:url" content={`https://www.thekidvault.com/chapter/${ch.id}`} />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="The Kid Vault" />
  <meta property="og:image" content="https://www.thekidvault.com/og-image.png" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={ch.seoTitle} />
  <meta name="twitter:description" content={ch.seoDesc} />
  <meta name="twitter:image" content="https://www.thekidvault.com/og-image.png" />

  {/* Structured Data */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": ch.seoTitle,
      "description": ch.seoDesc,
      "url": `https://www.thekidvault.com/chapter/${ch.id}`,
      "provider": {
        "@type": "Organization",
        "name": "The Kid Vault",
        "url": "https://www.thekidvault.com"
      },
      "educationalLevel": "Elementary",
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "audienceType": "Children ages 6-12"
      }
    })}}
  />
</Head>
      <div style={{ minHeight: "100vh", background: C.cream, fontFamily: "Georgia,serif", color: C.navy }}>
        {sideNav && <div onClick={() => setSideNav(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 150 }} />}
        <LessonNav
          ch={ch} lesIdx={lesIdx} phase={phase} stars={stars} show={sideNav}
          onClose={() => setSideNav(false)}
          onGoLesson={goLesson} onGoQuiz={goQuiz} onGoActivity={goActivity}
          onSwitchChapter={switchChapter}
        />

        {/* NAV BAR */}
        <nav style={navBar}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setSideNav(true)} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: "4px 8px" }}>☰</button>
            <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} onClick={() => router.push("/chapters")}>
              <Logo size={22} />
            </div>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "'Trebuchet MS',sans-serif", textAlign: "center", flex: 1 }}>
            Ch. {ch.id}: {ch.t}
          </div>
          <div style={{ color: C.gold, fontSize: 13, fontWeight: 700, fontFamily: "'Trebuchet MS',sans-serif" }}>⭐ {earnedStars}</div>
        </nav>

        {/* CHAPTER SUB-HEADER */}
        <div style={{ background: `linear-gradient(135deg,${ch.c}12,${ch.c}06)`, padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: ch.c, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, fontFamily: "'Trebuchet MS',sans-serif" }}>
                {phase === "quiz" ? "Chapter Quiz" : phase === "activity" ? "Activity" : `Lesson ${lesIdx + 1} of ${ch.lessons.length}`}
              </div>
              <div style={{ fontSize: "clamp(16px,4vw,20px)", fontWeight: 700 }}>
                {phase === "lessons" ? les.t : phase === "quiz" ? "Test Your Knowledge" : ch.act.t}
              </div>
            </div>
            {phase === "lessons" && (
              <div style={{ display: "flex", gap: 4 }}>
                <button disabled={lesIdx === 0} onClick={() => goLesson(lesIdx - 1)} style={{ background: lesIdx === 0 ? "transparent" : C.navy + "15", border: `1px solid ${lesIdx === 0 ? C.border : C.navy + "30"}`, borderRadius: 8, padding: "6px 12px", cursor: lesIdx === 0 ? "default" : "pointer", fontSize: 13, color: lesIdx === 0 ? C.border : C.navy, fontWeight: 600 }}>← Prev</button>
                <button disabled={lesIdx >= ch.lessons.length - 1} onClick={() => { markStar(les.id); goLesson(lesIdx + 1); }} style={{ background: lesIdx >= ch.lessons.length - 1 ? "transparent" : C.navy + "15", border: `1px solid ${lesIdx >= ch.lessons.length - 1 ? C.border : C.navy + "30"}`, borderRadius: 8, padding: "6px 12px", cursor: lesIdx >= ch.lessons.length - 1 ? "default" : "pointer", fontSize: 13, color: lesIdx >= ch.lessons.length - 1 ? C.border : C.navy, fontWeight: 600 }}>Next →</button>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
          {/* LESSONS */}
          {phase === "lessons" && (
            <div>
              <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
                {ch.lessons.map((_, i) => (
                  <div key={i} onClick={() => goLesson(i)} style={{ width: i === lesIdx ? 22 : 8, height: 8, borderRadius: 4, background: stars[ch.lessons[i].id] ? C.gold : i === lesIdx ? ch.c : C.border, transition: "all 0.3s", cursor: "pointer" }} />
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 20, padding: "clamp(20px,5vw,28px) clamp(16px,4vw,24px)", border: `1px solid ${C.border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.04)", marginBottom: 20, minHeight: 180 }}>
                <div style={{ fontSize: 13, color: ch.c, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12, fontFamily: "'Trebuchet MS',sans-serif" }}>{les.icon} {les.t}</div>
                <p style={{ fontSize: "clamp(15px,3.5vw,16px)", lineHeight: 1.8, color: C.text, fontFamily: "'Trebuchet MS',sans-serif", margin: 0 }}>
                  <LessonText text={les.content[cardIdx]} />
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <button onClick={() => { if (cardIdx > 0) setCardIdx(cardIdx - 1); }} disabled={cardIdx === 0} style={{ ...btnS(cardIdx === 0 ? "#ddd" : C.navy, cardIdx === 0 ? "#999" : "#fff", { padding: "10px 20px", fontSize: 14, opacity: cardIdx === 0 ? 0.5 : 1 }) }}>← Back</button>
                <span style={{ fontSize: 13, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif" }}>{cardIdx + 1} / {les.content.length}</span>
                <button onClick={nextCard} style={{ ...btnS(C.gold, C.navy, { padding: "10px 20px", fontSize: 14 }) }}>
                  {cardIdx === les.content.length - 1 ? (lesIdx === ch.lessons.length - 1 ? "Start Quiz →" : "Next Lesson →") : "Next →"}
                </button>
              </div>
            </div>
          )}

          {/* QUIZ */}
          {phase === "quiz" && (
            <div>
              <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 20 }}>
                {ch.quiz.map((_, i) => (
                  <div key={i} style={{ width: i === qIdx ? 22 : 8, height: 8, borderRadius: 4, background: i < qIdx ? C.gold : i === qIdx ? ch.c : C.border, transition: "all 0.3s" }} />
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 20, padding: "clamp(20px,5vw,28px) clamp(16px,4vw,24px)", border: `1px solid ${C.border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.04)", marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: ch.c, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12, fontFamily: "'Trebuchet MS',sans-serif" }}>Question {qIdx + 1} of {ch.quiz.length}</div>
                <p style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.5, color: C.navy, marginBottom: 20 }}>{ch.quiz[qIdx].q}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {ch.quiz[qIdx].o.map((o, i) => {
                    const isC = i === ch.quiz[qIdx].c; const isA = answered === i; const done = answered !== null;
                    return (
                      <button key={i} onClick={() => !done && answerQuiz(i)} style={{ padding: "14px 18px", borderRadius: 12, fontSize: 15, fontFamily: "'Trebuchet MS',sans-serif", textAlign: "left", cursor: done ? "default" : "pointer", border: `2px solid ${done ? (isC ? "#4CAF50" : isA ? "#f44336" : C.border) : C.border}`, background: done ? (isC ? "#E8F5E9" : isA ? "#FFEBEE" : "#fff") : "#fff", color: C.navy, fontWeight: 400 }}>
                        {o} {done && isC && "✅"}{done && isA && !isC && "❌"}
                      </button>
                    );
                  })}
                </div>
                {answered !== null && (
                  <div style={{ marginTop: 16, padding: 14, borderRadius: 12, fontSize: 14, fontFamily: "'Trebuchet MS',sans-serif", background: answered === ch.quiz[qIdx].c ? "#E8F5E9" : "#FFF3E0", color: answered === ch.quiz[qIdx].c ? "#2E7D32" : "#E65100" }}>
                    {answered === ch.quiz[qIdx].c
                      ? `🎉 Great job, ${activeProfile.name}! That's correct!`
                      : `Almost, ${activeProfile.name}! The correct answer is highlighted in green. Keep going — you're learning!`}
                  </div>
                )}
              </div>
              {answered !== null && (
                <button onClick={nextQuiz} style={{ ...btnS(C.gold, C.navy, { width: "100%" }) }}>
                  {qIdx === ch.quiz.length - 1 ? "Go to Activity →" : "Next Question →"}
                </button>
              )}
            </div>
          )}

          {/* ACTIVITY */}
          {phase === "activity" && (
            <div style={{ background: "#fff", borderRadius: 20, padding: "clamp(20px,5vw,28px) clamp(16px,4vw,24px)", border: `1px solid ${C.border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 13, color: ch.c, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4, fontFamily: "'Trebuchet MS',sans-serif" }}>Activity</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: C.navy }}>{ch.act.t}</h3>
              <p style={{ fontSize: 14, color: C.textLight, marginBottom: 20, fontFamily: "'Trebuchet MS',sans-serif" }}>{ch.act.d}</p>
              {ch.act.type === "certificate" ? (
                <CertificateAct
                  earnedStars={earnedStars}
                  totalStars={TOTAL_STARS}
                  playerName={activeProfile.name}
                  stars={stars}
                  onDone={onActivityDone}
                />
              ) : (
                <Activities
                  type={ch.act.type}
                  playerName={activeProfile.name}
                  onDone={onActivityDone}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <FeedbackButton url={FEEDBACK_URL} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: CH.map((_, i) => ({ params: { id: String(i + 1) } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { chapterIndex: parseInt(params!.id as string, 10) - 1 },
});

export default ChapterPage;
