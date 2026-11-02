import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>{profile.name} · {profile.location}</span>
        <span>Built with Next.js, deployed on GitHub Pages. <a href={profile.github}>Source on GitHub</a></span>
      </div>
    </footer>
  );
}
