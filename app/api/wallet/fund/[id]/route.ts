import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL || "http://localhost:8000";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Authorization token is required" }, { status: 401 });
  }

    const userId = params.id;
    
  try {
    const res = await fetch(`${baseUrl}/wallet/${userId}`, {
      method: "GET",
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



export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Authorization token is required" }, { status: 401 });
  }

  const { amount, email, callbackUrl } = await req.json();
  const userId = params.id;

  try {
    const res = await fetch(`${baseUrl}/wallet/fund/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
       body: JSON.stringify({ amount, email,  callbackUrl: callbackUrl || `${process.env.NEXTAUTH_URL}/dashboard/advertiser` }),
    });

     if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend error:", errorText);
      return NextResponse.json(
        { message: errorText || "Failed to fund wallet" }, 
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
