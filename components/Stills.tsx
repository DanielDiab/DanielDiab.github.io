// Drawn stills of the real work, in one flat language and the palette's own colours.
// They stand in for screenshots until real ones are added (see README).

const C = { red: "#dc1928", maroon: "#952625", mustard: "#e0a912", slate: "#4a6f84", bone: "#e2dccf", bone2: "#d7d0c1", ink: "#2a1110", white: "#ffffff" };
const F = "TikTok Sans Variable, Arial Black, sans-serif";
const CODE = ["JetBrains", "Mono Variable, monospace"].join(" "); // literal JSON in the drawing is code
const svg = { preserveAspectRatio: "xMidYMid meet" as const, xmlns: "http://www.w3.org/2000/svg", role: "img" as const };

function Seneca() {
  return (
    <svg viewBox="0 0 600 400" {...svg} aria-label="SenecaReader: a scanned page on the left becomes structured JSON on the right">
      <rect width="600" height="400" fill={C.bone} />
      <g transform="rotate(-5 160 200)">
        <rect x="70" y="50" width="190" height="290" fill={C.white} />
        <text x="90" y="88" fontFamily={F} fontWeight="800" fontSize="16" fill={C.ink}>ACTA</text>
        {[108, 124, 140].map((y) => <rect key={y} x="90" y={y} width="150" height="7" fill={C.bone2} />)}
        <rect x="82" y="156" width="166" height="28" fill="none" stroke={C.red} strokeWidth="5" />
        <text x="92" y="175" fontFamily={F} fontWeight="700" fontSize="12" fill={C.ink}>Resolución 14</text>
        {[200, 216, 232, 248, 264].map((y) => <rect key={y} x="90" y={y} width="150" height="7" fill={C.bone2} />)}
      </g>
      <rect x="300" y="186" width="44" height="28" fill={C.red} />
      <polygon points="344,176 368,200 344,224" fill={C.red} />
      <rect x="390" y="70" width="180" height="260" fill={C.ink} />
      <text x="408" y="110" fontFamily={CODE} fontSize="15" fill={C.mustard}>{"{"}</text>
      <text x="422" y="138" fontFamily={CODE} fontSize="13" fill={C.bone}>&quot;res&quot;: 14,</text>
      <text x="422" y="164" fontFamily={CODE} fontSize="13" fill={C.bone}>&quot;year&quot;: 2023,</text>
      <text x="422" y="190" fontFamily={CODE} fontSize="13" fill={C.bone}>&quot;actions&quot;: [</text>
      <rect x="436" y="202" width="110" height="9" fill={C.slate} />
      <rect x="436" y="220" width="84" height="9" fill={C.slate} />
      <text x="422" y="252" fontFamily={CODE} fontSize="13" fill={C.bone}>]</text>
      <text x="408" y="282" fontFamily={CODE} fontSize="15" fill={C.mustard}>{"}"}</text>
    </svg>
  );
}

function Agents() {
  const n = [
    { x: 60, y: 70, w: 170, t: "Open WebUI", f: C.bone },
    { x: 330, y: 70, w: 200, t: "LangGraph", f: C.mustard },
    { x: 60, y: 250, w: 130, t: "n8n", f: C.red },
    { x: 330, y: 250, w: 220, t: "Cosmos DB", f: C.bone },
  ];
  return (
    <svg viewBox="0 0 600 400" {...svg} aria-label="Agent platform: Open WebUI, LangGraph, n8n and Cosmos DB connected">
      <rect width="600" height="400" fill={C.slate} />
      <path d="M230 105 H330 M430 140 V250 M190 285 H330 M145 140 V250" stroke={C.ink} strokeWidth="12" />
      {n.map((b) => (
        <g key={b.t}>
          <rect x={b.x} y={b.y} width={b.w} height="70" fill={b.f} />
          <text x={b.x + 18} y={b.y + 45} fontFamily={F} fontWeight="800" fontSize="24" fill={b.f === C.red ? C.white : C.ink}>{b.t}</text>
        </g>
      ))}
    </svg>
  );
}

function Freelance() {
  return (
    <svg viewBox="0 0 600 400" {...svg} aria-label="Freelance results: 35 percent more client sales, 25 percent lower LLM cost">
      <rect width="600" height="400" fill={C.mustard} />
      <text x="36" y="200" fontFamily={F} fontWeight="900" fontStretch="150%" fontSize="150" fill={C.ink} letterSpacing="-4">+35%</text>
      <text x="40" y="246" fontFamily={F} fontWeight="600" fontSize="22" fill={C.ink}>client sales from lead automation</text>
      <rect x="36" y="282" width="250" height="78" fill={C.ink} />
      <text x="54" y="336" fontFamily={F} fontWeight="900" fontSize="48" fill={C.mustard}>−25%</text>
      <text x="300" y="330" fontFamily={F} fontWeight="600" fontSize="22" fill={C.ink}>LLM operating cost</text>
    </svg>
  );
}

function Chromatic() {
  const steps = [0.97, 0.92, 0.85, 0.76, 0.66, 0.56, 0.46, 0.36, 0.26];
  const ch = [0.02, 0.05, 0.09, 0.14, 0.19, 0.22, 0.19, 0.14, 0.09];
  return (
    <svg viewBox="0 0 600 400" {...svg} aria-label="CHRO/MATIC: a nine-step OKLCH colour ramp">
      <rect width="600" height="400" fill={C.ink} />
      {steps.map((l, i) => <rect key={i} x={40 + i * 58} y={60 + i * 14} width="54" height={280 - i * 14} fill={`oklch(${l} ${ch[i]} 30)`} />)}
      <text x="40" y="44" fontFamily={F} fontWeight="800" fontSize="22" fill={C.bone}>OKLCH in 9 steps</text>
    </svg>
  );
}

function Stochastic() {
  return (
    <svg viewBox="0 0 600 400" {...svg} aria-label="Stochastic: a price line with a shaded five-hour forecast">
      <rect width="600" height="400" fill={C.red} />
      <rect x="400" y="0" width="200" height="400" fill={C.maroon} />
      <polyline points="0,300 60,280 110,296 160,240 210,256 260,200 310,226 360,180 400,196" fill="none" stroke={C.white} strokeWidth="10" strokeLinejoin="bevel" />
      <polygon points="400,196 600,120 600,250" fill={C.mustard} />
      <polyline points="400,196 600,170" fill="none" stroke={C.ink} strokeWidth="10" />
      <text x="416" y="370" fontFamily={F} fontWeight="800" fontSize="26" fill={C.white}>+5 h</text>
    </svg>
  );
}

function OptiCloud() {
  const s = ["NestJS", "Spring", "Django", "FastAPI"];
  return (
    <svg viewBox="0 0 600 400" {...svg} aria-label="OptiCloud: a Kong gateway routing to four services">
      <rect width="600" height="400" fill={C.maroon} />
      <rect x="40" y="50" width="520" height="80" fill={C.mustard} />
      <text x="62" y="104" fontFamily={F} fontWeight="900" fontStretch="150%" fontSize="34" fill={C.ink}>KONG GATEWAY</text>
      {s.map((t, i) => (
        <g key={t}>
          <rect x={58 + i * 128} y="130" width="14" height="80" fill={C.mustard} />
          <rect x={40 + i * 128} y="210" width="112" height="140" fill={C.bone} />
          <text x={52 + i * 128} y="250" fontFamily={F} fontWeight="800" fontSize="18" fill={C.ink}>{t}</text>
        </g>
      ))}
    </svg>
  );
}

export const STILL_BG: Record<string, string> = {
  senecareader: C.bone, "agent-platform": C.slate, "freelance-automation": C.mustard, chromatic: C.ink, stochastic: C.red, opticloud: C.maroon,
};

export const STILLS: Record<string, () => React.ReactElement> = {
  senecareader: Seneca,
  "agent-platform": Agents,
  "freelance-automation": Freelance,
  chromatic: Chromatic,
  stochastic: Stochastic,
  opticloud: OptiCloud,
};
