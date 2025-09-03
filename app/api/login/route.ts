import { NextResponse, NextRequest } from "next/server";

const baseUrl = process.env.BASE_URL || "";

export async function POST(request: NextRequest) {
  try {
    const { email, password, role, rememberMe } = await request.json();

    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    if (!res.ok) {
      const errorRes = await res.json();
      throw { message: errorRes.message, statusCode: res.status };
    }

    const responseData = await res.json();
    console.log("Login API Response:", responseData);

    if (!responseData.accessToken) {
      throw {
        message: "Authentication token missing in response",
        statusCode: 500,
      };
    }

    const normalizedRole = (responseData.role || role || "")
      .toString()
      .toLowerCase();
    if (!["agent", "advertiser"].includes(normalizedRole)) {
      throw {
        message: "Invalid role received",
        statusCode: 400,
      };
    }

    // Prepare the response
    const standardizedResponse = {
  user: {
    id: responseData.id,
    email: responseData.email,
    name: responseData.name || '',
    role: normalizedRole,
    advertiserId: responseData.advertiserId || responseData.id,
    profileComplete: responseData.profileComplete || false
  },
  accessToken: responseData.token || responseData.accessToken, // Handle both formats
  refreshToken: responseData.refreshToken,
  success: true
};

    // Set HttpOnly cookie with appropriate expiration
    const expiresIn = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: expiresIn,
      path: "/",
    };

    

    
    // standardizedResponse.cookies.set("auth_token", responseData.accessToken, cookieOptions);

    // // For role information
    // standardizedResponse.cookies.set("user_role", normalizedRole, {
    //   ...cookieOptions,
    //   httpOnly: false,
    // });

return NextResponse.json(standardizedResponse);
  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        message: error?.message || "Something went wrong",
        success: false,
      },
      { status: error.statusCode || 500 }
    );
  }
}
