import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Interview from "@/models/Interview";
import { generateInterviewQuestions } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { role, experience, topic, amount } = await req.json();

    if (!role || !experience || !topic) {
      return NextResponse.json(
        { error: "Role, experience, and topic are required fields" },
        { status: 400 }
      );
    }

    // Connect to database first
    await connectDB();

    // Call Groq AI to generate questions
    const rawQuestions = await generateInterviewQuestions(
      role,
      experience,
      topic,
      amount || 5
    );

    const formattedQuestions = rawQuestions.map((q: any) => ({
      question: typeof q === "string" ? q : q.question,
      userAnswer: "",
      idealAnswer: typeof q === "object" ? q.idealAnswer || "" : "",
      score: 0,
      feedback: {
        strengths: [],
        improvements: [],
      },
    }));

    // Create record in MongoDB
    const interview = await Interview.create({
      userId: "guest_user",
      role,
      experience,
      topic,
      questions: formattedQuestions,
      overallScore: 0,
    });

    return NextResponse.json(
      {
        success: true,
        interviewId: interview._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/interview Error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to generate interview session" },
      { status: 500 }
    );
  }
}