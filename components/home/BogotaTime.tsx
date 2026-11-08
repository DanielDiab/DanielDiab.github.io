"use client";

import { useEffect, useState } from "react";

// The time in Bogotá, so a visitor knows whether it's a good moment to write.
export function BogotaTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-GB", { timeZone: "America/Bogota", hour: "2-digit", minute: "2-digit" }));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return <time className="num" suppressHydrationWarning>{t || "--:--"}</time>;
}
