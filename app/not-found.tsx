import Link from "next/link";

export default function NotFound() {
  return (
    <section className="case-hero">
      <div className="wrap">
        <p className="muted">404</p>
        <h1 style={{ marginTop: 16 }}>This page isn&apos;t in the corpus.</h1>
        <p className="case-summary">The guardrail refuses to make one up. Head back and try the work index instead.</p>
        <div className="actions"><Link href="/" className="btn btn-solid">Go to the home page</Link></div>
      </div>
    </section>
  );
}
