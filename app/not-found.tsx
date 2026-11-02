import Link from "next/link";

export default function NotFound() {
  return (
    <section className="case-hero">
      <div className="wrap">
        <p className="label">404 · no grounded source</p>
        <h1 style={{ marginTop: 20 }}>This page isn&apos;t in the corpus.</h1>
        <p className="case-summary">The guardrail refuses to make one up. Head back and try the work index instead.</p>
        <div className="cta"><Link href="/" className="btn btn-primary">Back home</Link></div>
      </div>
    </section>
  );
}
