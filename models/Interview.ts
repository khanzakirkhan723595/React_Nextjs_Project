import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema(
  {
    userId: { type: String, default: "guest_user" },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    topic: { type: String, required: true },
    questions: [
      {
        question: { type: String, required: true },
        userAnswer: { type: String, default: "" },
        score: { type: Number, default: 0 },
        feedback: {
          strengths: [{ type: String }],
          improvements: [{ type: String }],
        },
      },
    ],
    overallScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Interview =
  mongoose.models.Interview || mongoose.model("Interview", InterviewSchema);

export default Interview;