import Link from "next/link";
import Nav from "@/components/Nav";

export default function NotFound() {
  return (
    <>
    <Nav />
    <section className="case-hero field-indigo" style={{ minHeight: "80svh" }}>
      <h1 className="display">Not in the corpus</h1>
      <div className="case-sub">
        <p>There is no page at this address, and I won&apos;t make one up. The work is one click away.</p>
        <div><Link href="/#work" className="btn btn-ink">See the work</Link></div>
      </div>
    </section>
    </>
  );
}
