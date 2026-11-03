import AgentTrace from "./AgentTrace";
import CountUp from "./CountUp";
import { chapter, credentials, events, headline, keyFacts, photos, profile, roles, education } from "@/lib/content";

// Chapter one of the home page: who Daniel is, the talks, the IEEE chapter he leads and every
// certification, before the exhibition room. Photos keep their natural aspect ratio.

const photo = (src: string) => photos.find((p) => p.src === src)!;
const NEW_TALK = { src: "/img/teaching.jpg", w: 880, h: 1100, alt: "Daniel teaching an AI workshop in front of a projected Gemini notebook", caption: "Teaching students to work with AI tools in class" };

export default function AboutIntro() {
  const talk = photo("/img/talk.jpg");
  const board = photo("/img/board.jpg");
  const xtreme = photo("/img/ieeextreme.jpg");
  const event = photo("/img/chapter-event.jpg");

  return (
    <div className="ab">
      <section id="about" className="ab-hero field-indigo" aria-labelledby="about-title">
        <header className="ab-bar">
          <span className="wordmark">{profile.name}</span>
          <nav aria-label="Sections">
            <a href="#talks" className="ulink">Talks</a>
            <a href="#chapter" className="ulink">IEEE chapter</a>
            <a href="#certifications" className="ulink">Certifications</a>
            <a href="#exhibition" className="ulink">Work</a>
          </nav>
        </header>
        <div className="ab-hero-grid">
          <div className="ab-hero-text">
            <p className="ab-role hero-load">
              <img src="/img/portrait.jpg" width={56} height={56} alt="" className="ab-avatar" />
              <span>{headline}<br /><em>{education.degree}, {education.school}</em></span>
            </p>
            <h1 id="about-title" className="display ab-name">
              <span className="mask"><span className="hero-word" style={{ "--i": 1 } as React.CSSProperties}>Daniel</span></span>
              <span className="mask"><span className="hero-word" style={{ "--i": 2 } as React.CSSProperties}>Diab</span></span>
            </h1>
            <p className="ab-lead hero-load" style={{ "--i": 4 } as React.CSSProperties}>I build AI agents and the machinery that makes them trustworthy: evaluation gates, guardrails, traces and cost controls. Based in Bogotá, open to full-time roles and projects.</p>
            <ul className="ab-facts hero-load" style={{ "--i": 5 } as React.CSSProperties}>
              {keyFacts.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <div className="actions hero-load" style={{ "--i": 6 } as React.CSSProperties}>
              <a className="btn" href="#exhibition">Enter the exhibition</a>
              <a className="btn btn-light" href={`mailto:${profile.email}?subject=Hello%20Daniel`}>Email me</a>
            </div>
          </div>
          <div className="ab-trace wipe" style={{ "--i": 3 } as React.CSSProperties}><AgentTrace /></div>
        </div>
      </section>

      <section id="talks" className="ab-sec field-bone" aria-labelledby="talks-title" data-reveal>
        <div className="ab-head">
          <h2 id="talks-title" className="display rise">Talks and workshops</h2>
          <p className="rise" style={{ "--i": 1 } as React.CSSProperties}>I teach what I build. The workshop &ldquo;¿Te imaginas crear tu propio agente de IA?&rdquo; showed students from every program how to build an agent from scratch and put it to work in their own projects.</p>
        </div>
        <div className="ab-talk-photos">
          {[NEW_TALK, talk].map((ph, i) => (
            <figure key={ph.src} className="open" style={{ "--i": i } as React.CSSProperties}>
              <img src={ph.src} width={ph.w} height={ph.h} alt={ph.alt} loading="lazy" />
              <figcaption>{ph.caption}</figcaption>
            </figure>
          ))}
        </div>
        <ol className="ab-list">
          {events.map((e, i) => (
            <li key={e.what} className="slide" style={{ "--i": i } as React.CSSProperties}>
              <b>{e.what}</b>
              <span>{e.where}</span>
              <p>{e.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="chapter" className="ab-sec field-brown" aria-labelledby="chapter-title" data-reveal>
        <div className="ab-head">
          <h2 id="chapter-title" className="display rise">{chapter.name}</h2>
          <p className="rise" style={{ "--i": 1 } as React.CSSProperties}>{chapter.role}. The student chapter I lead at Universidad de los Andes.</p>
        </div>
        <ul className="ab-stats">
          {chapter.stats.map((s, i) => (
            <li key={s.small} className="rise" style={{ "--i": i + 2 } as React.CSSProperties}><CountUp value={s.big} className="display num" /><span>{s.small}</span></li>
          ))}
        </ul>
        <div className="ab-chapter-grid">
          <ul className="ab-lines">
            {chapter.lines.map((l, i) => <li key={l} className="slide" style={{ "--i": i } as React.CSSProperties}>{l}</li>)}
          </ul>
          <div className="ab-chapter-photos">
            {[board, event, xtreme].map((ph, i) => (
              <figure key={ph.src} className={`open ph-${i}`} style={{ "--i": i } as React.CSSProperties}>
                <img src={ph.src} width={ph.w} height={ph.h} alt={ph.alt} loading="lazy" />
                <figcaption>{ph.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="ab-sec field-bone" aria-labelledby="exp-title" data-reveal>
        <div className="ab-head">
          <h2 id="exp-title" className="display rise">Experience</h2>
        </div>
        <ol className="ab-roles">
          {roles.map((r, i) => (
            <li key={r.title + r.org} className="slide" style={{ "--i": i } as React.CSSProperties}>
              <time className="num">{r.when}</time>
              <div><b>{r.title}</b>, {r.org}<p>{r.detail}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section id="certifications" className="ab-sec field-ink" aria-labelledby="cert-title" data-reveal>
        <div className="ab-head">
          <h2 id="cert-title" className="display rise">Certifications</h2>
          <p className="rise" style={{ "--i": 1 } as React.CSSProperties}>Every credential with its date and ID. The ones with a link open the issuer&apos;s verification page.</p>
        </div>
        <div className="ab-certs">
          {credentials.map((c, i) => (
            <section key={c.issuer} className="ab-issuer rise" style={{ "--i": i } as React.CSSProperties} aria-label={c.issuer}>
              <h3>{c.issuer}</h3>
              <ul>
                {c.items.map((it) => (
                  <li key={it.name}>
                    <b>{it.name}</b>
                    <span className="num">{it.date}</span>
                    {it.id && <code>ID {it.id}</code>}
                    {it.url && <a href={it.url}>Verify</a>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
