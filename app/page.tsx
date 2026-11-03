import Shell from "@/components/Shell";
import CommandList from "@/components/CommandList";
import CopyEmail from "@/components/CopyEmail";
import { STILLS, STILL_BG } from "@/components/Stills";
import type { Exhibit } from "@/components/Exhibition";
import { profile, projects, roles, credentials, education, photos, events } from "@/lib/content";
import { getRepos } from "@/lib/github";

// Which plinth each project stands on: three tall ones at the back, four in front.
const ROOM = ["chromatic", "opticloud", "freelance-automation", "agent-platform", "charter", "paco", "stochastic"];
// Terminal screenshots read as blank at monitor size, so Charter shows its drawing on the screen.
const DRAWN = new Set(["charter"]);

const month = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

export default async function Home() {
  const repos = await getRepos(6);

  const exhibits: Exhibit[] = ROOM.map((slug) => {
    const i = projects.findIndex((p) => p.slug === slug);
    const p = projects[i];
    return { slug, name: p.name, index: String(i + 1).padStart(2, "0"), src: DRAWN.has(slug) ? undefined : p.image?.src, svgId: p.image && !DRAWN.has(slug) ? undefined : `still-${slug}`, bg: STILL_BG[slug] ?? "#1b1b1b" };
  }).filter((e) => e.name);

  const work = (
    <section className="pp-sub" aria-labelledby="gh-title">
      <h3 id="gh-title" className="pp-h">Recently on GitHub</h3>
      {repos.length > 0 ? (
        <ul className="repo-list">
          {repos.map((r) => (
            <li key={r.name}>
              <a className="repo" href={r.url}>
                <b>{r.name}</b>
                <span className="num">{[r.language, month(r.pushedAt)].filter(Boolean).join(", ")}</span>
                <p>{r.description ?? "No description yet."}</p>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="pp-text">Every repository is on <a href={profile.github}>github.com/{profile.githubUser}</a>.</p>
      )}
    </section>
  );

  const whatIDo = (
    <>
      <h2 className="display pp-name">What I do</h2>
      <p className="pp-sum">Type a problem in English or Spanish. The list filters itself with the same kind of hybrid retrieval I build for clients, in your browser.</p>
      <CommandList />
      <p className="pp-stack">Projects are fixed in scope and quoted after a 30-minute call, in English or Spanish.</p>
    </>
  );

  const about = (
    <>
      <h2 className="display pp-name">About</h2>
      <p className="pp-sum">I build agents in LangChain and LangGraph, and I like the unglamorous part: clean data in, guardrails on, and an agent that refuses what it doesn&apos;t know. I also teach, run events, lead a 70-member IEEE chapter, and compete. We placed first in Colombia at IEEEXtreme 19.0.</p>
      <dl className="pp-facts">
        <div><dt>Based in</dt><dd>{profile.location}, {profile.timezone}</dd></div>
        <div><dt>Studies</dt><dd>{education.degree}, {education.school}</dd></div>
        <div><dt>Graduating</dt><dd>{education.when.replace("Graduating ", "")}</dd></div>
        <div><dt>Languages</dt><dd>{profile.languages}</dd></div>
      </dl>
      <div className="pp-photos">
        {photos.map((ph) => (
          <figure key={ph.src}>
            <img src={ph.src} width={ph.w} height={ph.h} alt={ph.alt} loading="lazy" />
            <figcaption>{ph.caption}</figcaption>
          </figure>
        ))}
      </div>
      <h3 className="pp-h">Roles</h3>
      <ol className="pp-rows">
        {roles.map((r) => (
          <li key={r.title + r.org}><time className="num">{r.when}</time><div><b>{r.title}</b>, {r.org}<p>{r.detail}</p></div></li>
        ))}
      </ol>
      <h3 className="pp-h">Talks and events</h3>
      <ol className="pp-rows">
        {events.map((e) => (
          <li key={e.what}><span>{e.where}</span><div><b>{e.what}</b><p>{e.detail}</p></div></li>
        ))}
      </ol>
      <h3 className="pp-h">Credentials</h3>
      <dl className="creds">
        {credentials.map((c) => [<dt key={c.issuer + "t"}>{c.issuer}</dt>, <dd key={c.issuer + "d"}>{c.items.join("; ")}</dd>])}
      </dl>
    </>
  );

  const contact = (
    <>
      <h2 className="display pp-name">Contact</h2>
      <p className="pp-sum">Got a workflow eating your week, or a role that fits? Send a few lines about it.</p>
      <ul className="rows">
        <li><a href={`mailto:${profile.email}?subject=Hello%20Daniel`}>{profile.email}</a></li>
        <li><a href={profile.linkedin}>LinkedIn</a></li>
        <li><a href={profile.github}>GitHub</a></li>
        <li><span>{profile.location}, {profile.timezone}</span></li>
      </ul>
      <div className="copyline"><CopyEmail email={profile.email} /></div>
    </>
  );

  return (
    <>
      <Shell
        projects={projects}
        exhibits={exhibits}
        intro={{
          title: "AI agents that know what they can't answer",
          lead: "I'm Daniel Diab, a full-stack and AI engineer in Bogotá. Each monitor is a project; pick one.",
          where: "Bogotá, open to work",
        }}
        panels={{ work, "what-i-do": whatIDo, about, contact }}
      />
      {/* Drawings used as monitor screens for projects without screenshots */}
      <div hidden>
        {ROOM.filter((s) => DRAWN.has(s) || !projects.find((p) => p.slug === s)?.image).map((s) => {
          const Still = STILLS[s];
          return Still ? <div key={s} id={`still-${s}`}><Still /></div> : null;
        })}
      </div>
    </>
  );
}
