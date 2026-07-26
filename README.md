# AI Mock Interview Platform 🚀

A modern, full-stack web application that allows candidate job seekers to practice interactive technical interviews with real-time AI question generation and automated performance evaluation.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **MongoDB**, and powered by the **Groq API (Llama 3.3 70B)**.

---

## 🌟 Key Features

* 💻 **Tailored Interview Setup:** Customize parameters including Target Role (*Frontend, Backend, Full Stack, Software Engineer*), Experience Level (*Beginner, Intermediate, Senior*), Topic, and Question Count.
* ⚡ **AI Question Generation:** Dynamically generates relevant technical questions using high-throughput LLMs.
* 📝 **Interactive Answer Submission:** Clean, focused interface for submitting written responses question-by-question.
* 📊 **Automated Evaluation & Scoring:** Returns immediate scoring (out of 10) along with detailed feedback breakdown (*Strengths* and *Areas for Improvement*).
* 📁 **History & Session Management:** Browse past interview sessions, review question-by-question scores, and delete test or unneeded sessions.
* 🎨 **Modern Responsive UI:** Dark-mode interface designed with dynamic visual badges, hover animations, and intuitive routing.

---

## 🛠️ Tech Stack

| Domain | Tech |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | MongoDB (via Mongoose) |
| **AI Integration** | Groq API (`llama-3.3-70b-versatile`) |
| **Icons & UI** | Custom React Components & Tailwind Utilities |

---

## 📂 Project Architecture

```text
ai-interview-platform/
├── app/
│   ├── page.tsx                  # Landing Page
│   ├── layout.tsx                # Root Layout with persistent Shell
│   ├── globals.css               # Global Styles & Tailwind Directives
│   ├── dashboard/
│   │   └── page.tsx              # User Dashboard & Analytics Overview
│   ├── interview/
│   │   ├── page.tsx              # Interview Configuration Form
│   │   └── [id]/
│   │       └── page.tsx          # Active Interactive Interview Screen
│   ├── history/
│   │   └── page.tsx              # Past Interview Logs & Detailed Review
│   └── api/
│       ├── interview/
│       │   └── route.ts          # POST route for Question Generation
│       └── history/
│           └── route.ts          # GET (all) and DELETE (single) history API
├── components/
│   ├── Navbar.tsx                # Sticky Navigation Header
│   ├── Footer.tsx                # Persistent Footer
│   ├── Button.tsx                # Reusable Variant Button Component
│   └── InterviewCard.tsx         # Card UI for Dashboard and History Lists
├── lib/
│   ├── mongodb.ts                # Cached MongoDB Connection Utility
│   └── ai.ts                     # Groq LLM Client & Prompting Helpers
├── models/
│   └── Interview.ts              # Mongoose Database Schema
└── public/                       # Static Assets