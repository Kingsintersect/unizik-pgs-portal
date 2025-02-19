"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToMoodle() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.authCode) {
      // Replace with your Moodle URL
      const moodleRedirectUrl = `http://localhost/qverse/unizik-orientation/auth/oidc?code=${session.user.authCode}`;

      // Redirect user to Moodle
      window.location.href = moodleRedirectUrl;
    }
  }, [session]);

  return <p className="text-2xl text-center my-auto">Redirecting to Moodle...</p>;
}
