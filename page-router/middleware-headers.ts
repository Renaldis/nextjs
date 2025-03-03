import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-API-KEY", "API_KEY_TEST");
  return res;
}

export const config = {
  matcher: "/:path*",
};
