import { NextResponse, NextRequest } from "next/server";
import { cookies } from 'next/headers';

const baseUrl = process.env.BASE_URL || "";

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();
    
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

    if (!responseData.jwt) {
      throw {
        message: "Authentication token missing in response",
        statusCode: 500
      };
    }

    cookies().set('auth-token', responseData.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    // Standardized response matching create-account
    return NextResponse.json({
      user: {
        id: responseData.id,
        email: responseData.email,
        name: responseData.name || '',
        role: responseData.role,
        advertiserId: responseData.advertiserId || responseData.id
      },
      token: responseData.jwt,
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