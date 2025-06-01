import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL || "http://localhost:8000";



export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Authorization token is required" }, { status: 401 });
  }

    const userId = params.id;

  try {
    const res = await fetch(`${baseUrl}/wallet/fund/${userId}`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
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
