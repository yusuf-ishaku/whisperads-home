import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

interface JwtPayload {
  data: {
    id: string;
    email: string;
    role: string;
    profileComplete?: boolean;
    // other fields from your JWT
  };
  iat: number;
  exp: number;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json({ 
        authenticated: false,
        reason: "No token found" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    if (!decoded.data) {
      return NextResponse.json({
        authenticated: false,
        reason: "Invalid token structure"
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: decoded.data.id,
        email: decoded.data.email,
        role: decoded.data.role,
        profileComplete: decoded.data.profileComplete || false
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      authenticated: false,
      reason: error.message || "Token verification failed"
    });
  }
}