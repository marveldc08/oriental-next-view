// // app/api/auth/login/route.ts


import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userIdentity, password } = body;

    if (!userIdentity || !password) {
      return NextResponse.json(
        { success: false, message: "Missing user identity or password." },
        { status: 400 }
      );
    }

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!API_BASE_URL) {
      console.error("Missing NEXT_PUBLIC_API_BASE_URL environment variable");
      return NextResponse.json(
        { success: false, message: "Server misconfiguration. Please contact support." },
        { status: 500 }
      );
    }

    const apiRes = await fetch(`${API_BASE_URL}/api/v1/authentication/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIdentity, password }),
    });

    const contentType = apiRes.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await apiRes.json()
      : { message: await apiRes.text() };

    // Always return a standardized response shape
    return NextResponse.json(
      {
        success: apiRes.ok,
        status: apiRes.status,
        message: data.message || (apiRes.ok ? "Login successful" : "Login failed"),
        data: data.data ?? null,
      },
      { status: apiRes.status }
    );

  } catch (err: any) {
    console.error("Proxy Error:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}


