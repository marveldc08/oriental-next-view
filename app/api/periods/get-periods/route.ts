
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = req.headers.get("authorization");
    const startDate = req.nextUrl.searchParams.get("startDate");
    const endDate = req.nextUrl.searchParams.get("endDate");

    let url = `${API_BASE_URL}/api/v1/periods`;
    const queryParams = new URLSearchParams();
    if (startDate) {
      queryParams.append("startDate", startDate);
    }
    if (endDate) {
      queryParams.append("endDate", endDate);
    }
    if (Array.from(queryParams).length > 0) {
      url += `?${queryParams.toString()}`;
    }


    const apiRes = await fetch(url, {
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

