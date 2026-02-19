import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { C } from "@/lib/data";
import { Logo, btnS } from "@/components/ui";
import { useProfiles } from "@/lib/useProfiles";
import { gaEvent } from "@/lib/data";

const WelcomePage: NextPage = () => {
  const router = useRouter();
  const { next } = router.query; // optional redirect after profile select
  const { profiles, addProfile, selectProfile, deleteProfile, hydrated } = useProfiles();
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [confirmDel, setConfirmDel] = useState<number | null>(null);

  // After localStorage loads, show new-profile form only if no profiles exist
  useEffect(() => {
    if (hydrated) setShowNew(profiles.length === 0);
  }, [hydrated]);

  const goNext = (override?: string) => {
    const dest = (override || (typeof next === "string" ? next : null) || "/chapters") as string;
    router.push(dest);
  };

  const handleSelect = (i: number) => {
    selectProfile(i);
    gaEvent("profile_selected");
    goNext();
  };

  const handleCreate = () => {
    if (!newName.trim()) return;
    addProfile(newName.trim());
    gaEvent("profile_created");
    goNext();
  };

  const handleDelete = (i: number) => {
    const remaining = deleteProfile(i);
    setConfirmDel(null);
    if (remaining === 0) setShowNew(true);
  };

  const pctDone = (stars: Record<string, boolean>) => {
    const total = 35 + 7 * 2; // lessons + quizzes + activities
    return Math.round(Object.keys(stars).length / total * 100);
  };

  return (
    <>
      <Head>
        <title>Who's Learning? – The Kid Vault</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ minHeight: "100vh", background: `linear-gradient(135deg,${C.navy},${C.navyLight})`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 450, width: "100%", textAlign: "center" }}>
          <Logo size={70} />
          <h1 style={{ color: "#fff", fontSize: 32, margin: "16px 0 4px", fontFamily: "Georgia,serif" }}>The Kid Vault</h1>

          {!showNew ? (
            <>
              <p style={{ color: C.goldLight, fontSize: 15, marginBottom: 36, fontFamily: "'Trebuchet MS',sans-serif" }}>Who's learning today?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {profiles.map((p, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <button
                      onClick={() => handleSelect(i)}
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "all 0.3s", textAlign: "left", width: "100%", boxSizing: "border-box" }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: C.gold + "25", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, color: C.gold }}>
                        {p.name[0]?.toUpperCase() || "?"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{p.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "'Trebuchet MS',sans-serif" }}>⭐ {Object.keys(p.stars).length} stars · {pctDone(p.stars)}% complete</div>
                      </div>
                      <div style={{ color: C.gold, fontSize: 20 }}>→</div>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setConfirmDel(i); }}
                      style={{ position: "absolute", bottom: 6, right: 12, background: "none", border: "none", color: "rgba(255,255,255,0.2)", fontSize: 11, cursor: "pointer", padding: "2px 6px", borderRadius: 4, fontFamily: "'Trebuchet MS',sans-serif" }}
                    >remove</button>
                    {confirmDel === i && (
                      <div style={{ background: "rgba(255,70,70,0.12)", border: "1px solid rgba(255,70,70,0.3)", borderRadius: 12, padding: "14px 16px", marginTop: 8, textAlign: "center" }}>
                        <div style={{ color: "#fff", fontSize: 14, marginBottom: 10, fontFamily: "'Trebuchet MS',sans-serif" }}>Remove <strong>{p.name}</strong> and all their progress?</div>
                        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                          <button onClick={() => setConfirmDel(null)} style={{ ...btnS("rgba(255,255,255,0.1)", "#fff", { padding: "8px 20px", fontSize: 13 }) }}>Cancel</button>
                          <button onClick={() => handleDelete(i)} style={{ ...btnS("#e53935", "#fff", { padding: "8px 20px", fontSize: 13 }) }}>Remove</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => setShowNew(true)} style={{ ...btnS("transparent", "#fff", { border: "2px solid rgba(255,255,255,0.3)", width: "100%", boxSizing: "border-box" }) }}>
                + New Learner
              </button>
            </>
          ) : (
            <>
              <h2 style={{ color: "#fff", fontSize: 26, margin: "16px 0 8px", fontFamily: "Georgia,serif" }}>Welcome, new learner!</h2>
              <p style={{ color: C.goldLight, fontSize: 15, marginBottom: 32, fontFamily: "'Trebuchet MS',sans-serif" }}>What's your first name?</p>
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="Enter your first name"
                onKeyDown={e => { if (e.key === "Enter") handleCreate(); }}
                style={{ padding: "14px 20px", borderRadius: 12, border: `2px solid ${C.gold}`, fontSize: 18, width: "100%", maxWidth: 320, textAlign: "center", marginBottom: 24, boxSizing: "border-box", background: "rgba(255,255,255,0.08)", color: "#fff", outline: "none" }}
                autoFocus
              />
              <br />
              <button onClick={handleCreate} disabled={!newName.trim()} style={{ ...btnS(newName.trim() ? C.gold : "rgba(255,255,255,0.1)", newName.trim() ? C.navy : "rgba(255,255,255,0.3)", { width: "100%", maxWidth: 320, opacity: newName.trim() ? 1 : 0.5 }) }}>
                Let's Go! →
              </button>
              {profiles.length > 0 && (
                <button onClick={() => setShowNew(false)} style={{ ...btnS("transparent", "rgba(255,255,255,0.5)", { marginTop: 16, fontSize: 14 }) }}>← Back</button>
              )}
              {profiles.length === 0 && (
                <button onClick={() => router.push("/")} style={{ ...btnS("transparent", "rgba(255,255,255,0.5)", { marginTop: 16, fontSize: 14 }) }}>← Home</button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
