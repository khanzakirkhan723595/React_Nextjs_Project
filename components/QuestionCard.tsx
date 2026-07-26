"use client";

import { useState } from "react";
import Button from "./Button";

interface Props {
  question: string;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSubmit: (answer: string) => void;
  isSubmitting: boolean;
}

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswerSubmit,
  isSubmitting = false,
}: Props) {
  const [answer, setAnswer] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim()) return;
    onAnswerSubmit(answer);
    setAnswer("");
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-xl">
      {/* Header Progress */}
      <div className="flex justify-between items-center text-sm font-medium text-slate-400 border-b border-slate-800 pb-4">
        <span>
          Question <span className="text-blue-400 font-bold">{currentIndex + 1}</span> of {totalQuestions}
        </span>
        <div className="w-32 bg-slate-800 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Prompt */}
      <h2 className="text-xl sm:text-2xl font-semibold text-white leading-snug">
        {question}
      </h2>

      {/* Answer Area */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={6}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your structured explanation here..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition resize-none"
          required
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !answer.trim()}>
            {isSubmitting
              ? "Saving Answer..."
              : currentIndex + 1 === totalQuestions
              ? "Submit Interview"
              : "Next Question →"}
          </Button>
        </div>
      </form>
    </div>
  );
}