// app/api/periods/tasks/milestone/delete-milestone/route.ts

import { Console } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
    const milestoneId =  req.nextUrl.searchParams.get("id");
//   const { userId, deleteReason } = body;
  console.log(milestoneId)

  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = req.headers.get("authorization") || "";

    const apiRes = await fetch(`${API_BASE_URL}/api/v1/tasks/milestones/${milestoneId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authorization": token
      },
    //   body: JSON.stringify({ userId, deleteReason }),
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
