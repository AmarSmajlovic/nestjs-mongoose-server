import { getSession, setSession } from "@/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getSession(req);
    res.status(200).json({ session });
    return res.end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { access_token, refresh_token } = req.body;

    setSession(access_token as string, refresh_token as string, res);

    res.status(200);
    return res.end();
  } catch (e) {
    res.status(400).json({ success: false });
    return res.end();
  }
}
