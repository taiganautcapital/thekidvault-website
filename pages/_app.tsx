import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/data";
import "@/styles/globals.css";

// Fire GA4 page_view on every client-side navigation
function usePageView() {
  const router = useRouter();
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const handleRouteChange = (url: string) => {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("config", GA_MEASUREMENT_ID, { page_path: url });
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);
}

export default function App({ Component, pageProps }: AppProps) {
  usePageView();
  return <Component {...pageProps} />;
}
