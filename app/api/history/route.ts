import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Interview from "@/models/Interview";

export async function GET() {
  try {
    await connectDB();
    const interviews = await Interview.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ interviews });
  } catch (error) {
    console.log("History GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await connectDB();
    await Interview.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Interview deleted" });
  } catch (error) {
    console.log("History DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete interview" },
      { status: 500 }
    );
  }
}