import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Pipeline from "@/components/Pipeline";
import PaletteDemo from "@/components/PaletteDemo";
import { projects } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article>
      <header className="case-hero">
        <div className="hero-plane" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative" }}>
          <Link href="/#work" className="back">Back to all work</Link>
          <h1>{p.name}</h1>
          <p className="case-kind">{p.kind}</p>
          <p className="case-summary">{p.summary}</p>
          <dl className="facts">
            <div><dt>Context</dt><dd>{p.context}</dd></div>
            <div><dt>When</dt><dd className="num">{p.period}</dd></div>
            <div><dt>Status</dt><dd>{p.status}</dd></div>
            <div>
              <dt>{p.link ? "Live site" : "Stack"}</dt>
              <dd>{p.link ? <a href={p.link.href}>{p.link.label}</a> : p.stack.slice(0, 3).join(", ")}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="case-body">
        <section className="section">
          <div className="wrap split">
            <div className="split-head"><h2>The problem</h2></div>
            <p className="prose">{p.problem}</p>
          </div>
        </section>

        {p.slug === "senecareader" && (
          <section className="section">
            <div className="wrap stacked">
              <h2>Architecture</h2>
              <Pipeline />
            </div>
          </section>
        )}

        {p.slug === "chromatic" && (
          <section className="section">
            <div className="wrap split">
              <div className="split-head">
                <h2>Try the idea</h2>
                <p>Fixed lightness and chroma steps in OKLCH, one hue. The same ramp drives every color on this site.</p>
              </div>
              <PaletteDemo />
            </div>
          </section>
        )}

        <section className="section">
          <div className="wrap split">
            <div className="split-head"><h2>What I built</h2></div>
            <ul className="built">
              {p.built.map((s) => (
                <li key={s.title}><h3>{s.title}</h3><p>{s.body}</p></li>
              ))}
            </ul>
          </div>
        </section>

        {(p.decision || p.lesson) && (
          <section className="section">
            <div className="wrap split">
              <div className="split-head"><h2>Decisions</h2></div>
              <div>
                {p.decision && (
                  <div className="callout"><h3>{p.decision.title}</h3><p>{p.decision.body}</p></div>
                )}
                {p.lesson && <p className="lesson"><b>What I&apos;d change:</b> {p.lesson}</p>}
              </div>
            </div>
          </section>
        )}

        <section className="section">
          <div className="wrap split">
            <div className="split-head"><h2>Results</h2></div>
            <div>
              <ul className="results">{p.results.map((r) => <li key={r}>{r}</li>)}</ul>
              <p className="stackline">Built with {p.stack.join(", ")}.</p>
              {p.note && <p className="stackline">{p.note}</p>}
            </div>
          </div>
        </section>
      </div>

      <Link href={`/work/${next.slug}/`} className="next">
        <div className="wrap">
          <p>Next case study</p>
          <span>{next.name}</span>
        </div>
      </Link>
    </article>
  );
}
