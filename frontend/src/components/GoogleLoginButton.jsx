"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      {
        theme: "outline",
        size: "large",
        shape: "square",
      }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    const res = await fetch("http://localhost:5000/api/auth/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.refresh();
    }
  };

  return <div id="googleSignInDiv"></div>;
}
