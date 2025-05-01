import { NextResponse, NextRequest } from "next/server";

const baseUrl = process.env.BASE_URL || "";

export async function POST(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      throw {
        message: "Authorization token is required",
        statusCode: 401,
      };
    }

    // Extract token
    const authToken = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Get user data from request body
    const { campaignData, userData } = await request.json();

    // Verify required fields
    if (!userData?.advertiserId) {
      throw {
        message: "User information is required",
        statusCode: 400,
      };
    }

    const completePayload = {
      ...campaignData,
      advertiserId: userData.advertiserId,
      createdBy: userData.id,
      status: "draft" // Default status
    };

    const res = await fetch(`${baseUrl}/campaigns/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(completePayload),
    });

    if (!res.ok) {
      const errorRes = await res.json();
      throw {
        message: errorRes.message || "Failed to create campaign",
        statusCode: res.status,
      };
    }

    const data = await res.json();
    return NextResponse.json({ 
      ...data,
      success: true 
    });

  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json(
      { 
        message: error?.message || "Something went wrong",
        success: false 
      },
      { status: error.statusCode || 500 }
    );
  }
}