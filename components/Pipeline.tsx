// SenecaReader's pipeline. Its stages really run in this order, so it is an ordered list.
const STAGES: { title: string; nodes: { t: string; code?: boolean; kind?: "hot" | "guard" }[] }[] = [
  { title: "Sources", nodes: [{ t: "PDF" }, { t: "Scanned image" }, { t: "DOCX minutes" }] },
  { title: "Ingest", nodes: [{ t: "OCR" }, { t: "Fix dropped accents" }, { t: "Recover links" }, { t: "Resumable batch CLI", kind: "hot" }] },
  { title: "Store", nodes: [{ t: "Structured JSON" }, { t: "Action items" }, { t: "Index" }] },
  { title: "Agent", nodes: [{ t: "Input guardrail", kind: "guard" }, { t: "keyword_search", code: true, kind: "hot" }, { t: "semantic_search", code: true, kind: "hot" }, { t: "LangGraph" }] },
  { title: "Answer", nodes: [{ t: "Output guardrail", kind: "guard" }, { t: "Answer with sources" }, { t: "JWT session" }] },
];

export default function Pipeline() {
  return (
    <div>
      <ol className="pipe">
        {STAGES.map((s) => (
          <li key={s.title}>
            <h3>{s.title}</h3>
            <ul>{s.nodes.map((n) => <li key={n.t} className={n.kind}>{n.code ? <code>{n.t}</code> : n.t}</li>)}</ul>
          </li>
        ))}
      </ol>
      <p className="pipe-note">Red marks the guardrails. Slate marks the parts that took the most engineering: the batch job that survives failures, and the two retrieval tools the agent chooses between.</p>
    </div>
  );
}
