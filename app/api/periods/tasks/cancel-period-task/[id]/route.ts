// app/api/periods/tasks/cancel-period-task/{id}/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params}: { params:  {id: string}}) {


  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = req.headers.get("authorization") || "";

    const taskId =  req.nextUrl.searchParams.get("id");


        if (!token) {
      return NextResponse.json({ message: "Authorization token is required" }, { status: 401 });
    }
    if (!taskId) {
      return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
    }
    const apiRes = await fetch(`${API_BASE_URL}/api/v1/tasks/${taskId}/cancel`, {
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
