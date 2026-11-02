// Fetches public repos at build time (the GitHub Action rebuilds the site on every push).
// If the API is unreachable the section falls back to a link to the profile.

import { profile } from "./content";

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  pushedAt: string;
  stars: number;
};

// Coursework repos (talleres, labs, parciales) stay off the portfolio. Edit freely.
const HIDE = /^(taller|lab|parcial|practica|prueba|caso|dpo|isis|ia_|aprendizaje)|\.github\.io$/i;

export async function getRepos(limit = 6): Promise<Repo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=100`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "danieldiab-portfolio" },
      cache: "force-cache",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{
      name: string; description: string | null; language: string | null; html_url: string;
      pushed_at: string; stargazers_count: number; fork: boolean; archived: boolean;
    }>;
    return data
      .filter((r) => !r.fork && !r.archived && !HIDE.test(r.name) && r.name.toLowerCase() !== profile.githubUser.toLowerCase())
      .slice(0, limit)
      .map((r) => ({ name: r.name, description: r.description, language: r.language, url: r.html_url, pushedAt: r.pushed_at, stars: r.stargazers_count }));
  } catch {
    return [];
  }
}
