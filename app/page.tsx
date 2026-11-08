import Shell from "@/components/Shell";
import { Closing, Community, Hero, Path, Skills, WorkBand } from "@/components/home/Sections";
import SiteHeader from "@/components/fx/SiteHeader";
import Loader from "@/components/fx/Loader";
import CommandList from "@/components/CommandList";
import CopyEmail from "@/components/CopyEmail";
import { STILLS, STILL_BG } from "@/components/Stills";
import type { Exhibit } from "@/components/Exhibition";
import { profile, projects } from "@/lib/content";
import { getRepos } from "@/lib/github";

// Which plinth each project stands on: three tall ones at the back, two in front.
const ROOM = ["chromatic", "kith", "charter", "stochastic", "paco"];
// Terminal screenshots read as blank at monitor size, so Charter shows its drawing on the screen.
const DRAWN = new Set(["charter"]);
// A 4:3 picture fills a monitor; Kith's confirmation screen is exactly that shape.
const SCREEN: Record<string, string> = { kith: "/img/kith-held.png" };

const month = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

export default async function Home() {
  const repos = await getRepos(6);

  const exhibits: Exhibit[] = ROOM.map((slug) => {
    const i = projects.findIndex((p) => p.slug === slug);
    const p = projects[i];
    return { slug, name: p.name, index: String(i + 1).padStart(2, "0"), src: DRAWN.has(slug) ? undefined : SCREEN[slug] ?? p.image?.src, svgId: p.image && !DRAWN.has(slug) ? undefined : `still-${slug}`, bg: STILL_BG[slug] ?? "#1b1b1b" };
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
      <CommandList uid="pcmd" hotkey={false} />
      <p className="pp-stack">Projects are fixed in scope and quoted after a 30-minute call, in English or Spanish.</p>
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
      <Loader />
      <SiteHeader email={profile.email} />
      <Hero />
      <Skills />
      <Community />
      <Path />
      <WorkBand />
      <Shell
        projects={projects}
        exhibits={exhibits}
        intro={{
          title: "The work, on display",
          lead: "Five projects, one per monitor. Pick one to open it, or use Work below for the list.",
          where: "Bogotá, open to work",
        }}
        panels={{ work, "what-i-do": whatIDo, contact }}
      />
      <Closing />
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
