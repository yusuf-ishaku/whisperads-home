import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL || "https://whisperads-api-production.up.railway.app";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
   if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization token is required" },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(`${baseUrl}/campaigns/match`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
                "Content-Type": "application/json",

      },
    });

    if (!res.ok) {
      const errorRes = await res.json();
      return NextResponse.json({ message: errorRes.message }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}


