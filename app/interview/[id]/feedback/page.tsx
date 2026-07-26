"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

interface QuestionItem {
  _id?: string;
  question: string;
  userAnswer?: string;
  idealAnswer?: string;
  score?: number;
  feedback?: {
    strengths?: string[];
    improvements?: string[];
  };
}

interface InterviewData {
  _id: string;
  role?: string;
  topic?: string;
  experience?: string;
  overallScore: number;
  questions: QuestionItem[];
}

export default function FeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const interviewId = resolvedParams?.id;

  const [interview, setInterview] = useState<InterviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        if (!interviewId) return;

        const res = await fetch(`/api/interview/${interviewId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load feedback");
        }

        const interviewObj = data.interview || data.data || data;
        setInterview(interviewObj);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [interviewId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="animate-pulse text-slate-400">Loading feedback report...</p>
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-white text-center px-4">
        <p className="text-red-400 mb-4">{error || "Feedback not found."}</p>
        <Link href="/history" className="text-blue-400 hover:underline">
          ← Back to History
        </Link>
      </div>
    );
  }

  const finalScore =
    interview.overallScore > 10
      ? Math.round(interview.overallScore / 10)
      : interview.overallScore;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-white">
      {/* Header Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div>
          <span className="text-xs text-blue-400 font-semibold tracking-wider uppercase">
            INTERVIEW RESULTS
          </span>
          <h1 className="text-3xl font-bold mt-1">{interview.role || "Software Engineer"}</h1>
          <p className="text-slate-400 text-sm mt-1">
            Topic: {interview.topic} • Level: {interview.experience}
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 px-6 py-4 rounded-xl text-center">
          <p className="text-xs text-slate-400 uppercase font-medium">OVERALL SCORE</p>
          <p className="text-3xl font-extrabold text-green-400 mt-1">
            {finalScore} <span className="text-base font-normal text-slate-500">/ 10</span>
          </p>
        </div>
      </div>

      {/* Question Breakdown */}
      <h2 className="text-xl font-bold mb-4 text-slate-200">Question Breakdown</h2>
      <div className="space-y-6">
        {interview.questions.map((q, idx) => (
          <div
            key={q._id || idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4"
          >
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-semibold text-lg text-slate-100">
                {idx + 1}. {q.question}
              </h3>
              <span className="bg-slate-950 border border-slate-800 text-green-400 text-xs font-bold px-3 py-1 rounded-lg shrink-0">
                Score: {q.score ?? 0}/10
              </span>
            </div>

            {/* User Answer */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4">
              <p className="text-xs text-slate-500 uppercase font-semibold mb-1">
                YOUR ANSWER:
              </p>
              <p className="text-slate-300 text-sm whitespace-pre-wrap">
                {q.userAnswer || <em className="text-slate-600">No answer provided.</em>}
              </p>
            </div>

            {/* Ideal Answer */}
            {q.idealAnswer && (
              <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4">
                <p className="text-xs text-emerald-400 uppercase font-semibold mb-1 flex items-center gap-1">
                  💡 SUGGESTED IDEAL ANSWER:
                </p>
                <p className="text-emerald-200/90 text-sm leading-relaxed">
                  {q.idealAnswer}
                </p>
              </div>
            )}

            {/* Strengths & Improvements */}
            {q.feedback && (
              <div className="grid md:grid-cols-2 gap-4 text-sm pt-2">
                {q.feedback.strengths && q.feedback.strengths.length > 0 && (
                  <div className="bg-green-950/30 border border-green-800/40 p-4 rounded-xl">
                    <p className="font-semibold text-green-400 text-xs uppercase mb-2">
                      Strengths
                    </p>
                    <ul className="list-disc list-inside text-green-300/90 space-y-1 text-xs">
                      {q.feedback.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {q.feedback.improvements && q.feedback.improvements.length > 0 && (
                  <div className="bg-amber-950/30 border border-amber-800/40 p-4 rounded-xl">
                    <p className="font-semibold text-amber-400 text-xs uppercase mb-2">
                      Areas for Improvement
                    </p>
                    <ul className="list-disc list-inside text-amber-300/90 space-y-1 text-xs">
                      {q.feedback.improvements.map((imp, i) => (
                        <li key={i}>{imp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center">
        <Link href="/history" className="text-slate-400 hover:text-white transition text-sm">
          ← View All History
        </Link>
        <Link
          href="/interview"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
        >
          Start Another Interview 🚀
        </Link>
      </div>
    </main>
  );
}