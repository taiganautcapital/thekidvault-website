import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { C } from "@/lib/data";
import { Logo, btnS } from "@/components/ui";

const NotFound: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head><title>Page Not Found – The Kid Vault</title></Head>
      <div style={{ minHeight: "100vh", background: `linear-gradient(135deg,${C.navy},${C.navyLight})`, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
        <div>
          <Logo size={70} />
          <h1 style={{ color: C.gold, fontSize: 64, margin: "16px 0 8px", fontFamily: "Georgia,serif" }}>404</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, marginBottom: 32, fontFamily: "'Trebuchet MS',sans-serif" }}>This page hasn't been discovered yet!</p>
          <button onClick={() => router.push("/")} style={{ ...btnS(C.gold, C.navy) }}>Back to Home →</button>
        </div>
      </div>
    </>
  );
};
export default NotFound;
