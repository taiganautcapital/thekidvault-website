import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { C, FEEDBACK_URL, CH } from "@/lib/data";
import { Logo, btnS, FeedbackButton } from "@/components/ui";
import { gaEvent } from "@/lib/data";

const Home: NextPage = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const handleStart = () => {
    gaEvent("cta_start_learning", { location: "hero" });
    router.push("/welcome");
  };

  const handleStartChapter = (i: number) => {
    gaEvent("chapter_card_click", { chapter: i + 1 });
    router.push({ pathname: "/welcome", query: { next: `/chapter/${i + 1}` } });
  };

  return (
    <>
      <Head>
  <title>The Kid Vault – Free Financial Education for Kids Ages 6-12</title>
  <meta name="description" content="Free interactive financial literacy for kids ages 6-12. Learn money basics, the 4 bucket savings method, compound interest, and investing through fun lessons and activities." />
  <meta name="keywords" content="financial literacy for kids, money education, kids investing, teaching kids about money, 4 bucket savings method kids, compound interest for kids" />
  <link rel="canonical" href="https://www.thekidvault.com" />

  {/* Open Graph */}
  <meta property="og:title" content="The Kid Vault – Free Financial Education for Kids Ages 6-12" />
  <meta property="og:description" content="Free interactive financial literacy for kids ages 6-12. Learn money basics, saving, compound interest, and investing through fun lessons and activities." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.thekidvault.com" />
  <meta property="og:site_name" content="The Kid Vault" />
  <meta property="og:image" content="https://www.thekidvault.com/og-image.png" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="The Kid Vault – Free Financial Education for Kids Ages 6-12" />
  <meta name="twitter:description" content="Free interactive financial literacy for kids ages 6-12. Learn money basics, saving, compound interest, and investing through fun lessons and activities." />
  <meta name="twitter:image" content="https://www.thekidvault.com/og-image.png" />

  {/* Structured Data */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "The Kid Vault",
      "url": "https://www.thekidvault.com",
      "description": "Free interactive financial literacy for kids ages 6-12.",
      "teaches": "Financial literacy, saving, investing, budgeting",
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "audienceType": "Children ages 6-12"
      }
    })}}
  />

  <script async src="https://f.convertkit.com/ckjs/ck.5.js"></script>  
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</Head>

      <div style={{ background: C.cream }}>
        {/* HERO */}
        <section style={{ background: `linear-gradient(135deg,${C.navy},${C.navyLight},#2D4A5E)`, color: "#fff", position: "relative", overflow: "hidden", minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(45deg,${C.gold} 0px,${C.gold} 1px,transparent 1px,transparent 40px),repeating-linear-gradient(-45deg,${C.gold} 0px,${C.gold} 1px,transparent 1px,transparent 40px)` }} />
          {[{ top: "8%", left: "5%", s: 80, dl: 0 }, { top: "15%", right: "8%", s: 50, dl: 0.5 }, { bottom: "20%", left: "10%", s: 35, dl: 1 }, { bottom: "12%", right: "15%", s: 65, dl: 0.3 }].map((c, i) => (
            <div key={i} style={{ position: "absolute", top: c.top, left: c.left, right: c.right, bottom: c.bottom, width: c.s, height: c.s, borderRadius: "50%", border: `1.5px solid ${C.gold}`, opacity: loaded ? 0.15 : 0, transform: loaded ? "scale(1)" : "scale(0)", transition: `all 1.2s cubic-bezier(0.34,1.56,0.64,1) ${c.dl + 0.5}s` }} />
          ))}
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(-30px)", transition: "all 0.8s ease 0.2s" }}>
              <div style={{ margin: "0 auto 24px", display: "inline-block" }}><Logo size={90} /></div>
              <h1 style={{ fontSize: "clamp(36px,7vw,64px)", fontWeight: 700, margin: "0 0 4px", letterSpacing: -1, lineHeight: 1.1, fontFamily: "Georgia,serif" }}>The Kid Vault</h1>
              <div style={{ fontSize: "clamp(14px,2.5vw,18px)", color: C.goldLight, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 32 }}>Financial Education for Young Minds</div>
            </div>
            <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.6s" }}>
              <p style={{ fontSize: "clamp(18px,3vw,24px)", lineHeight: 1.6, maxWidth: 650, margin: "0 auto 40px", color: "rgba(255,255,255,0.85)", fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 300 }}>
                A free, interactive guide to money, saving, and investing — built by kids, for kids.
              </p>
              <button onClick={handleStart} style={{ ...btnS(`linear-gradient(135deg,${C.gold},${C.goldDark})`, C.navy), boxShadow: `0 4px 20px rgba(212,168,67,0.4)` }}>
                Start Learning →
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,5vw,60px)", marginTop: 56, opacity: loaded ? 1 : 0, transition: "all 0.8s ease 1s", flexWrap: "wrap" }}>
              {[{ n: "7", l: "Chapters" }, { n: "35", l: "Lessons" }, { n: "7", l: "Activities" }, { n: "100%", l: "Free" }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 700, color: C.gold, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 2, marginTop: 6, fontFamily: "'Trebuchet MS',sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 1440 80" style={{ display: "block", width: "100%", marginBottom: -1 }}><path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill={C.cream} /></svg>
        </section>

        {/* MISSION */}
        <section id="mission" style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, color: C.gold, textTransform: "uppercase", letterSpacing: 3, marginBottom: 12, fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 600 }}>Our Mission</div>
            <h2 style={{ fontSize: "clamp(28px,5vw,40px)", margin: 0, lineHeight: 1.2, fontWeight: 700, fontFamily: "Georgia,serif", color: C.navy }}>Why We Built This</h2>
          </div>
          <div style={{ fontSize: "clamp(16px,2.5vw,18px)", lineHeight: 1.85, color: C.text, fontFamily: "'Trebuchet MS',sans-serif" }}>
            <p style={{ marginBottom: 20 }}><strong style={{ color: C.navy }}>We believe financial education is one of the most important life skills — and it's a lifelong journey that should start early.</strong> Yet most schools don't teach it. They prepare students to land a job, but rarely teach them what to do with that first paycheck.</p>
            <p style={{ marginBottom: 20 }}>That gap is why <strong style={{ color: C.navy }}>The Kid Vault</strong> exists. We wanted to create a place where kids can start learning about money early — not because childhood should be about finances, but because understanding money gives you <em>freedom, choices, and confidence</em> at every stage of life.</p>
            <p style={{ marginBottom: 20 }}>And here's what makes this project special: <strong style={{ color: C.navy }}>it was built by three sisters, ages 7, 9, and 13, together with their mom and dad.</strong> As a family, they researched, discussed, and helped shape every lesson. For the girls, this is a double education — learning about financial literacy while building something meaningful that helps others.</p>
            <p>This is a family project, not a corporation. We're sharing our chapters free for families everywhere — because we believe every kid deserves a head start with money.</p>
          </div>
        </section>
        <div style={{ maxWidth: 100, height: 3, background: `linear-gradient(90deg,transparent,${C.gold},transparent)`, margin: "20px auto 40px", borderRadius: 2 }} />

        {/* EMAIL CAPTURE */}
        <section style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px 60px", textAlign: "center" }}>
          <div style={{ fontSize: 13, color: C.gold, textTransform: "uppercase", letterSpacing: 3, marginBottom: 12, fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 600 }}>Free Parent Tips</div>
          <h2 style={{ fontSize: "clamp(22px,4vw,30px)", margin: "0 0 12px", fontWeight: 700, fontFamily: "Georgia,serif", color: C.navy }}>Join families learning money together</h2>
          <p style={{ fontSize: 15, color: C.textLight, lineHeight: 1.7, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 24 }}>Get free weekly tips on teaching kids about money — straight to your inbox.</p>
          
          <div style={{ maxWidth: 480, margin: "0 auto" }} dangerouslySetInnerHTML={{ __html: `
          <style>
            .formkit-form[data-uid="e03a54b413"] .formkit-fields { display: flex !important; flex-direction: row !important; gap: 8px !important; flex-wrap: nowrap !important; }
            .formkit-form[data-uid="e03a54b413"] .formkit-field { flex: 1 1 auto !important; margin: 0 !important; }
            .formkit-form[data-uid="e03a54b413"] .formkit-submit { flex: 0 0 auto !important; margin: 0 !important; border-radius: 50px !important; }
            .formkit-form[data-uid="e03a54b413"] .formkit-input { border-radius: 50px !important; padding: 14px 20px !important; font-size: 15px !important; border: 2px solid #E8E0D0 !important; width: 100% !important; }
            .formkit-form[data-uid="e03a54b413"] .formkit-submit > span { padding: 14px 24px !important; font-size: 15px !important; }
            .formkit-form[data-uid="e03a54b413"] .formkit-powered-by-convertkit-container { justify-content: center !important; margin-top: 8px !important; }
          </style>
          <form action="https://app.kit.com/forms/9107917/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="9107917" data-uid="e03a54b413" data-format="inline" data-version="5" min-width="400 500 600 700 800"><div data-style="clean"><ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul><div data-element="fields" data-stacked="false" class="seva-fields formkit-fields"><div class="formkit-field"><input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="color:rgb(0,0,0);border-color:rgb(227,227,227);border-radius:50px;font-weight:400;"></div><button data-element="submit" class="formkit-submit" style="color:rgb(255,255,255);background-color:rgb(212,168,67);border-radius:50px;font-weight:700;"><div class="formkit-spinner"><div></div><div></div><div></div></div><span>Get Free Tips →</span></button></div></div></form>
`       }} />
        </section>
        
        <div style={{ maxWidth: 100, height: 3, background: `linear-gradient(90deg,transparent,${C.gold},transparent)`, margin: "0 auto 60px", borderRadius: 2 }} />
        {/* CHAPTERS */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "20px 24px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 13, color: C.gold, textTransform: "uppercase", letterSpacing: 3, marginBottom: 12, fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 600 }}>The Journey</div>
            <h2 style={{ fontSize: "clamp(28px,5vw,40px)", margin: "0 0 12px", fontWeight: 700, fontFamily: "Georgia,serif", color: C.navy }}>7 Chapters, One Big Adventure</h2>
            <p style={{ fontSize: 16, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif", maxWidth: 500, margin: "0 auto" }}>Click any chapter to start learning!</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 16 }}>
            {CH.map((ch, i) => (
              <div
                key={i}
                onClick={() => handleStartChapter(i)}
                onMouseOver={() => setHov(i)}
                onMouseOut={() => setHov(null)}
                style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", border: `1px solid ${hov === i ? ch.c + "40" : C.border}`, transition: "all 0.3s", transform: hov === i ? "translateY(-4px)" : "none", boxShadow: hov === i ? "0 12px 32px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.03)", cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: ch.c + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{ch.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: ch.c, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'Trebuchet MS',sans-serif" }}>Chapter {ch.id}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: C.navy, lineHeight: 1.2 }}>{ch.t}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: C.textLight, lineHeight: 1.55, margin: 0, fontFamily: "'Trebuchet MS',sans-serif" }}>{ch.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ background: C.navy, color: "#fff", padding: "60px 24px", position: "relative" }}>
          <svg viewBox="0 0 1440 60" style={{ position: "absolute", top: -1, left: 0, width: "100%" }}><path d="M0,60 C480,0 960,60 1440,0 L1440,0 L0,0 Z" fill={C.cream} /></svg>
          <div style={{ maxWidth: 800, margin: "0 auto", paddingTop: 20 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 13, color: C.gold, textTransform: "uppercase", letterSpacing: 3, marginBottom: 12, fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 600 }}>What's Inside</div>
              <h2 style={{ fontSize: "clamp(28px,5vw,36px)", margin: 0, fontWeight: 700, fontFamily: "Georgia,serif" }}>Learning That Sticks</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 24 }}>
              {[
                { i: "📖", t: "Bite-Sized Lessons", d: "Each concept in simple, fun language. No jargon, no boredom. Hover over tricky words for instant definitions!" },
                { i: "❓", t: "Quizzes Each Chapter", d: "Quick check-ins with instant feedback and personalized encouragement." },
                { i: "🎮", t: "Interactive Activities", d: "Budget builders, simulators, and detective games — learning by doing." },
                { i: "⭐", t: "Stars & Progress", d: "Earn stars for every lesson, quiz, and activity. Track your journey and earn your certificate!" },
              ].map((f, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "28px 22px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{f.i}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: C.goldLight }}>{f.t}</div>
                  <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontFamily: "'Trebuchet MS',sans-serif" }}>{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "64px 24px", textAlign: "center", background: `linear-gradient(180deg,${C.cream},#FFF5DC)` }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ display: "inline-block", background: C.teal + "15", color: C.teal, padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 16 }}>Early Access</div>
            <h2 style={{ fontSize: "clamp(26px,5vw,36px)", margin: "0 0 16px", fontWeight: 700, color: C.navy, fontFamily: "Georgia,serif" }}>You're One of Our First Visitors!</h2>
            <p style={{ fontSize: 16, color: C.textLight, lineHeight: 1.7, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 32 }}>We'd love your feedback to make it even better. After exploring with your kids, please share your thoughts!</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={handleStart} style={{ ...btnS(`linear-gradient(135deg,${C.gold},${C.goldDark})`, C.navy), boxShadow: `0 4px 20px rgba(212,168,67,0.3)` }}>Start Learning →</button>
              <button onClick={() => window.open(FEEDBACK_URL, "_blank")} style={{ ...btnS("transparent", C.navy, { border: `2px solid ${C.navy}30` }) }}>Share Feedback 💬</button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: C.navy, color: "rgba(255,255,255,0.4)", padding: "32px 24px", textAlign: "center", fontFamily: "'Trebuchet MS',sans-serif", fontSize: 13 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
            <Logo size={28} /><span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 15, fontFamily: "Georgia,serif" }}>The Kid Vault</span>
          </div>
          <div>A family project — built with ❤️ by three sisters and their parents.</div>
          <div style={{ marginTop: 6 }}><a href="mailto:contact@thekidvault.com" style={{ color: C.gold, textDecoration: "none" }}>contact@thekidvault.com</a></div>
          <div style={{ marginTop: 6, color: "rgba(255,255,255,0.25)" }}>© 2026 thekidvault.com — Financial education for young minds.</div>
        </footer>
      </div>

      <FeedbackButton url={FEEDBACK_URL} />
    </>
  );
};

export default Home;
