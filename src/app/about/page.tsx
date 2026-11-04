import Link from "next/link";
export const metadata = { title: "About Us" };
export default function Page() {
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">FAITH, FOUND IN THE EVERYDAY</p>
        <h1>A place for faith to grow</h1>
        <p>
          Catholic books, sacred gifts, and the simple joy of discovering
          something meaningful.
        </p>
      </div>
      <section className="section narrow prose">
        <p className="notice">
          The following is proposed introductory copy. Store history, mission,
          and community details await owner approval.
        </p>
        <h2>Our story</h2>
        <p>
          Every bookstore has a story. This space is reserved for the real
          people, beginnings, and experiences behind Veritas Catholic Bookstore.
        </p>
        <div className="quote">
          “Faith is nurtured through learning, prayer, and community.”
          <small>PROPOSED WELCOME MESSAGE</small>
        </div>
        <h2>Our mission</h2>
        <p>
          Our proposed vision is a welcoming place to discover Catholic
          literature and thoughtful devotional gifts. The bookstore’s official
          mission will be shared here once approved.
        </p>
        <h2>Our community</h2>
        <p>
          We look forward to sharing the bookstore’s relationships with local
          families, parishes, schools, and visitors—with accurate stories and
          permission.
        </p>
        <Link href="/info" className="button primary">
          Visit Veritas
        </Link>
      </section>
    </>
  );
}
