"use client";

import { useState } from "react";
import { RAMP, rampColor } from "@/lib/theme";

// CHRO/MATIC's idea, live: fixed lightness and chroma steps in OKLCH, one hue.
export default function PaletteDemo() {
  const [hue, setHue] = useState(30);
  return (
    <div>
      <div className="ramp">
        {RAMP.map((s, i) => (
          <div key={i} style={{ background: rampColor(hue, i), color: s.l > 0.6 ? "#2a1110" : "#ffffff" }}>{(i + 1) * 100}</div>
        ))}
      </div>
      <input id="ramp-hue" className="hue-range" type="range" min={0} max={360} value={hue} onChange={(e) => setHue(+e.target.value)} aria-describedby="ramp-label" />
      <label id="ramp-label" htmlFor="ramp-hue" className="ramp-label">Hue {hue}°. Drag it: the nine steps stay evenly spaced to the eye at every hue.</label>
    </div>
  );
}
