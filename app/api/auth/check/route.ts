// app/api/auth/check/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Check Authorization header first
    const authHeader = request.headers.get('authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      // ✅ Just check if token exists, don't verify it
      return NextResponse.json({
        authenticated: true,
        user: null // User details come from frontend storage
      });
    }

    // Check cookie as fallback
    const token = request.cookies.get('accessToken')?.value;
    if (token) {
      return NextResponse.json({
        authenticated: true,
        user: null
      });
    }

    // No token found
    return NextResponse.json({ 
      authenticated: false,
      reason: "No token found" 
    });

  } catch (error: any) {
    console.error("Auth check error:", error);
    return NextResponse.json({
      authenticated: false,
      reason: error.message || "Authentication check failed"
    });
  }
}