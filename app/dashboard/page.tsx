"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface InterviewData {
  _id: string;
  role: string;
  topic: string;
  experience: string;
  overallScore: number;
  createdAt: string;
}

export default function DashboardPage() {
  const [interviews, setInterviews] = useState<InterviewData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/interview/history");
        const data = await res.json();
        if (res.ok) {
          setInterviews(data.interviews || data || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Helper function to normalize any raw score or percentage to a 0-10 scale
  const normalizeScore = (score: number) => {
    if (typeof score !== "number" || isNaN(score)) return 0;
    
    // If the saved score is > 10 (e.g., 53 or 70), scale it down from 100 to 10
    const normalized = score > 10 ? score / 10 : score;
    
    // Cap strictly between 0 and 10
    return Math.min(10, Math.max(0, normalized));
  };

  // Compute Metrics
  const totalInterviews = interviews.length;

  const validScores = interviews.map((item) => normalizeScore(item.overallScore));

  const averageScore =
    totalInterviews > 0
      ? (validScores.reduce((acc, curr) => acc + curr, 0) / totalInterviews).toFixed(1)
      : "0.0";

  const bestScore =
    totalInterviews > 0
      ? Math.round(Math.max(...validScores))
      : 0;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="animate-pulse text-slate-400">Loading dashboard stats...</p>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-white">
      {/* Top CTA */}
      <div className="flex justify-center mb-10">
        <Link
          href="/interview"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-blue-500/20"
        >
          Start New Interview 🚀
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Card 1: Total Interviews */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Total Interviews
          </p>
          <p className="text-4xl font-extrabold text-white">{totalInterviews}</p>
          <p className="text-slate-500 text-xs mt-2">Completed Sessions</p>
        </div>

        {/* Card 2: Average Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Average Score
          </p>
          <p className="text-4xl font-extrabold text-green-400">
            {averageScore}
            <span className="text-lg text-slate-500 font-normal">/10</span>
          </p>
          <p className="text-slate-500 text-xs mt-2">Overall Performance</p>
        </div>

        {/* Card 3: Best Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Best Score
          </p>
          <p className="text-4xl font-extrabold text-purple-400">
            {bestScore}
            <span className="text-lg text-slate-500 font-normal">/10</span>
          </p>
          <p className="text-slate-500 text-xs mt-2">Highest Achievement</p>
        </div>
      </div>

      {/* Recent Interviews */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-100">Recent Interviews</h2>
        <Link href="/history" className="text-xs text-slate-400 hover:text-white transition">
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {interviews.slice(0, 3).map((item) => {
          const cardScore = Math.round(normalizeScore(item.overallScore));

          return (
            <div
              key={item._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-white capitalize">{item.role}</h3>
                <p className="text-xs text-slate-400 mt-1">Topic: {item.topic}</p>
                <p className="text-xs text-slate-400">Level: {item.experience}</p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800/80">
                <span className="text-sm font-bold text-green-400">{cardScore}/10</span>
                <Link
                  href={`/interview/${item._id}/feedback`}
                  className="text-xs text-blue-400 hover:underline font-medium"
                >
                  Details →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}