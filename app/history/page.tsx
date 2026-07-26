"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Question {
  question: string;
  userAnswer: string;
  score: number;
  feedback?: {
    strengths: string[];
    improvements: string[];
  };
}

interface Interview {
  _id: string;
  role: string;
  experience: string;
  topic: string;
  overallScore: number;
  createdAt: string;
  questions: Question[];
}

function HistoryContent() {
  const searchParams = useSearchParams();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/history");
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }
        const data = await response.json();
        setInterviews(data.interviews || data || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [searchParams]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/interview/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInterviews((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete the interview record.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading interview history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Interview History</h1>

      {interviews.length === 0 ? (
        <p className="text-gray-500">No past interviews found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interviews.map((item) => (
            <div
              key={item._id}
              className="p-5 border rounded-xl shadow-sm bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold capitalize">
                    {item.role}
                  </h2>
                  <span className="text-sm font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Score: {item.overallScore}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Topic:</strong> {item.topic}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Experience:</strong> {item.experience}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <a
                  href={`/interview/${item._id}`}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  View Details
                </a>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-sm text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function HistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-gray-500">Loading page...</p>
        </div>
      }
    >
      <HistoryContent />
    </Suspense>
  );
}