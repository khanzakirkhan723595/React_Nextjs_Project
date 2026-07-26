"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";

interface Feedback {
  strengths: string[];
  improvements: string[];
}

interface Question {
  question: string;
  userAnswer: string;
  score: number;
  feedback: Feedback;
}

interface InterviewSession {
  _id: string;
  role: string;
  topic: string;
  experience: string;
  overallScore: number;
  createdAt: string;
  questions: Question[];
}

export default function HistoryPage() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");
  const [interviews, setInterviews] = useState<InterviewSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<InterviewSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch("/api/history");
        const data = await response.json();
        const list = data.interviews || [];
        setInterviews(list);

        if (selectedId) {
          const found = list.find(
            (item: InterviewSession) => item._id.toString() === selectedId
          );
          if (found) setSelectedSession(found);
        }
      } catch (error) {
        console.log("History Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [selectedId]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents navigating if card has a click listener
    if (!confirm("Are you sure you want to delete this interview history?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/history?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInterviews((prev) => prev.filter((item) => item._id !== id));
        if (selectedSession?._id === id) {
          setSelectedSession(null);
        }
      }
    } catch (error) {
      console.log("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen p-10 text-center text-slate-400">
        Loading History...
      </main>
    );
  }

  // ============================
  // DETAIL VIEW
  // ============================
  if (selectedSession) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Link
          href="/history"
          className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
        >
          ← Back To All History
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white">
                {selectedSession.role}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Topic: <span className="text-slate-200">{selectedSession.topic}</span> | Experience:{" "}
                <span className="text-slate-200">{selectedSession.experience}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 uppercase tracking-wider block">
                Overall Score
              </span>
              <span className="text-3xl font-bold text-blue-400">
                {selectedSession.overallScore}/10
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Questions */}
        <div className="space-y-6">
          {selectedSession.questions.map((q, index) => (
            <div
              key={index}
              className="border border-slate-800 p-6 rounded-2xl bg-slate-900/70 space-y-4"
            >
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-semibold text-lg text-white">
                  Q{index + 1}. {q.question}
                </h3>
                <span className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-full font-bold border border-blue-500/20 whitespace-nowrap">
                  Score: {q.score}/10
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <p className="text-xs text-slate-500 font-medium uppercase mb-1">
                  Your Response
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {q.userAnswer || "No answer submitted"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-xl">
                  <p className="text-emerald-400 font-bold mb-1">✓ Strengths</p>
                  {q.feedback?.strengths?.length > 0 ? (
                    q.feedback.strengths.map((s, i) => (
                      <p key={i} className="text-slate-300 mt-1">• {s}</p>
                    ))
                  ) : (
                    <p className="text-slate-500">None logged</p>
                  )}
                </div>

                <div className="bg-amber-950/20 border border-amber-500/20 p-3 rounded-xl">
                  <p className="text-amber-400 font-bold mb-1">⚠ Areas to Improve</p>
                  {q.feedback?.improvements?.length > 0 ? (
                    q.feedback.improvements.map((s, i) => (
                      <p key={i} className="text-slate-300 mt-1">• {s}</p>
                    ))
                  ) : (
                    <p className="text-slate-500">None logged</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  // ============================
  // CARDS LIST VIEW
  // ============================
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex justify-between items-center border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Interview History</h1>
          <p className="text-slate-400 text-sm mt-1">
            Review past evaluations or clean up uncompleted sessions.
          </p>
        </div>
        <Link href="/interview">
          <Button variant="primary">+ New Session</Button>
        </Link>
      </div>

      {interviews.length === 0 ? (
        <div className="border border-slate-800 bg-slate-900 rounded-2xl p-12 text-center space-y-4">
          <h3 className="text-xl font-semibold text-white">No Interviews Recorded</h3>
          <p className="text-slate-400 text-sm">
            You haven't completed any mock interviews yet.
          </p>
          <Link href="/interview" className="inline-block pt-2">
            <Button>Start First Interview</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((item) => {
            const isDeleting = deletingId === item._id;
            return (
              <div
                key={item._id}
                className="group relative bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between space-y-5 shadow-lg"
              >
                {/* Header: Role & Delete Button */}
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                      {item.role}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleDelete(item._id, e)}
                    disabled={isDeleting}
                    className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition text-sm disabled:opacity-50"
                    title="Delete Interview"
                  >
                    {isDeleting ? "..." : "🗑️"}
                  </button>
                </div>

                {/* Tags & Score */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-2">
                    <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md border border-slate-700 font-medium">
                      {item.topic}
                    </span>
                    <span className="bg-slate-800 text-slate-400 text-xs px-2.5 py-1 rounded-md border border-slate-700">
                      {item.experience}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      item.overallScore >= 7
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : item.overallScore > 0
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {item.overallScore}/10
                  </span>
                </div>

                {/* Bottom Action */}
                <div className="pt-2 border-t border-slate-800/80 flex justify-end">
                  <Link
                    href={`/history?id=${item._id}`}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}