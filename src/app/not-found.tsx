import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section narrow empty-card">
      <h1>A page yet to be written</h1>
      <p>We couldn’t find what you’re looking for.</p>
      <Link className="button primary" href="/">
        Return home
      </Link>
    </section>
  );
}
