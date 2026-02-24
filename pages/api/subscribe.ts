import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required" });
  }

  const API_KEY = process.env.KIT_API_KEY;
  const FORM_ID = process.env.KIT_FORM_ID;

  if (!API_KEY || !FORM_ID) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: API_KEY, email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: data.message || "Subscription failed" });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: "Network error" });
  }
}
