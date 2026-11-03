import Link from "next/link";
import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="field-indigo">
      <Link href="/" className="closing display" aria-label="Go to the home page">{profile.name}</Link>
      <div className="foot-row">
        <span>{profile.fullName}, {profile.location}</span>
        <span>Built with Next.js, deployed on GitHub Pages. <a href={profile.github}>Source on GitHub</a></span>
      </div>
    </footer>
  );
}
