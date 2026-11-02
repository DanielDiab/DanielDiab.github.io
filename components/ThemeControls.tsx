"use client";

import { useEffect, useRef, useState } from "react";
import { DEFAULT_HUE, HUE_KEY, THEME_KEY, RAMP, rampColor } from "@/lib/theme";

const PRESETS = [268, 205, 150, 25, 330, 85];

function readHue(): number {
  if (typeof document === "undefined") return DEFAULT_HUE;
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--h"));
  return Number.isFinite(v) ? v : DEFAULT_HUE;
}

export function setHue(h: number) {
  document.documentElement.style.setProperty("--h", String(h));
  try { localStorage.setItem(HUE_KEY, String(h)); } catch {}
  window.dispatchEvent(new CustomEvent("hue:change", { detail: h }));
}

export default function ThemeControls() {
  const [open, setOpen] = useState(false);
  const [hue, setHueState] = useState(DEFAULT_HUE);
  const [dark, setDark] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHueState(readHue());
    setDark(getComputedStyle(document.documentElement).colorScheme.includes("dark"));
    const onHue = (e: Event) => setHueState((e as CustomEvent<number>).detail);
    window.addEventListener("hue:change", onHue);
    return () => window.removeEventListener("hue:change", onHue);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const update = (h: number) => { setHueState(h); setHue(h); };

  const toggleTheme = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem(THEME_KEY, next); } catch {}
    setDark(!dark);
    window.dispatchEvent(new CustomEvent("hue:change", { detail: readHue() }));
  };

  return (
    <>
      <div className="hue" ref={ref}>
        <button className="icon-btn" type="button" aria-expanded={open} aria-controls="hue-pop" onClick={() => setOpen((o) => !o)} aria-label="Change the site's color">
          <span className="hue-swatch" aria-hidden="true" />
        </button>
        {open && (
          <div className="hue-pop" id="hue-pop" role="dialog" aria-label="Site color">
            <h3>Pick the site&apos;s hue</h3>
            <p className="muted" style={{ fontSize: "0.9rem" }}>Every color on this site comes from one OKLCH hue. Drag to regenerate the palette.</p>
            <label htmlFor="hue-range" className="label" style={{ display: "block", marginTop: 12 }}>Hue</label>
            <input id="hue-range" className="hue-range" type="range" min={0} max={360} step={1} value={Math.round(hue)} onChange={(e) => update(+e.target.value)} />
            <div className="ramp" aria-hidden="true">
              {RAMP.map((_, i) => <span key={i} style={{ background: rampColor(hue, i) }} />)}
            </div>
            <div className="hue-meta mono"><span>oklch(L C {Math.round(hue)})</span><span>9 steps</span></div>
            <div className="presets" aria-label="Presets">
              {PRESETS.map((p) => (
                <button key={p} type="button" style={{ background: `oklch(0.62 0.2 ${p})` }} aria-label={`Hue ${p}`} onClick={() => update(p)} />
              ))}
            </div>
          </div>
        )}
      </div>
      <button className="icon-btn" type="button" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
        {dark ? (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        ) : (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
        )}
      </button>
    </>
  );
}
