import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { linksTable } from "@/lib/db/schema";

type Response = {
  insertedId?: number;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Response[] }>
) {
  if (req.method !== "POST") {
    res.status(405).json({ data: [{ message: "Method not allowed" }] });
  }

  const payload = JSON.parse(req.body);

  const data = await db
    .insert(linksTable)
    .values(payload)
    .returning({ insertedId: linksTable.id });

  res.status(200).json({ data });
}
