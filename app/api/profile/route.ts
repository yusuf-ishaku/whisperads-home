import { NextRequest, NextResponse } from "next/server"

const API_URL = process.env.BASE_URL || "https://whisperads-api-production.up.railway.app"

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  
  if (!authHeader) {
    return NextResponse.json(
      { message: "Authorization token is required" }, 
      { status: 401 }
    )
  }

  try {
    const body = await req.json()
    
    const res = await fetch(`${API_URL}/user/targeting-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("API error:", errorText)
      return NextResponse.json(
        { message: errorText || "External API error" },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)

  } catch (error: any) {
    console.error("Route handler error:", error)
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader) {
    return NextResponse.json(
      { message: "Authorization token is required" }, 
      { status: 401 }
    );
  }

  try {
    const res = await fetch(`${API_URL}/user/targeting-profile`, {
      method: "GET",
      headers: {
        "Authorization": authHeader
      }
    });

    if (!res.ok) {
      // If profile doesn't exist, return false
      if (res.status === 404) {
        return NextResponse.json({ hasProfile: false });
      }
      const errorText = await res.text();
      throw new Error(errorText || "Failed to check profile");
    }

    const data = await res.json();
    return NextResponse.json({ hasProfile: true, profile: data });

  } catch (error: any) {
    console.error("Profile check error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}