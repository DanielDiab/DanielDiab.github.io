"use client";

import { useState } from "react";
import type { Credential } from "@/lib/content";

// Every certification, one issuer at a time. All panels are in the page, so search engines and
// people without script still get the first one; the tabs only choose which shows.
export default function CertTabs({ groups }: { groups: { issuer: string; items: Credential[] }[] }) {
  const [k, setK] = useState(0);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (k + (e.key === "ArrowRight" ? 1 : -1) + groups.length) % groups.length;
    setK(n);
    document.getElementById(`cert-tab-${n}`)?.focus();
  };
  const total = groups.reduce((a, g) => a + g.items.length, 0);
  return (
    <div className="ct">
      <div className="ct-tabs" role="tablist" aria-label={`${total} certifications by issuer`} onKeyDown={onKey}>
        {groups.map((g, i) => (
          <button key={g.issuer} id={`cert-tab-${i}`} type="button" role="tab" aria-selected={i === k} aria-controls={`cert-panel-${i}`} tabIndex={i === k ? 0 : -1} onClick={() => setK(i)}>
            {g.issuer}<span className="num">{g.items.length}</span>
          </button>
        ))}
      </div>
      {groups.map((g, i) => (
        <ul key={g.issuer} id={`cert-panel-${i}`} role="tabpanel" aria-labelledby={`cert-tab-${i}`} className="ct-list" hidden={i !== k}>
          {g.items.map((it, j) => (
            <li key={it.name} style={{ "--i": j } as React.CSSProperties}>
              <b>{it.name}</b>
              <span className="num">{it.date}</span>
              {it.id && <code>ID {it.id}</code>}
              {it.url ? <a href={it.url}>Verify</a> : <i />}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
