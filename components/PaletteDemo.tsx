"use client";

import { useEffect, useState } from "react";
import { DEFAULT_HUE, RAMP, rampColor } from "@/lib/theme";
import { setHue } from "./ThemeControls";

// Live CHRO/MATIC-style ramp tied to the site's hue.
export default function PaletteDemo() {
  const [hue, setH] = useState(DEFAULT_HUE);
  useEffect(() => {
    const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--h"));
    if (Number.isFinite(v)) setH(v);
    const on = (e: Event) => setH((e as CustomEvent<number>).detail);
    window.addEventListener("hue:change", on);
    return () => window.removeEventListener("hue:change", on);
  }, []);
  return (
    <div>
      <div className="demo-ramp">
        {RAMP.map((s, i) => (
          <div key={i} style={{ background: rampColor(hue, i), color: s.l > 0.6 ? "oklch(0.2 0.03 " + hue + ")" : "oklch(0.98 0.01 " + hue + ")" }}>
            {(i + 1) * 100}
          </div>
        ))}
      </div>
      <label htmlFor="demo-hue" className="demo-label">Hue {Math.round(hue)}°. Drag to regenerate this page.</label>
      <input id="demo-hue" className="hue-range" type="range" min={0} max={360} value={Math.round(hue)} onChange={(e) => { const v = +e.target.value; setH(v); setHue(v); }} />
    </div>
  );
}
