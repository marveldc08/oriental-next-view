
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {

//   try {
//     const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//     const token = req.headers.get("authorization");
//     const startDate = req.nextUrl.searchParams.get("startDate")?.toString();
//     const endDate = req.nextUrl.searchParams.get("endDate")?.toString();

//     let url = `${API_BASE_URL}/api/v1/periods`;
//     const queryParams = new URLSearchParams();
//     if (startDate) {
//       queryParams.append("startDate", startDate);
//     }
//     if (endDate) {
//       queryParams.append("endDate", endDate);
//     }
//     if (Array.from(queryParams).length > 0) {
//       url += `?${queryParams.toString()}`;
//     }


//     const apiRes = await fetch(url, {
//       method: "GET",
//       headers: { 
//         "Content-Type": "application/json",
//         Authorization: token ?? "",
//       },
//     });

//     const contentType = apiRes.headers.get("content-type");

//     const data = contentType?.includes("application/json")
//       ? await apiRes.json()
//       : { message: await apiRes.text() };

//     return NextResponse.json(data, { status: apiRes.status });

//   } catch (err: any) {
//     console.error("Proxy Error:", err);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!API_BASE_URL) {
      throw new Error("Missing environment variable: NEXT_PUBLIC_API_BASE_URL");
    }

    const token = req.headers.get("authorization") || "";
    const { searchParams } = req.nextUrl;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // ✅ Build query parameters safely
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);

    // ✅ Build final URL dynamically
    const url = `${API_BASE_URL}/api/v1/periods${queryParams.toString() ? `?${queryParams}` : ""}`;

    // ✅ Log for debugging (optional)
    console.log("Fetching:", url);

    const apiRes = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      // ⚠️ Important: disable caching for dynamic data
      cache: "no-store",
    });

    // ✅ Handle non-OK responses gracefully
    if (!apiRes.ok) {
      const text = await apiRes.text();
      console.error("API returned error:", apiRes.status, text);
      return NextResponse.json(
        { message: `Upstream API error (${apiRes.status}): ${text}` },
        { status: apiRes.status }
      );
    }

    // ✅ Parse JSON response safely
    const contentType = apiRes.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await apiRes.json()
      : { message: await apiRes.text() };

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Proxy Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
