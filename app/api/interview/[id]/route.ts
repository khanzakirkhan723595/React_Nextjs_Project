import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Interview from "@/models/Interview";

// GET Interview Handler
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Interview ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const interview = await Interview.findById(id);

    if (!interview) {
      return NextResponse.json(
        { success: false, error: "Interview record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, interview }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/interview/[id] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch interview" },
      { status: 500 }
    );
  }
}

// DELETE Interview Handler
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Interview ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const deletedInterview = await Interview.findByIdAndDelete(id);

    if (!deletedInterview) {
      return NextResponse.json(
        { success: false, error: "Interview record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Interview deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/interview/[id] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete interview" },
      { status: 500 }
    );
  }
}