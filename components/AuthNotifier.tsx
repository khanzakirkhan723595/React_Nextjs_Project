"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export default function AuthNotifier() {
  const { user, isSignedIn } = useUser();
  const notified = useRef(false);

  useEffect(() => {
    // Fire only once when the user signs in
    if (isSignedIn && user && !notified.current) {
      notified.current = true;

      const email = user.primaryEmailAddress?.emailAddress || "No Email";

      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userId: user.id }),
      }).catch((err) => console.error("Notification ping failed:", err));
    }
  }, [isSignedIn, user]);

  return null; // This component renders nothing in the UI
}