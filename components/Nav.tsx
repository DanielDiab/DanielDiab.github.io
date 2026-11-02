import Link from "next/link";
import ThemeControls from "./ThemeControls";
import { AskButton } from "./AskPalette";
import { profile } from "@/lib/content";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link href="/" className="brand"><span className="brand-mark" aria-hidden="true" />{profile.name}</Link>
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
