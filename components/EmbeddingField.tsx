"use client";

import { useEffect, useRef } from "react";

// The hero background: document chunks scattered in an "embedding plane".
// The cursor is the query; its nearest chunks light up and connect, the way
// a retriever pulls its top-k neighbours. Without a cursor the query drifts.

const CLUSTERS: { cx: number; cy: number; words: string[] }[] = [
  { cx: 0.72, cy: 0.28, words: ["Resolución 14", "acta 2019", "OCR scan", "DOCX minutes", "hyperlinks", "accents fixed", "action items"] },
  { cx: 0.88, cy: 0.55, words: ["LangGraph", "tool call", "guardrail", "JWT", "keyword_search", "semantic_search", "MCP"] },
  { cx: 0.66, cy: 0.66, words: ["n8n", "lead scoring", "follow-up", "Make", "CRM sync", "webhook"] },
  { cx: 0.7, cy: 0.1, words: ["OKLCH", "9-step ramp", "tokens", "contrast AA", "Tailwind"] },
  { cx: 0.92, cy: 0.18, words: ["ARIMA", "Random Forest", "RSI", "MACD"] },
  { cx: 0.8, cy: 0.86, words: ["Kong", "EC2", "Redis", "RDS", "Docker", "VPC"] },
];

type P = { x: number; y: number; ox: number; oy: number; ph: number; label: string; c: number };

function rng(seed: number) {
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
}

export default function EmbeddingField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const host = canvas.parentElement as HTMLElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, t = 0;
    let hue = 268, dark = false;
    const mouse = { x: -1, y: -1, active: false };
    const q = { x: 0, y: 0 };
    const rand = rng(7);
    const pts: P[] = [];

    CLUSTERS.forEach((cl, ci) => {
      cl.words.forEach((label) => {
        const a = rand() * Math.PI * 2, r = 0.03 + rand() * 0.11;
        pts.push({ x: 0, y: 0, ox: cl.cx + Math.cos(a) * r * 0.9, oy: cl.cy + Math.sin(a) * r * 1.3, ph: rand() * 10, label, c: ci });
      });
      for (let i = 0; i < 6; i++) {
        const a = rand() * Math.PI * 2, r = 0.02 + rand() * 0.14;
        pts.push({ x: 0, y: 0, ox: cl.cx + Math.cos(a) * r, oy: cl.cy + Math.sin(a) * r * 1.3, ph: rand() * 10, label: "", c: ci });
      }
    });
    for (let i = 0; i < 28; i++) pts.push({ x: 0, y: 0, ox: 0.58 + rand() * 0.42, oy: rand(), ph: rand() * 10, label: "", c: -1 });

    const readTheme = () => {
      const s = getComputedStyle(document.documentElement);
      const v = parseFloat(s.getPropertyValue("--h"));
      hue = Number.isFinite(v) ? v : 268;
      dark = s.colorScheme.includes("dark");
    };
    readTheme();

    const resize = () => {
      const r = host.getBoundingClientRect();
      w = r.width; h = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const narrow = w < 760;
      const accent = dark ? `oklch(0.78 0.16 ${hue}` : `oklch(0.54 0.23 ${hue}`;
      const faint = dark ? `oklch(0.75 0.05 ${hue}` : `oklch(0.45 0.05 ${hue}`;

      for (const p of pts) {
        const sx = narrow ? 0.18 + p.ox * 0.82 : p.ox;
        p.x = sx * w + Math.sin(t * 0.6 + p.ph) * 6;
        p.y = p.oy * h + Math.cos(t * 0.5 + p.ph) * 6;
      }

      // query position: cursor, or a slow Lissajous drift
      const tx = mouse.active ? mouse.x : w * (narrow ? 0.62 : 0.74) + Math.sin(t * 0.35) * w * 0.16;
      const ty = mouse.active ? mouse.y : h * 0.5 + Math.sin(t * 0.53) * h * 0.3;
      q.x += (tx - q.x) * 0.08; q.y += (ty - q.y) * 0.08;

      const ranked = pts.map((p, i) => ({ i, d: Math.hypot(p.x - q.x, p.y - q.y) })).sort((a, b) => a.d - b.d);
      const K = 6;
      const top = new Set(ranked.slice(0, K).map((r) => r.i));
      const maxD = ranked[K - 1]?.d || 1;

      ctx.lineWidth = 1;
      for (let k = 0; k < K; k++) {
        const p = pts[ranked[k].i];
        const a = 0.75 - (ranked[k].d / (maxD * 1.15)) * 0.5;
        ctx.strokeStyle = `${accent} / ${a.toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      }

      ctx.font = `500 11px "JetBrains Mono Variable", ui-monospace, monospace`;
      pts.forEach((p, i) => {
        const hot = top.has(i);
        const r = hot ? 4 : p.label ? 2.6 : 1.6;
        ctx.fillStyle = hot ? `${accent} / 1)` : `${faint} / ${p.label ? 0.55 : 0.35})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
        if (hot) { ctx.strokeStyle = `${accent} / 0.35)`; ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, Math.PI * 2); ctx.stroke(); }
        if (p.label && (hot || !narrow)) {
          ctx.fillStyle = hot ? `${accent} / 1)` : `${faint} / 0.5)`;
          ctx.fillText(p.label, p.x + 9, p.y + 4);
        }
      });

      // the query marker
      ctx.strokeStyle = `${accent} / 0.9)`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(q.x, q.y, 14, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(q.x - 22, q.y); ctx.lineTo(q.x - 8, q.y); ctx.moveTo(q.x + 8, q.y); ctx.lineTo(q.x + 22, q.y);
      ctx.moveTo(q.x, q.y - 22); ctx.lineTo(q.x, q.y - 8); ctx.moveTo(q.x, q.y + 8); ctx.lineTo(q.x, q.y + 22); ctx.stroke();
      ctx.fillStyle = `${accent} / 1)`;
      ctx.fillText(`query · top-${K}`, q.x + 20, q.y - 18);
    };

    const loop = () => {
      t += 0.016;
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    const onHue = () => { readTheme(); if (reduce) draw(); };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("hue:change", onHue);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", onHue);

    resize();
    q.x = w * 0.74; q.y = h * 0.5;
    if (reduce) { t = 2; draw(); } else raf = requestAnimationFrame(loop);
    if (document.fonts) document.fonts.ready.then(() => reduce && draw());

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("hue:change", onHue); mq.removeEventListener("change", onHue);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
