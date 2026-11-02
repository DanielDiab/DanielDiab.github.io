import Link from "next/link";
import EmbeddingField from "@/components/EmbeddingField";
import CopyEmail from "@/components/CopyEmail";
import { AskButton } from "@/components/AskPalette";
import { profile, projects, services, roles, stack, credentials, education } from "@/lib/content";
import { getRepos } from "@/lib/github";

function month(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
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
            <p className="hero-where">Based in Bogotá. Open to full-time roles and automation projects.</p>
            <h1 id="hero-title">AI agents that know what they can&apos;t answer.</h1>
            <p className="lede">I&apos;m <strong>{profile.name}</strong>, a systems and computing engineer. I build retrieval, automation and agent systems that hold up with real users. One of them is in daily use by the Engineering Faculty at Universidad de los Andes.</p>
            <div className="actions">
              <Link href="#work" className="btn btn-solid">See the work</Link>
              <AskButton className="btn btn-line">Ask my portfolio <span className="kbd">⌘K</span></AskButton>
            </div>
          </div>
          <p className="hero-note">Move your cursor across the field. It acts as a search query, and the six closest chunks are what a retriever would pull.</p>
        </div>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="work-title">Work</h2>
            <p>Systems people use, and the decisions behind them. Each case study covers what got in the way and what I did about it.</p>
          </div>
          <ul className="ledger">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}/`} className="entry">
                  <span className="entry-name">{p.name}</span>
                  <span className="entry-year num">{p.period.replace(/^.*(\d{4}).*$/, "$1")}</span>
                  <span className="entry-kind">{p.kind}, {p.context}</span>
                  <span className="entry-sum">{p.summary}</span>
                  <span className="entry-foot">
                    <b>{p.results[0]}</b>
                    <span>{p.stack.slice(0, 4).join(", ")}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="services-title">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="services-title">Services</h2>
            <p>Fixed-scope AI work for teams without an AI team. Each one is something I&apos;ve already delivered.</p>
          </div>
          <div>
            <dl className="offers">
              {services.map((s) => (
                <div className="offer" key={s.title}>
                  <dt>{s.title}</dt>
                  <dd>{s.body}<b>Done before: {s.proof}</b></dd>
                </div>
              ))}
            </dl>
            <p className="after">Projects are quoted after a 30-minute call. I work in English and Spanish, on Colombian time ({profile.timezone}).</p>
          </div>
        </div>
      </section>

      <section className="section" id="github" aria-labelledby="gh-title">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="gh-title">On GitHub</h2>
            <p>My most recently pushed repositories, refreshed every time this site rebuilds. <a href={profile.github}>See all of them on my profile</a>.</p>
          </div>
          {repos.length > 0 ? (
            <ul className="repos">
              {repos.map((r) => (
                <li key={r.name}>
                  <a className="repo" href={r.url}>
                    <span className="repo-name">{r.name}</span>
                    <span className="repo-meta num">{[r.language, month(r.pushedAt), r.stars > 0 ? `${r.stars} stars` : ""].filter(Boolean).join(", ")}</span>
                    <span className="repo-desc">{r.description ?? "No description yet."}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p><a className="btn btn-line" href={profile.github}>Open github.com/{profile.githubUser}</a></p>
          )}
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="about-title">About</h2>
            <p>{education.degree} at {education.school}, {education.when.toLowerCase()}. {education.detail}. I teach, I lead a 70-person tech community, and I placed first in Colombia at IEEEXtreme 19.0.</p>
          </div>
          <div>
            <div className="block">
              <h3 className="subhead">Roles</h3>
              <ul className="timeline">
                {roles.map((r) => (
                  <li key={r.title + r.org}>
                    <time className="num">{r.when}</time>
                    <div><b>{r.title}</b>, {r.org}<span>{r.detail}</span></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="block">
              <h3 className="subhead">Stack</h3>
              <dl className="defs">
                {stack.map((s) => [<dt key={s.group + "t"}>{s.group}</dt>, <dd key={s.group + "d"}>{s.items.join(", ")}</dd>])}
              </dl>
            </div>
            <div className="block">
              <h3 className="subhead">Credentials</h3>
              <dl className="defs">
                {credentials.map((c) => [<dt key={c.issuer + "t"}>{c.issuer}</dt>, <dd key={c.issuer + "d"}>{c.items.join("; ")}</dd>])}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="wrap">
          <h2 id="contact-title">Got a workflow eating your week, or a role that fits?</h2>
          <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="contact-row">
            <CopyEmail email={profile.email} />
            <a className="btn btn-line" href={profile.linkedin}>LinkedIn</a>
            <a className="btn btn-line" href={profile.github}>GitHub</a>
          </div>
        </div>
      </section>
    </>
  );
}
