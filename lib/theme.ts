// Runs before paint: marks that script is available so entrance styles can apply.
export const bootScript = `document.documentElement.classList.add("js");setTimeout(function(){document.querySelectorAll("[data-reveal]").forEach(function(e){e.classList.add("in")})},4000);`;

// Nine perceptual steps for one hue, light to dark, like a CHRO/MATIC ramp.
export const RAMP = [
  { l: 0.97, c: 0.02 }, { l: 0.92, c: 0.05 }, { l: 0.85, c: 0.09 }, { l: 0.76, c: 0.14 }, { l: 0.66, c: 0.19 },
  { l: 0.56, c: 0.22 }, { l: 0.46, c: 0.19 }, { l: 0.36, c: 0.14 }, { l: 0.26, c: 0.09 },
];
export const rampColor = (h: number, i: number) => `oklch(${RAMP[i].l} ${RAMP[i].c} ${h})`;
