// app/api/users/get-users/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = req.headers.get("authorization");
    const userId = req.nextUrl.searchParams.get("id");
    const parsedUserId = parseInt(userId);
    console.log("Parsed User ID:", parsedUserId);

    const apiRes = await fetch(`${API_BASE_URL}/api/v1/users/${parsedUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ?? "",
      },
    });

    const contentType = apiRes.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await apiRes.json()
      : { message: await apiRes.text() };

    return NextResponse.json(data, { status: apiRes.status });

  } catch (err: any) {
    console.error("Proxy Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
