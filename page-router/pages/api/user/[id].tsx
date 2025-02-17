// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id?: string | string[] | undefined;
  name?: string;
  message?: string;
  data?: object;
  headers?: string | string[] | undefined;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("req method =>", req.method);
  if (req.method === "POST") {
    res.status(200).json({
      id: req.query.id,
      name: "John Doe",
      data: req.body,
      headers: req.headers["api-token"],
    });
  }

  //   if (req.method === "GET") {
  //     res.status(200).json({ id: req.query.id, name: "John Doe" });
  //   } else if (req.method === "POST") {
  //     res.status(201).json({ message: "User created successfully!" });
  //   } else {
  //     res.status(405).json({ message: "Method Not Allowed" });
  //   }
}
