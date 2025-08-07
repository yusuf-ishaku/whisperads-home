import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.BASE_URL || "https://whisperads-api-production.up.railway.app";

export async function GET(
  req: NextRequest,
  { params }: { params: { campaignId: string } }
) {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader) {
    return NextResponse.json(
      { message: "Authorization token is required" }, 
      { status: 401 }
    );
  }

  try {
    const response = await fetch(`${API_URL}/campaigns/${params.campaignId}`, {
      method: "GET",
      headers: {
        "Authorization": authHeader
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: errorText || "Failed to fetch campaign" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Campaign fetch error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}