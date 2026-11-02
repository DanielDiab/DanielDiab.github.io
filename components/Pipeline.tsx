// SenecaReader's architecture as a left-to-right flow.
const COLS: { title: string; nodes: { t: string; kind?: "hot" | "guard" }[] }[] = [
  { title: "Sources", nodes: [{ t: "PDF" }, { t: "Scanned image" }, { t: "DOCX minutes" }] },
  { title: "Ingest", nodes: [{ t: "OCR" }, { t: "Fix accents" }, { t: "Recover links" }, { t: "Resumable batch", kind: "hot" }] },
  { title: "Store", nodes: [{ t: "Structured JSON" }, { t: "Action items" }, { t: "Index" }] },
  { title: "Agent", nodes: [{ t: "Input guardrail", kind: "guard" }, { t: "keyword_search", kind: "hot" }, { t: "semantic_search", kind: "hot" }, { t: "LangGraph" }] },
  { title: "Answer", nodes: [{ t: "Output guardrail", kind: "guard" }, { t: "Cited answer" }, { t: "JWT session" }] },
];

export default function Pipeline() {
  return (
    <div role="img" aria-label="Pipeline: PDF, scan and DOCX sources go through OCR and cleanup into structured JSON, then a guarded LangGraph agent with keyword and semantic search returns cited answers.">
      <div className="pipe">
        {COLS.map((c) => (
          <div className="pipe-col" key={c.title}>
            <h4>{c.title}</h4>
            {c.nodes.map((n) => <div key={n.t} className={`node ${n.kind ?? ""}`}>{n.t}</div>)}
            <div className="flow" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
