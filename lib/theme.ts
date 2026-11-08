// Runs before paint: marks that script is available so entrance styles can apply, and decides
// whether the opening curtain plays (first visit of the session, home page, motion allowed).
// The timeout is a fallback so nothing stays hidden if the app never hydrates.
export const bootScript = `(function(){var h=document.documentElement;h.classList.add("js");var seen=null;try{seen=sessionStorage.getItem("dd-intro")}catch(e){}var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(!seen&&!rm&&location.pathname==="/"&&!location.hash)h.classList.add("curtain");else h.classList.add("loaded");setTimeout(function(){h.classList.add("loaded");document.querySelectorAll("[data-reveal]").forEach(function(e){e.classList.add("in")})},4000)})();`;

// Nine perceptual steps for one hue, light to dark, like a CHRO/MATIC ramp.
export const RAMP = [
  { l: 0.97, c: 0.02 }, { l: 0.92, c: 0.05 }, { l: 0.85, c: 0.09 }, { l: 0.76, c: 0.14 }, { l: 0.66, c: 0.19 },
  { l: 0.56, c: 0.22 }, { l: 0.46, c: 0.19 }, { l: 0.36, c: 0.14 }, { l: 0.26, c: 0.09 },
];
export const rampColor = (h: number, i: number) => `oklch(${RAMP[i].l} ${RAMP[i].c} ${h})`;
