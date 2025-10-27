// app/api/periods/cancel-period/{id}/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = req.headers.get("authorization") || "";

    const periodId =  req.nextUrl.searchParams.get("id");
    const parsedPeriodId = periodId ? parseInt(periodId, 10) : null;
  

        if (!token) {
      return NextResponse.json({ message: "Authorization token is required" }, { status: 401 });
    }
    if (!periodId) {
      return NextResponse.json({ message: "Period ID is required" }, { status: 400 });
    }
    const apiRes = await fetch(`${API_BASE_URL}/api/v1/periods/${parsedPeriodId}/cancel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": token
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
