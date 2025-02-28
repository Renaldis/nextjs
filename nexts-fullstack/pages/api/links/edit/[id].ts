import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { linksTable } from "@/lib/db/schema";
import { sql, eq } from "drizzle-orm";

type Response = {
  updatedId?: number;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Response[] }>
) {
  if (req.method !== "PATCH") {
    res.status(405).json({ data: [{ message: "Method not allowed" }] });
  }

  const payload = JSON.parse(req.body);

  const data = await db
    .update(linksTable)
    .set({ ...payload, updated_at: sql`NOW()` })
    .where(eq(linksTable.id, Number(req.query.id)))
    .returning({ updatedId: linksTable.id });

  res.status(200).json({ data });
}
