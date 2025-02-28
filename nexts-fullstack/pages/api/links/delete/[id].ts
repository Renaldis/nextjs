import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { linksTable } from "@/lib/db/schema";
import { sql, eq } from "drizzle-orm";

type Response = {
  deletedId?: number;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Response[] }>
) {
  if (req.method !== "DELETE") {
    res.status(405).json({ data: [{ message: "Method not allowed" }] });
  }

  const data = await db
    .update(linksTable)
    .set({ deleted_at: sql`NOW()` })
    .where(eq(linksTable.id, Number(req.query.id)))
    .returning({ deletedId: linksTable.id });

  res.status(200).json({ data });
}
