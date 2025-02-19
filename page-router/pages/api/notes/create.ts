import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title wajib diisi !"),
  description: z.string().min(1, "Description wajib diisi !"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ errorMessage: "Method Not Allowed" });
  }
  try {
    const validatedData = formSchema.parse(req.body);
    const response = await fetch(`${process.env.API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    }).then((res) => res.json());
    if (response.success) {
      res.status(200).json(response);
    }
    return res
      .status(200)
      .json({ message: "Form submitted successfully", data: validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {} as { [key: string]: string });
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
