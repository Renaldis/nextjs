import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log("Req =>", searchParams.get("name"));
  return NextResponse.json({ message: "Hello" }, { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName } = body;
  return NextResponse.json({ firstName, lastName }, { status: 200 });
}
