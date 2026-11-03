import type { Metadata, Viewport } from "next";
import "@fontsource-variable/tiktok-sans/standard.css";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { bootScript } from "@/lib/theme";
import { profile } from "@/lib/content";

const title = `${profile.name}, AI and automation engineer`;
const description = "I build AI agents that know what they can't answer, and automations that pay for themselves. Bogotá, Colombia.";

export const metadata: Metadata = {
  metadataBase: new URL("https://danieldiab.github.io"),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  openGraph: { title, description, url: "https://danieldiab.github.io", siteName: profile.name, type: "website" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = { themeColor: "#2d4351" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
