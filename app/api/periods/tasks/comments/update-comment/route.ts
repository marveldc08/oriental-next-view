// app/api/periods/tasks/commemts/update-comment/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
//   const {userId, comment} = body;



  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = req.headers.get("authorization") || "";
    const commentId = req.nextUrl.searchParams.get("id");
    const parsedCommentId = commentId ? parseInt(commentId, 10) : null;


    const apiRes = await fetch(`${API_BASE_URL}/api/v1/tasks/comments/${parsedCommentId}`, {
      method: "PUT",
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


