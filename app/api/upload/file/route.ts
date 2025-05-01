import { NextResponse, NextRequest } from "next/server";

const baseUrl = process.env.BASE_URL || "";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    
    const res = await fetch(`${baseUrl}/upload/file`, {
      method: "POST",
      body: formData,
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      const errorRes = await res.json();
      throw { message: errorRes.message, statusCode: res.status };
    }

    const data = await res.json();
    console.log("File upload success:", data);

    return NextResponse.json(data);
  } catch (error: any) {
    console.log("API route error:", error);

    const statusCode = error.statusCode || 500;

    return NextResponse.json(
      { message: error?.message || "Something went wrong" },
      { status: statusCode }
    );
  }
}