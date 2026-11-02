import Link from "next/link";
import EmbeddingField from "@/components/EmbeddingField";
import CopyEmail from "@/components/CopyEmail";
import { AskButton } from "@/components/AskPalette";
import { profile, stats, projects, services, roles, stack, credentials, education } from "@/lib/content";
import { getRepos } from "@/lib/github";

const Arrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

function ago(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function Home() {
  const repos = await getRepos();

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-plane" aria-hidden="true" />
        <EmbeddingField />
        <div className="wrap hero-in">
          <div>
            <p className="status mono"><span className="pulse" aria-hidden="true" />{profile.location} · {profile.status}</p>
            <h1 id="hero-title">AI agents that know what they <span className="cant">can&apos;t</span> answer.</h1>
            <p className="lede">I&apos;m <strong>{profile.name}</strong>, a systems and computing engineer. I build retrieval, automation and agent systems that hold up with real users. One of them is in daily use by the Engineering Faculty at Universidad de los Andes.</p>
            <div className="cta">
              <Link href="#work" className="btn btn-primary">See the work <Arrow /></Link>
              <AskButton className="btn btn-ghost">Ask my portfolio <span className="kbd">⌘K</span></AskButton>
            </div>
          </div>
          <p className="hero-hint mono">Move your cursor: it&apos;s the <b>query</b>. The nearest chunks are what a retriever would pull.</p>
        </div>
      </section>

      <div className="wrap">
        <div className="stats" role="list">
          {stats.map((s) => (
            <div className="stat" role="listitem" key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
          ))}
        </div>
      </div>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">Selected work</p>
            <div>
              <h2 id="work-title">Systems people use, and the decisions behind them.</h2>
              <p>Each case study covers what got in the way and what I chose to do about it.</p>
            </div>
          </div>
          <ul className="ledger">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}/`} className="row">
                  <span className="row-meta mono"><span>{p.kind}</span><span>{p.period}</span></span>
                  <span>
                    <span className="row-name" style={{ display: "block" }}>{p.name}</span>
                    <span className="row-sum" style={{ display: "block" }}>{p.summary}</span>
                    <span className="chips">
                      <span className={`chip ${/live|use/i.test(p.status) ? "chip-live" : ""}`}>{p.status}</span>
                      {p.stack.slice(0, 3).map((s) => <span className="chip" key={s}>{s}</span>)}
                    </span>
                  </span>
                  <span className="row-arrow"><Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="services-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">Services</p>
            <div>
              <h2 id="services-title">Fixed-scope AI work for teams without an AI team.</h2>
              <p>Three things I&apos;ve already delivered for clients or the university. Each starts with a short call and ends with something running in your tools.</p>
            </div>
          </div>
          <div className="offers">
            {services.map((s, i) => (
              <article className="offer" key={s.title}>
                <span className="offer-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <p className="proof">Proof: {s.proof}</p>
              </article>
            ))}
          </div>
          <p className="offer-note">Projects are quoted after a 30-minute call. I work in English and Spanish, on Colombian time ({profile.timezone}).</p>
        </div>
      </section>

      <section className="section" id="github" aria-labelledby="gh-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">On GitHub</p>
            <div>
              <h2 id="gh-title">Recently pushed.</h2>
              <p>Pulled from my GitHub profile every time this site rebuilds. <a href={profile.github}>See everything at github.com/{profile.githubUser}</a>.</p>
            </div>
          </div>
          {repos.length > 0 ? (
            <div className="repos">
              {repos.map((r) => (
                <a className="repo" key={r.name} href={r.url}>
                  <b>{r.name}</b>
                  <p>{r.description ?? "No description yet."}</p>
                  <span className="mono">
                    {r.language && <span><span className="lang-dot" aria-hidden="true" />{r.language}</span>}
                    <span>{ago(r.pushedAt)}</span>
                    {r.stars > 0 && <span>★ {r.stars}</span>}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <a className="btn btn-ghost" href={profile.github}>Open my GitHub profile <Arrow /></a>
          )}
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="label">About</p>
            <div>
              <h2 id="about-title">Engineer first, with a habit of explaining things to non-engineers.</h2>
              <p>{education.degree}, {education.school}, {education.when.toLowerCase()}. {education.detail}. I teach, I run a 70-person tech community, and I compete: first place in Colombia at IEEEXtreme 19.0.</p>
            </div>
          </div>

          <div className="about-grid">
            <p className="label">Roles</p>
            <ul className="timeline">
              {roles.map((r) => (
                <li key={r.title + r.org}>
                  <span className="mono">{r.when}</span>
                  <div><b>{r.title}</b>, {r.org}<span>{r.detail}</span></div>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-grid">
            <p className="label">Stack</p>
            <div className="stack">
              {stack.map((s) => (
                <div key={s.group}><h3>{s.group}</h3><p>{s.items.join(", ")}</p></div>
              ))}
            </div>
          </div>

          <div className="about-grid">
            <p className="label">Credentials</p>
            <div className="creds">
              {credentials.map((c) => (
                <div key={c.issuer}><b>{c.issuer}</b><span>{c.items.join(" · ")}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="wrap">
          <p className="label">Contact</p>
          <h2 id="contact-title" style={{ marginTop: 20 }}>Got a workflow eating your week, or a role that fits?</h2>
          <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="contact-row">
            <CopyEmail email={profile.email} />
            <a className="btn btn-ghost" href={profile.linkedin}>LinkedIn</a>
            <a className="btn btn-ghost" href={profile.github}>GitHub</a>
          </div>
        </div>
      </section>
    </>
  );
}
