"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface InterviewItem {
  _id: string;
  role: string;
  topic: string;
  experience: string;
  overallScore: number;
  createdAt?: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [interviews, setInterviews] = useState<InterviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Track which item has its delete popover active
  const [popoverId, setPopoverId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/interview/history");
      const data = await res.json();
      if (res.ok) {
        setInterviews(data.interviews || data || []);
      }
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  const confirmAndDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/interview/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setInterviews((prev) => prev.filter((item) => item._id !== id));
        setPopoverId(null);
      } else {
        console.error(data.error || "Failed to delete interview.");
      }
    } catch (err) {
      console.error("Delete Error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="animate-pulse text-slate-400">Loading history...</p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Interview History</h1>
          <p className="text-slate-400 text-sm mt-1">
            Review past interview performances and scores.
          </p>
        </div>
      </div>

      {interviews.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
          No interview history found.
        </div>
      ) : (
        <div className="grid gap-4">
          {interviews.map((item) => {
            const displayScore =
              item.overallScore > 10
                ? Math.round(item.overallScore / 10)
                : item.overallScore || 0;

            const isPopoverOpen = popoverId === item._id;

            return (
              <div
                key={item._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md"
              >
                <div>
                  <h2 className="text-lg font-bold text-white capitalize">
                    {item.role || "Software Engineer"}
                  </h2>
                  <p className="text-slate-400 text-sm mt-0.5">
                    Topic: <span className="text-slate-200">{item.topic}</span> • Level:{" "}
                    <span className="text-slate-200">{item.experience}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
                    <span className="text-xs text-slate-500 font-medium uppercase block">
                      Score
                    </span>
                    <span className="text-lg font-extrabold text-green-400">
                      {displayScore} / 10
                    </span>
                  </div>

                  {/* Actions & Inline Nearby Popover Container */}
                  <div className="relative flex items-center gap-2">
                    <button
                      onClick={() => router.push(`/interview/${item._id}/feedback`)}
                      className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() =>
                        setPopoverId(isPopoverOpen ? null : item._id)
                      }
                      className="bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-800/60 text-xs font-semibold px-3 py-2.5 rounded-xl transition"
                    >
                      Delete
                    </button>

                    {/* Nearby Floating Popover Confirmation Card */}
                    {isPopoverOpen && (
                      <div className="absolute right-0 top-12 z-20 w-64 bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-2xl animate-in fade-in zoom-in-95">
                        <p className="text-xs font-semibold text-slate-200 mb-1">
                          Delete this recording?
                        </p>
                        <p className="text-[11px] text-slate-400 mb-3 leading-snug">
                          This session and score will be permanently removed.
                        </p>

                        <div className="flex justify-end items-center gap-2">
                          <button
                            onClick={() => setPopoverId(null)}
                            disabled={isDeleting}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-lg transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => confirmAndDelete(item._id)}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                          >
                            {isDeleting ? "..." : "Confirm"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}