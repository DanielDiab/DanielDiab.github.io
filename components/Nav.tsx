import Link from "next/link";
import ThemeControls from "./ThemeControls";
import { AskButton } from "./AskPalette";
import { profile } from "@/lib/content";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link href="/" className="brand">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="6" /><path d="M12 1v5M12 18v5M1 12h5M18 12h5" /></svg>
          {profile.name}
        </Link>
        <nav className="nav-links" aria-label="Sections">
          <Link href="/#work">Work</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#github">GitHub</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className="nav-tools">
          <AskButton />
          <ThemeControls />
        </div>
      </div>
    </header>
  );
}
