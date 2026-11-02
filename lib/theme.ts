// Shared between the inline boot script (runs before paint) and the hue dial.
export const HUE_KEY = "dd-hue";
export const THEME_KEY = "dd-theme";
export const DEFAULT_HUE = 268;

export const bootScript = `(function(){try{var h=localStorage.getItem("${HUE_KEY}");if(h!==null&&!isNaN(+h))document.documentElement.style.setProperty("--h",h);var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

// Nine perceptual steps for one hue, light to dark, like a CHRO/MATIC ramp.
export const RAMP = [
  { l: 0.97, c: 0.02 }, { l: 0.92, c: 0.05 }, { l: 0.85, c: 0.09 }, { l: 0.76, c: 0.14 }, { l: 0.66, c: 0.19 },
  { l: 0.56, c: 0.22 }, { l: 0.46, c: 0.19 }, { l: 0.36, c: 0.14 }, { l: 0.26, c: 0.09 },
];
export const rampColor = (h: number, i: number) => `oklch(${RAMP[i].l} ${RAMP[i].c} ${h})`;
