"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [msg, setMsg] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setMsg("Copied");
    } catch {
      setMsg("Copy blocked. Select the address above.");
    }
    setTimeout(() => setMsg(""), 2200);
  };
  return (
    <>
      <button type="button" className="btn btn-solid" onClick={copy}>Copy email</button>
      <span className="toast" role="status" aria-live="polite">{msg}</span>
    </>
  );
}
