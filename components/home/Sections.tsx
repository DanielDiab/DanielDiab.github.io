import AgentTrace from "@/components/AgentTrace";
import CommandList from "@/components/CommandList";
import CopyEmail from "@/components/CopyEmail";
import CountUp from "@/components/CountUp";
import CertTabs from "./CertTabs";
import ChapterStory from "./ChapterStory";
import KineticName from "./KineticName";
import Rotator from "./Rotator";
import SkillMap from "./SkillMap";
import { BogotaTime } from "./BogotaTime";
import { chapter, chapterStory, credentials, education, events, headline, photos, profile, projects, roles, skillGroups, toolbox } from "@/lib/content";

// The home page's chapters, in reading order. Each one is a flat field of one colour.

const css = (v: Record<string, string | number>) => v as React.CSSProperties;

/** A heading whose words rise out of a mask when the section scrolls in. */
function Split({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="sw"><span style={css({ "--i": i + delay })}>{w}</span></span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function ChapterHead({ n, label, title, lead, id }: { n: string; label: string; title: string; lead?: React.ReactNode; id: string }) {
  return (
    <header className="chh">
      <p className="chh-n rise"><span className="num">{n}</span><span>{label}</span></p>
      <h2 id={id} className="display chh-t"><Split text={title} /></h2>
      {lead && <p className="chh-lead rise" style={css({ "--i": 3 })}>{lead}</p>}
    </header>
  );
}

/* ---------- 01 intro ---------- */

const HERO_STATS = [
  { v: "1st", s: "in Colombia at IEEEXtreme 19.0" },
  { v: "6", s: "MCP servers authored" },
  { v: "−25%", s: "LLM operating cost for a client" },
  { v: "70+", s: "members in the IEEE chapter I lead" },
];

export function Hero() {
  return (
    <section id="about" className="hero2 field-indigo" data-progress="exit" aria-label="Introduction">
      <div className="h2-top hl" style={css({ "--i": 0 })}>
        <p className="h2-avail"><i aria-hidden="true" />Open to full-time roles and projects</p>
        <p className="h2-role">{headline}</p>
        <p className="h2-where">Bogotá <BogotaTime /></p>
      </div>

      <KineticName first="Daniel" last="Diab" photo="/img/portrait.jpg" />

      <div className="h2-foot">
        <p className="h2-lead hl" style={css({ "--i": 1 })}>
          I build AI agents that <Rotator words={["you can audit.", "check their own answers.", "run on your own devices.", "pass a test before they ship."]} />
        </p>
        <ul className="h2-stats">
          {HERO_STATS.map((s, i) => (
            <li key={s.s} className="hl" style={css({ "--i": i + 2 })}><CountUp value={s.v} className="num" /><span>{s.s}</span></li>
          ))}
        </ul>
      </div>

      <a href="#skills" className="h2-cue hl" style={css({ "--i": 6 })}><span>Scroll to start the tour</span><i aria-hidden="true" /></a>
    </section>
  );
}

/* ---------- 02 skills ---------- */

export function Skills() {
  const cards = projects.map((p) => ({ slug: p.slug, name: p.name, kind: p.kind, period: p.period, image: p.image && !p.image.fit ? { src: p.image.src, w: p.image.w, h: p.image.h } : undefined }));
  const names = skillGroups.flatMap((g) => g.skills.map((s) => s.name));
  const rowA = [...names.slice(0, 15)];
  const rowB = [...names.slice(15), ...toolbox];
  const row = (items: string[]) => [...items, ...items].map((t, i) => <span key={i}>{t}<i aria-hidden="true" /></span>);

  return (
    <section className="ch ch-skills field-ink" aria-labelledby="skills-title" data-reveal>
      <span id="skills" className="anchor" />
      <ChapterHead
        id="skills-title" n="02" label="Skills" title="What I build with"
        lead="Every skill here points to a project you can open. Point at one and watch which projects light up, or point at a project to see what it took."
      />
      <div className="mq" data-progress aria-hidden="true">
        <div className="mq-row mq-a display">{row(rowA)}</div>
        <div className="mq-row mq-b display">{row(rowB)}</div>
      </div>
      <div className="rise"><SkillMap groups={skillGroups} cards={cards} /></div>
      <p className="sm-toolbox rise"><b>Also in the toolbox:</b> {toolbox.join(", ")}.</p>

      <div className="lab">
        <div className="lab-ask rise">
          <h3 className="lab-h">Ask what I do</h3>
          <p className="lab-p">Type a problem in English or Spanish. The list ranks itself with the same hybrid retrieval I build for clients, right in your browser.</p>
          <CommandList />
        </div>
        <div className="lab-trace rise" style={css({ "--i": 1 })}>
          <h3 className="lab-h">Watch an agent run</h3>
          <p className="lab-p">A request moving through the kind of agent I build. The third question is an injection attempt.</p>
          <AgentTrace />
        </div>
      </div>
    </section>
  );
}

/* ---------- 03 community ---------- */

const TEACHING = { src: "/img/teaching.jpg", w: 880, h: 1100, alt: "Daniel teaching an AI workshop in front of a projected Gemini notebook", caption: "Teaching students to work with AI tools in class" };

export function Community() {
  const all = [...photos, TEACHING];
  return (
    <section className="ch ch-community field-brown" aria-labelledby="chapter-title" data-reveal>
      <span id="chapter" className="anchor" />
      <span id="talks" className="anchor" />
      <ChapterHead
        id="chapter-title" n="03" label="Community" title={chapter.name}
        lead={<>{chapter.role}. I lead the student chapter at Universidad de los Andes, where I teach what I build.</>}
      />
      <ul className="cm-stats">
        {chapter.stats.map((s, i) => (
          <li key={s.small} className="rise" style={css({ "--i": i + 2 })}><CountUp value={s.big} className="display num" /><span>{s.small}</span></li>
        ))}
      </ul>
      <ChapterStory steps={chapterStory} photos={all} />
      <div className="cm-events">
        <h3 className="lab-h rise">Talks and events I organized</h3>
        <ol>
          {events.map((e, i) => (
            <li key={e.what} className="rise" style={css({ "--i": i })}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <b>{e.what}</b>
              <em>{e.where}</em>
              <p>{e.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 04 path ---------- */

export function Path() {
  return (
    <section className="ch ch-path field-bone" aria-labelledby="path-title" data-reveal>
      <span id="path" className="anchor" />
      <span id="experience" className="anchor" />
      <ChapterHead id="path-title" n="04" label="Path" title="Experience" lead="Where I've worked, what I studied, and every certification with its ID and a link to verify it." />
      <div className="pa-grid">
        <ol className="tl" data-progress>
          {roles.map((r, i) => (
            <li key={r.title + r.org} className="slide" style={css({ "--i": i })}>
              <time className="num">{r.when}</time>
              <div>
                <b>{r.title}</b>
                <span>{r.org}</span>
                <p>{r.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <aside className="pa-edu rise" style={css({ "--i": 2 })} aria-label="Education">
          <p className="pa-edu-k">Education</p>
          <h3>{education.degree}</h3>
          <p>{education.school}</p>
          <dl>
            <div><dt>When</dt><dd>{education.when}</dd></div>
            <div><dt>Option</dt><dd>{education.detail}</dd></div>
            <div><dt>Languages</dt><dd>{profile.languages}</dd></div>
          </dl>
        </aside>
      </div>
      <div className="pa-certs">
        <span id="certifications" className="anchor" />
        <h3 className="lab-h rise">Certifications</h3>
        <div className="rise" style={css({ "--i": 1 })}><CertTabs groups={credentials} /></div>
      </div>
    </section>
  );
}

/* ---------- 05 work, the way into the room ---------- */

export function WorkBand() {
  const words = Array.from({ length: 6 }, (_, i) => <span key={i}>Selected work<i aria-hidden="true" /></span>);
  return (
    <section className="wb field-gold" data-progress aria-labelledby="wb-title">
      <span id="selected-work" className="anchor" />
      <p className="chh-n"><span className="num">05</span><span>Work</span></p>
      <div className="wb-track display" aria-hidden="true">{words}</div>
      <h2 id="wb-title" className="wb-p">Six projects, each on its own monitor. Pick one to open it.</h2>
    </section>
  );
}

/* ---------- 06 contact ---------- */

export function Closing() {
  return (
    <section className="cl field-indigo" aria-labelledby="hello-title" data-reveal>
      <span id="hello" className="anchor" />
      <p className="chh-n rise"><span className="num">06</span><span>Contact</span></p>
      <h2 id="hello-title" className="display cl-title"><Split text="Got a workflow eating your week?" /></h2>
      <p className="cl-lead rise" style={css({ "--i": 4 })}>Or a role that fits? Send a few lines. I answer in English or Spanish.</p>
      <a className="cl-mail rise" style={css({ "--i": 5 })} href={`mailto:${profile.email}?subject=Hello%20Daniel`} data-cursor="Write">
        <span>{profile.email}</span>
        <span className="round" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.6" /></svg></span>
      </a>
      <div className="cl-row rise" style={css({ "--i": 6 })}>
        <CopyEmail email={profile.email} />
        <a className="btn btn-light" href={profile.linkedin}>LinkedIn</a>
        <a className="btn btn-light" href={profile.github}>GitHub</a>
      </div>
      <footer className="cl-foot">
        <span>{profile.fullName}, {profile.location}. <BogotaTime /> here now.</span>
        <span>Built with Next.js and Three.js. <a href={`${profile.github}/DanielDiab.github.io`}>Source</a></span>
        <a href="#about" className="cl-top">Back to the top</a>
      </footer>
    </section>
  );
}
