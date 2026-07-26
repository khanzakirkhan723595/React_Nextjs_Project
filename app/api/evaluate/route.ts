import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Interview from "@/models/Interview";
import { evaluateAnswer } from "@/lib/ai"; // Updated import

export async function POST(req: Request) {
  try {
    const { interviewId, userAnswers } = await req.json();

    if (!interviewId || !Array.isArray(userAnswers)) {
      return NextResponse.json(
        { error: "Interview ID and user answers are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return NextResponse.json(
        { error: "Interview record not found" },
        { status: 404 }
      );
    }

    // Call evaluateAnswer for each question concurrently
    let evaluations: any[] = [];
    try {
      evaluations = await Promise.all(
        interview.questions.map((q: any, i: number) =>
          evaluateAnswer(
            q.question,
            userAnswers[i] || "",
            interview.role,
            interview.experience
          )
        )
      );
    } catch (aiErr) {
      console.error("AI Evaluation failed, falling back to basic feedback:", aiErr);
    }

    let totalScore = 0;

    interview.questions = interview.questions.map(
      (q: any, index: number) => {
        const answer = (userAnswers[index] || "").trim();
        const evalItem = evaluations[index] || {};

        let questionScore = evalItem.score ?? 0;
        if (!evalItem.score) {
          const wordCount = answer ? answer.split(/\s+/).length : 0;
          if (wordCount > 25) questionScore = 9;
          else if (wordCount > 15) questionScore = 7;
          else if (wordCount > 5) questionScore = 5;
          else if (wordCount > 0) questionScore = 3;
          else questionScore = 0;
        }

        totalScore += questionScore;

        return {
          ...q.toObject(),
          userAnswer: answer || "Skipped / Unattempted",
          idealAnswer: evalItem.idealAnswer || q.idealAnswer || "Reference answer unavailable.",
          score: Math.min(10, questionScore),
          feedback: {
            strengths: evalItem.strengths?.length
              ? evalItem.strengths
              : answer
              ? ["Attempted to explain core logic."]
              : [],
            improvements: evalItem.improvements?.length
              ? evalItem.improvements
              : answer
              ? ["Mention edge cases and complexity analysis."]
              : ["Question was skipped."],
          },
        };
      }
    );

    const questionCount = interview.questions.length;
    const calculatedOverall =
      questionCount > 0 ? Math.min(10, Math.round(totalScore / questionCount)) : 0;

    interview.overallScore = calculatedOverall;
    await interview.save();

    return NextResponse.json(
      {
        success: true,
        interview,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("POST /api/evaluate Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to evaluate interview" },
      { status: 500 }
    );
  }
}