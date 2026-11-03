// "Ask my portfolio": a small hybrid retriever that runs entirely in the browser.
// The shape of a real RAG retriever: an input guardrail, a keyword retriever (BM25),
// a concept retriever (cosine over concept vectors, a stand-in for embeddings),
// and reciprocal rank fusion to merge them. No model, no API, no cost.

import { profile, projects, services, roles, stack, credentials, education, capabilities } from "./content";

export type Doc = {
  id: string;
  title: string;
  href: string;
  kind: string;
  text: string;
  answer: string;
};

const STOP = new Set(
  "a an the and or of to in on for with is are was were be been do does did what which who whom how why where when can could would should you your i me my we our it its this that these those about from at by as into have has had any some tell show give make get please".split(" ")
    .concat("el la los las un una unos unas y o de del en con por para que cual como donde cuando es son fue ser tu tus mi mis me te se lo al su sus hay puedes puede".split(" "))
);

export function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function tokenize(s: string): string[] {
  return normalize(s)
    .split(/[^a-z0-9+#.]+/)
    .map((t) => t.replace(/^\.+|\.+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);
}

function stem(t: string): string {
  if (t.length > 5 && t.endsWith("ing")) return t.slice(0, -3);
  if (t.length > 4 && t.endsWith("es")) return t.slice(0, -2);
  if (t.length > 3 && t.endsWith("s")) return t.slice(0, -1);
  return t;
}

// Concept groups play the role of an embedding space: words that mean
// the same thing land on the same axis, in English or Spanish.
const CONCEPTS: Record<string, string[]> = {
  retrieval: ["rag", "retrieval", "search", "document", "pdf", "ocr", "knowledge", "corpus", "minutes", "actas", "documento", "buscar", "busqueda", "index", "ingestion"],
  agents: ["agent", "agentic", "langgraph", "multi-agent", "mcp", "tool", "llm", "ai", "ia", "gpt", "claude", "chatbot", "assistant", "agente", "genai", "generative"],
  automation: ["automation", "automate", "workflow", "n8n", "make", "zapier", "integration", "process", "automatizar", "automatizacion", "flujo", "manual"],
  sales: ["sale", "lead", "client", "customer", "crm", "revenue", "venta", "cliente", "marketing", "follow"],
  cost: ["cost", "cheap", "price", "budget", "save", "token", "optimization", "optimize", "costo", "ahorro", "precio", "waste"],
  hire: ["hire", "contact", "email", "available", "job", "role", "work", "freelance", "contratar", "trabajo", "empleo", "contacto", "rate", "project", "service", "quote"],
  place: ["where", "based", "live", "bogota", "colombia", "timezone", "location", "remote", "relocate", "donde", "vive", "ubicacion", "country"],
  design: ["design", "color", "oklch", "palette", "token", "ui", "ux", "figma", "frontend", "tailwind", "diseno", "visual", "accessibility", "typography"],
  web: ["react", "next", "nextj", "node", "angular", "web", "frontend", "full-stack", "fullstack", "typescript", "javascript", "site", "app"],
  cloud: ["aws", "cloud", "gcp", "google", "azure", "docker", "devop", "infrastructure", "microservice", "kubernete", "ec2", "vpc", "server", "deploy"],
  data: ["data", "sql", "postgres", "postgresql", "mongodb", "database", "redis", "cosmo", "etl", "pipeline", "dato", "base"],
  ml: ["ml", "machine", "learning", "forecast", "model", "arima", "random", "forest", "prediction", "crypto", "finance", "deep", "neural", "tensorflow"],
  competition: ["ieeextreme", "competition", "contest", "award", "first", "1st", "programming", "algorithm", "competitive", "ranking", "competencia"],
  leadership: ["lead", "leadership", "president", "ieee", "community", "event", "team", "mentor", "teaching", "ambassador", "lider", "comunidad"],
  education: ["study", "university", "degree", "uniande", "graduate", "graduation", "school", "education", "student", "certification", "certificate", "estudio", "universidad"],
  language: ["english", "spanish", "language", "idioma", "ingle", "espanol", "bilingual"],
};

const CONCEPT_KEYS = Object.keys(CONCEPTS);
const WORD_TO_CONCEPT = new Map<string, number[]>();
CONCEPT_KEYS.forEach((key, i) => {
  for (const w of CONCEPTS[key]) {
    const s = stem(normalize(w));
    WORD_TO_CONCEPT.set(s, [...(WORD_TO_CONCEPT.get(s) ?? []), i]);
  }
});

function conceptVector(tokens: string[]): number[] {
  const v = new Array(CONCEPT_KEYS.length).fill(0);
  for (const t of tokens) {
    const hits = WORD_TO_CONCEPT.get(t);
    if (hits) for (const i of hits) v[i] += 1;
  }
  return v;
}

function cosine(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return na && nb ? dot / Math.sqrt(na * nb) : 0;
}

export function buildCapabilityDocs(): Doc[] {
  return capabilities.map((c) => ({ id: c.key, title: c.name, href: c.href, kind: c.proof, text: [c.name, c.body, c.proof, ...c.keywords].join(" "), answer: c.body }));
}

export function buildDocs(): Doc[] {
  const docs: Doc[] = projects.map((p) => ({
    id: p.slug,
    title: p.name,
    href: `/work/${p.slug}/`,
    kind: p.kind,
    text: [p.name, p.kind, p.context, p.summary, p.problem, ...p.built.map((b) => `${b.title} ${b.body}`), p.decision?.body ?? "", ...p.results, ...p.stack, ...p.keywords].join(" "),
    answer: p.summary,
  }));
  services.forEach((s, i) =>
    docs.push({ id: `service-${i}`, title: s.title, href: "/#services", kind: "Service", text: [s.title, s.body, s.proof, ...s.keywords, "service hire"].join(" "), answer: `${s.body} Past result: ${s.proof}.` })
  );
  docs.push({
    id: "contact",
    title: "Contact and availability",
    href: "/#contact",
    kind: "Contact",
    text: `contact hire email available job role freelance project ${profile.status} ${profile.email} ${profile.location} remote`,
    answer: `${profile.status}. Email ${profile.email}, or reach me on LinkedIn.`,
  });
  docs.push({
    id: "location",
    title: "Where I'm based",
    href: "/#about",
    kind: "About",
    text: `where based live location ${profile.location} bogota colombia timezone ${profile.timezone} remote ${profile.languages} english spanish language`,
    answer: `${profile.location} (${profile.timezone}). I work in ${profile.languages}.`,
  });
  docs.push({
    id: "education",
    title: "Education",
    href: "/#about",
    kind: "About",
    text: `${education.degree} ${education.school} ${education.when} ${education.detail} university degree graduate student`,
    answer: `${education.degree}, ${education.school}, ${education.when.toLowerCase()}. ${education.detail}.`,
  });
  roles.forEach((r, i) =>
    docs.push({ id: `role-${i}`, title: `${r.title}, ${r.org}`, href: "/#about", kind: "Role", text: `${r.title} ${r.org} ${r.detail} ${r.when}`, answer: `${r.title} at ${r.org} (${r.when}). ${r.detail}` })
  );
  docs.push({
    id: "stack",
    title: "Stack",
    href: "/#about",
    kind: "Skills",
    text: stack.map((s) => `${s.group} ${s.items.join(" ")}`).join(" "),
    answer: stack.map((s) => `${s.group}: ${s.items.join(", ")}`).join(". ") + ".",
  });
  docs.push({
    id: "credentials",
    title: "Credentials",
    href: "/#about",
    kind: "Credentials",
    text: credentials.map((c) => `${c.issuer} ${c.items.map((i) => i.name).join(" ")}`).join(" ") + " certification certificate award competition",
    answer: credentials.map((c) => `${c.issuer}: ${c.items.map((i) => i.name).join(", ")}`).join(". ") + ".",
  });
  return docs;
}

type Indexed = { doc: Doc; tokens: string[]; tf: Map<string, number>; vec: number[] };

export type Hit = { doc: Doc; score: number };

export type Trace = {
  query: string;
  blocked: null | "empty" | "injection" | "off-topic";
  keyword: Hit[];
  concept: Hit[];
  fused: Hit[];
  concepts: string[];
  ms: number;
};

const INJECTION = /(ignore (all|previous|the above)|system prompt|you are now|jailbreak|disregard|act as|olvida (las|tus) instrucciones|ignora)/i;

export function createIndex(docs: Doc[]) {
  const items: Indexed[] = docs.map((doc) => {
    const tokens = tokenize(doc.text + " " + doc.title);
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    return { doc, tokens, tf, vec: conceptVector(tokens) };
  });
  const N = items.length;
  const avgLen = items.reduce((s, d) => s + d.tokens.length, 0) / N;
  const df = new Map<string, number>();
  for (const d of items) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);

  function bm25(q: string[], d: Indexed): number {
    const k1 = 1.4, b = 0.75;
    let s = 0;
    for (const t of q) {
      const f = d.tf.get(t);
      if (!f) continue;
      const n = df.get(t) ?? 0;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      s += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.tokens.length) / avgLen)));
    }
    return s;
  }

  return function search(query: string): Trace {
    const t0 = typeof performance !== "undefined" ? performance.now() : 0;
    const done = (tr: Omit<Trace, "ms">): Trace => ({ ...tr, ms: Math.max(0.1, (typeof performance !== "undefined" ? performance.now() : 0) - t0) });
    const q = tokenize(query);
    const base = { query, keyword: [], concept: [], fused: [], concepts: [] as string[] };
    if (!query.trim()) return done({ ...base, blocked: "empty" });
    if (INJECTION.test(query)) return done({ ...base, blocked: "injection" });

    const qv = conceptVector(q);
    const concepts = CONCEPT_KEYS.filter((_, i) => qv[i] > 0);

    const keyword = items
      .map((d) => ({ doc: d.doc, score: bm25(q, d) }))
      .filter((h) => h.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    const concept = items
      .map((d) => ({ doc: d.doc, score: cosine(qv, d.vec) }))
      .filter((h) => h.score > 0.15)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (!keyword.length && !concept.length) return done({ ...base, concepts, blocked: "off-topic" });

    // Reciprocal rank fusion, k = 60.
    const fusedMap = new Map<string, Hit>();
    const add = (list: Hit[]) =>
      list.forEach((h, rank) => {
        const prev = fusedMap.get(h.doc.id);
        const s = 1 / (60 + rank + 1);
        fusedMap.set(h.doc.id, { doc: h.doc, score: (prev?.score ?? 0) + s });
      });
    add(keyword);
    add(concept);
    const fused = [...fusedMap.values()].sort((a, b) => b.score - a.score).slice(0, 4);
    return done({ query, blocked: null, keyword, concept, fused, concepts });
  };
}
