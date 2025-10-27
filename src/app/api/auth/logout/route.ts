import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    
    return NextResponse.json({ message: "Logout successful" });
  } catch (err) {
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
