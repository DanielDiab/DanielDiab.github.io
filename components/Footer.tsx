import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="field-indigo">
      <p className="closing display" aria-hidden="true">{profile.name}</p>
      <div className="foot-row">
        <span>{profile.fullName}, {profile.location}</span>
        <span>Built with Next.js, deployed on GitHub Pages. <a href={profile.github}>Source on GitHub</a></span>
      </div>
    </footer>
  );
}
