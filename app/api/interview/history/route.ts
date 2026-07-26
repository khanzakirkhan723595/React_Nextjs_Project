import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Interview from "@/models/Interview";

export async function GET() {
  try {
    await connectDB();
    const interviews = await Interview.find({})
      .sort({ createdAt: -1 })
      .select("role topic experience overallScore createdAt");

    return NextResponse.json({ success: true, interviews }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/interview/history Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch interview history" },
      { status: 500 }
    );
  }
}