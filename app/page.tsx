import Link from "next/link";
import Hero from "@/components/Hero";
import ProofBand from "@/components/ProofBand";
import CommandList from "@/components/CommandList";
import CopyEmail from "@/components/CopyEmail";
import { STILLS, STILL_BG } from "@/components/Stills";
import { profile, projects, roles, credentials, education, proofNames, photos, events } from "@/lib/content";
import { getRepos } from "@/lib/github";

const WALL: { h: number; tiles: [string, number][] }[] = [
  { h: 380, tiles: [["charter", 1.5], ["agent-platform", 1]] },
  { h: 280, tiles: [["chromatic", 1.2], ["stochastic", 1.1], ["freelance-automation", 0.9]] },
  { h: 320, tiles: [["paco", 1.1], ["opticloud", 1]] },
];

const year = (period: string) => period.replace(/^.*(\d{4}).*$/, "$1");
const month = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

export default async function Home() {
  const repos = await getRepos(5);

  return (
    <>
      <Hero />

      <section id="work" className="field-ink pad" aria-labelledby="work-title" data-reveal>
        <div className="work-head">
          <h2 id="work-title" className="display rise">Work</h2>
          <a href={profile.github} className="ulink rise" style={{ "--i": 1 } as React.CSSProperties}>Everything on GitHub</a>
        </div>
        <div className="wall">
          {WALL.map((row, r) => (
            <div className="wall-row" key={r} style={{ "--rh": `${row.h}px` } as React.CSSProperties}>
              {row.tiles.map(([slug, g], t) => {
                const p = projects.find((x) => x.slug === slug)!;
                const Still = STILLS[slug];
                return (
                  <Link key={slug} href={`/work/${slug}/`} className="tile" style={{ "--g": g } as React.CSSProperties}>
                    <span className="still open" style={{ "--i": r * 2 + t, "--bg": STILL_BG[slug] } as React.CSSProperties}>
                      {p.image ? <img src={p.image.src} width={p.image.w} height={p.image.h} alt={p.image.alt} loading="lazy" style={slug === "paco" ? ({ "--pos": "center 45%" } as React.CSSProperties) : undefined} /> : <Still />}
                      {slug !== "freelance-automation" && <span className="tile-proof">{p.results[0]}</span>}
                    </span>
                    <span className="cap"><b>{p.name}, {p.kind.toLowerCase()}</b><span className="num">{year(p.period)}</span></span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="repos">
          <div>
            <h3 className="rise">Recently on GitHub</h3>
            <p className="rise" style={{ "--i": 1 } as React.CSSProperties}>Pulled from my profile each time this site rebuilds.</p>
          </div>
          {repos.length > 0 ? (
            <ul className="repo-list">
              {repos.map((r, i) => (
                <li key={r.name} className="rise" style={{ "--i": i + 2 } as React.CSSProperties}>
                  <a className="repo" href={r.url}>
                    <b>{r.name}</b>
                    <span className="num">{[r.language, month(r.pushedAt)].filter(Boolean).join(", ")}</span>
                    <p>{r.description ?? "No description yet."}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rise">See every repository at <a href={profile.github}>github.com/{profile.githubUser}</a>.</p>
          )}
        </div>
      </section>

      <ProofBand names={proofNames} />
      <p className="band-note">Where the proof comes from: first place nationwide at IEEEXtreme 19.0, the university where I build its AI-agent platform, the IEEE community I lead, and certifications from Anthropic, NVIDIA, Microsoft and AWS.</p>

      <section id="what-i-do" className="field-bone pad cmd" aria-labelledby="cmd-title" data-reveal>
        <h2 id="cmd-title" className="display rise">What I do</h2>
        <div className="rise" style={{ "--i": 1 } as React.CSSProperties}><CommandList /></div>
        <p className="cmd-after rise" style={{ "--i": 2 } as React.CSSProperties}>Projects are fixed in scope and quoted after a 30-minute call, in English or Spanish.</p>
      </section>

      <section id="about" className="field-brown pad about" aria-labelledby="about-title" data-reveal>
        <h2 id="about-title" className="display rise">About</h2>
        <div className="about-top">
          <dl className="facts">
            <div className="rise" style={{ "--i": 1 } as React.CSSProperties}><dt>Based in</dt><dd>{profile.location}, {profile.timezone}</dd></div>
            <div className="rise" style={{ "--i": 2 } as React.CSSProperties}><dt>Studies</dt><dd>{education.degree}, {education.school}, {education.when.toLowerCase()}</dd></div>
            <div className="rise" style={{ "--i": 3 } as React.CSSProperties}><dt>Languages</dt><dd>{profile.languages}</dd></div>
          </dl>
          <div>
            <p className="story rise" style={{ "--i": 2 } as React.CSSProperties}>I build agents in LangChain and LangGraph, and I like the unglamorous part: clean data in, guardrails on, and an agent that refuses what it doesn&apos;t know.</p>
            <p className="story rise" style={{ "--i": 3 } as React.CSSProperties}>I also teach, run events, lead a 70-member IEEE chapter, and compete. We placed first in Colombia at IEEEXtreme 19.0.</p>
          </div>
        </div>
        <ul className="photos">
          {photos.map((ph, i) => (
            <li key={ph.src} className={`photo photo-${i}`}>
              <figure className="open" style={{ "--i": i } as React.CSSProperties}>
                <span className="duo"><img src={ph.src} width={ph.w} height={ph.h} alt={ph.alt} loading="lazy" /></span>
                <figcaption>{ph.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="roles">
          <h3 className="rise">Roles</h3>
          <ol>
            {roles.map((r, i) => (
              <li key={r.title + r.org} className="role slide" style={{ "--i": i } as React.CSSProperties}>
                <time className="num">{r.when}</time>
                <div><b>{r.title}</b>, {r.org}<p>{r.detail}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="roles">
          <h3 className="rise">Talks and events</h3>
          <ol>
            {events.map((e, i) => (
              <li key={e.what} className="role slide" style={{ "--i": i } as React.CSSProperties}>
                <span className="ev-where">{e.where}</span>
                <div><b>{e.what}</b><p>{e.detail}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="roles">
          <h3 className="rise">Credentials</h3>
          <dl className="creds rise">
            {credentials.map((c) => [<dt key={c.issuer + "t"}>{c.issuer}</dt>, <dd key={c.issuer + "d"}>{c.items.join("; ")}</dd>])}
          </dl>
        </div>
      </section>

      <section id="contact" className="field-indigo contact" aria-labelledby="contact-title" data-reveal>
        <h2 id="contact-title" className="display rise">Contact</h2>
        <ul className="rows">
          <li className="greet slide" style={{ "--i": 0 } as React.CSSProperties}>
            <span>Hola, let&apos;s talk</span>
            <a className="round" href={`mailto:${profile.email}?subject=Hello%20Daniel`} aria-label="Email Daniel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </li>
          <li className="slide" style={{ "--i": 1 } as React.CSSProperties}><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li className="slide" style={{ "--i": 2 } as React.CSSProperties}><a href={profile.linkedin}>LinkedIn</a></li>
          <li className="slide" style={{ "--i": 3 } as React.CSSProperties}><a href={profile.github}>GitHub</a></li>
          <li className="slide" style={{ "--i": 4 } as React.CSSProperties}><span>{profile.location}, {profile.timezone}</span></li>
        </ul>
        <div className="copyline"><CopyEmail email={profile.email} /></div>
      </section>
    </>
  );
}
