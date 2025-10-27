// app/api/periods/tasks/commemts/add-comment/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
//   const {userId, comment} = body;
  console.log("BODY:", body);


  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = req.headers.get("authorization") || "";
    const taskId = req.nextUrl.searchParams.get("id");
    const parsedTaskId = taskId ? parseInt(taskId, 10) : null;
    console.log("TASK ID:", parsedTaskId);

    const apiRes = await fetch(`${API_BASE_URL}/api/v1/tasks/${parsedTaskId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": token
      },
      body: JSON.stringify(body),
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


