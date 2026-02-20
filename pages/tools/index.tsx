import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { C, FEEDBACK_URL } from "@/lib/data";
import { Logo, FeedbackButton } from "@/components/ui";

interface Tool {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  href: string;
  badge?: string;
  comingSoon?: boolean;
}

const TOOLS: Tool[] = [
  {
    id: "dream-goal-calculator",
    emoji: "🎯",
    title: "Dream Goal Calculator",
    subtitle: "How long to save for anything",
    description:
      "Type in your dream — a LEGO set, gaming headset, or a bike — enter your weekly savings, and watch the magic. See exactly how many weeks until it's yours!",
    accentColor: C.ch4,
    href: "/tools/dream-goal-calculator",
    badge: "New!",
  },
  {
    id: "choose-your-path",
    emoji: "🗺️",
    title: "Choose Your Path",
    subtitle: "Money adventure stories",
    description:
      "Make real money decisions in fun story scenarios. Spend or save? Invest or keep cash? Every choice leads somewhere different — and teaches a real lesson!",
    accentColor: C.ch3,
    href: "/tools/choose-your-path",    
  },
  {
    id: "drag-drop-budgeter",
    emoji: "🪣",
    title: "Drag & Drop Budgeter",
    subtitle: "Sort your money into buckets",
    description:
      "Drag coins into your four money buckets — Spending, Goals, Future, and Giving. Can you hit the perfect 40/30/20/10 split?",
    accentColor: C.ch2,
    href: "/tools/drag-drop-budgeter",
    comingSoon: true,
  },
];

const ToolsHubPage: NextPage = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Interactive Money Tools for Kids – The Kid Vault</title>
        <meta
          name="description"
          content="Free interactive financial tools for kids ages 6-12. Dream Goal Calculator, money adventure stories, drag-and-drop budgeter, and more. Learn by doing!"
        />
        <meta property="og:title" content="Interactive Money Tools – The Kid Vault" />
        <meta
          property="og:description"
          content="Fun, free interactive money tools for kids ages 6-12. Calculate savings goals, make money decisions, and build budgets."
        />
        <meta property="og:url" content="https://www.thekidvault.com/tools" />
        <meta property="og:type" content="website" />
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
            onClick={() => router.push("/chapters")}
            style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8, padding: "7px 16px", color: "#fff", fontSize: 13,
              cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 600,
            }}
          >
            📚 Chapters
          </button>
        </nav>

        {/* ── HERO ── */}
        <div style={{
          background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
          padding: "clamp(32px,6vw,52px) 24px clamp(48px,8vw,64px)",
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
            { top: "12%", left: "6%", size: 80 },
            { top: "60%", left: "3%", size: 40 },
            { top: "20%", right: "8%", size: 56 },
            { top: "65%", right: "5%", size: 90 },
          ].map((orb, i) => (
            <div key={i} style={{
              position: "absolute", top: orb.top, left: (orb as any).left, right: (orb as any).right,
              width: orb.size, height: orb.size, borderRadius: "50%",
              border: `1px solid ${C.gold}25`, pointerEvents: "none",
            }} />
          ))}

          <div style={{ position: "relative", zIndex: 1, maxWidth: 580, margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: C.teal + "18", color: C.teal,
              padding: "6px 18px", borderRadius: 20,
              fontSize: 12, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: 2, fontFamily: "'Trebuchet MS',sans-serif",
              marginBottom: 22, border: `1px solid ${C.teal}35`,
            }}>
              🛠️ Interactive Tools
            </div>

            <h1 style={{
              color: "#fff", fontSize: "clamp(30px,6vw,46px)",
              margin: "0 0 18px", fontFamily: "Georgia,serif",
              fontWeight: 700, lineHeight: 1.15,
            }}>
              Learn Money by{" "}
              <span style={{ color: C.gold, fontStyle: "italic" }}>Doing</span>
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.68)",
              fontSize: "clamp(15px,2.5vw,17px)",
              lineHeight: 1.75, fontFamily: "'Trebuchet MS',sans-serif",
              margin: "0 auto", maxWidth: 480,
            }}>
              These tools turn money lessons into real experiences.
              No boring reading — just play, explore, and discover!
            </p>
          </div>

          <svg viewBox="0 0 1440 52" style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block" }}>
            <path d="M0,28 C360,52 1080,0 1440,28 L1440,52 L0,52 Z" fill={C.cream} />
          </svg>
        </div>

        {/* ── TOOLS GRID ── */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(32px,5vw,52px) 20px clamp(48px,8vw,80px)" }}>

          <div style={{ marginBottom: 36, textAlign: "center" }}>
            <div style={{
              fontSize: 12, color: C.gold, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: 3,
              fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 10,
            }}>
              The Vault Toolbox
            </div>
            <h2 style={{ fontSize: "clamp(22px,4vw,30px)", margin: 0, color: C.navy, fontFamily: "Georgia,serif" }}>
              Pick a tool, start learning
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}>
            {TOOLS.map((tool) => {
              const isHovered = hovered === tool.id;
              return (
                <div
                  key={tool.id}
                  onMouseEnter={() => setHovered(tool.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => !tool.comingSoon && router.push(tool.href)}
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "clamp(20px,4vw,28px) clamp(16px,3vw,24px)",
                    border: `2px solid ${isHovered && !tool.comingSoon ? tool.accentColor + "60" : C.border}`,
                    cursor: tool.comingSoon ? "default" : "pointer",
                    transition: "all 0.28s ease",
                    transform: isHovered && !tool.comingSoon ? "translateY(-5px)" : "none",
                    boxShadow: isHovered && !tool.comingSoon
                      ? `0 16px 40px rgba(0,0,0,0.1), 0 0 0 1px ${tool.accentColor}20`
                      : "0 2px 12px rgba(0,0,0,0.04)",
                    opacity: tool.comingSoon ? 0.72 : 1,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Accent top stripe */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: 4, borderRadius: "20px 20px 0 0",
                    background: tool.comingSoon
                      ? C.border
                      : `linear-gradient(90deg, ${tool.accentColor}, ${tool.accentColor}80)`,
                  }} />

                  {/* Badge */}
                  {tool.badge && !tool.comingSoon && (
                    <div style={{
                      position: "absolute", top: 16, right: 16,
                      background: C.gold, color: C.navy,
                      fontSize: 11, fontWeight: 700,
                      padding: "3px 10px", borderRadius: 20,
                      fontFamily: "'Trebuchet MS',sans-serif",
                      textTransform: "uppercase", letterSpacing: 1,
                      maxWidth: "calc(100% - 80px)",
                    }}>
                      {tool.badge}
                    </div>
                  )}

                  {/* Coming Soon badge */}
                  {tool.comingSoon && (
                    <div style={{
                      position: "absolute", top: 16, right: 16,
                      background: C.border, color: C.textLight,
                      fontSize: 11, fontWeight: 700,
                      padding: "3px 10px", borderRadius: 20,
                      fontFamily: "'Trebuchet MS',sans-serif",
                      textTransform: "uppercase", letterSpacing: 1,
                      maxWidth: "calc(100% - 80px)",
                    }}>
                      Coming Soon
                    </div>
                  )}

                  {/* Emoji icon */}
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: tool.accentColor + "14",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, marginBottom: 18,
                    border: `1px solid ${tool.accentColor}20`,
                  }}>
                    {tool.emoji}
                  </div>

                  {/* Text */}
                  <div style={{
                    fontSize: 11, color: tool.accentColor, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: 1.5,
                    fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 4,
                  }}>
                    {tool.subtitle}
                  </div>
                  <h3 style={{
                    fontSize: 19, fontWeight: 700, color: C.navy,
                    margin: "0 0 12px", fontFamily: "Georgia,serif", lineHeight: 1.2,
                  }}>
                    {tool.title}
                  </h3>
                  <p style={{
                    fontSize: 13.5, color: C.textLight, lineHeight: 1.65,
                    margin: "0 0 20px", fontFamily: "'Trebuchet MS',sans-serif",
                  }}>
                    {tool.description}
                  </p>

                  {/* CTA */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontSize: 13, fontWeight: 700,
                    color: tool.comingSoon ? C.textLight : tool.accentColor,
                    fontFamily: "'Trebuchet MS',sans-serif",
                  }}>
                    {tool.comingSoon ? "Coming soon..." : "Try it now →"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom note */}
          <div style={{
            marginTop: 56, textAlign: "center",
            padding: "28px 24px",
            background: C.navy + "06",
            borderRadius: 16,
            border: `1px solid ${C.border}`,
          }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>💡</div>
            <p style={{
              fontSize: 14, color: C.textLight, lineHeight: 1.7,
              fontFamily: "'Trebuchet MS',sans-serif", margin: "0 auto",
              maxWidth: 480,
            }}>
              These tools work best alongside the lessons in{" "}
              <span
                onClick={() => router.push("/chapters")}
                style={{ color: C.gold, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
              >
                The 7 Chapters
              </span>
              . New tools added regularly — come back and check!
            </p>
          </div>
        </div>
      </div>

      <FeedbackButton url={FEEDBACK_URL} />
    </>
  );
};

export default ToolsHubPage;
