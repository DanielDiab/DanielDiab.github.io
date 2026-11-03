import Link from "next/link";
import { profile } from "@/lib/content";

// A plain bar: two links, the wordmark centred, two links and the action.
export default function Nav() {
  return (
    <header className="bar">
      <nav className="bar-left" aria-label="Sections">
        <Link href="/#work" className="ulink">Work</Link>
        <Link href="/#what-i-do" className="ulink">What I do</Link>
      </nav>
      <Link href="/" className="wordmark">{profile.name}</Link>
      <nav className="bar-right" aria-label="More">
        <Link href="/#about" className="ulink">About</Link>
        <Link href="/#contact" className="ulink bar-cta">Contact</Link>
      </nav>
    </header>
  );
}
