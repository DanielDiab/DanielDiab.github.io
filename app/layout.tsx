import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AskPalette from "@/components/AskPalette";
import { bootScript } from "@/lib/theme";
import { profile } from "@/lib/content";

const title = `${profile.name} · AI & automation engineer`;
const description = "I build retrieval, automation and agent systems that hold up with real users. Based in Bogotá, Colombia.";

export const metadata: Metadata = {
  metadataBase: new URL("https://danieldiab.github.io"),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  openGraph: { title, description, url: "https://danieldiab.github.io", siteName: profile.name, type: "website" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#14141f" },
  ],
};

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
        <AskPalette />
      </body>
    </html>
  );
}
