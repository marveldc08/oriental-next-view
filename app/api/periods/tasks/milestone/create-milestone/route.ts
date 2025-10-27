// app/api/periods/milestone/create-milestone/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
    const taskId =  req.nextUrl.searchParams.get("id");
    console.log("Received taskId:", taskId);
  const { subject } = body;
  console.log("Proxy incoming body:", body);
// console.log("Outgoing URL:", `${API_BASE_URL}/api/v1/tasks/${taskId}/milestones`);
console.log("Token:", taskId ? "Present" : "Missing");


  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = req.headers.get("authorization") || "";

    const apiRes = await fetch(`${API_BASE_URL}/api/v1/tasks/${taskId}/milestones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": token
      },
      body: JSON.stringify({ subject }),
    });

    const contentType = apiRes.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await apiRes.json()
      : { message: await apiRes.text() };

      console.log("Backend response:", apiRes.status, data);


    return NextResponse.json(data, { status: apiRes.status });

  } catch (err: any) {
    console.error("Proxy Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
