"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInterviewPage() {
  const router = useRouter();

  const [role, setRole] = useState("Software Engineer");
  const [topic, setTopic] = useState("Data Structures & Algorithms");
  const [experience, setExperience] = useState("Beginner");
  const [amount, setAmount] = useState<number | string>(5);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Enforce safe limits (1 to 15 questions) to avoid Groq token overflows
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount < 1 || parsedAmount > 15) {
      setError("Please enter a valid number of questions between 1 and 15.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          topic,
          experience,
          amount: parsedAmount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate interview questions");
      }

      if (data.interviewId) {
        router.push(`/interview/${data.interviewId}`);
      } else {
        throw new Error("No interview ID returned from server");
      }
    } catch (err: any) {
      console.error("Generate Interview Error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-12 text-white">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold mb-2">Start a New Interview</h1>
        <p className="text-slate-400 text-sm mb-6">
          Customize your role, topic, and difficulty level to generate AI questions.
        </p>

        {error && (
          <div className="bg-red-950/50 border border-red-800 text-red-300 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Job Role */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Job Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
              placeholder="e.g. Software Engineer"
            />
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Topic / Skill
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
              placeholder="e.g. Data Structures & Algorithms"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Experience Level
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
            >
              <option value="Beginner">Beginner (0-1 yrs)</option>
              <option value="Intermediate">Intermediate (2-4 yrs)</option>
              <option value="Senior">Senior (5+ yrs)</option>
            </select>
          </div>

          {/* Custom Question Count Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Number of Questions
            </label>
            <input
              type="number"
              min={1}
              max={15}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 7"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
            />
            <p className="text-xs text-slate-500 mt-1">
              Enter any amount from 1 to 15 questions.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition flex justify-center items-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating Questions...</span>
              </>
            ) : (
              <span>Start Interview 🚀</span>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}