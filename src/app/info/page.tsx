import Link from "next/link";
export const metadata = { title: "Info & Location" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>;
}) {
  const { item } = await searchParams;
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">A WARM WELCOME AWAITS</p>
        <h1>Visit Veritas</h1>
        <p>We look forward to helping you find something meaningful.</p>
      </div>
      <section className="section two-column">
        <div>
          <h2>Store information</h2>
          <dl className="store-details">
            {[
              "Address",
              "Business hours",
              "Phone",
              "Email",
              "Holiday hours",
            ].map((x) => (
              <div key={x}>
                <dt>{x}</dt>
                <dd>Awaiting store confirmation</dd>
              </div>
            ))}
          </dl>
          <div className="map-placeholder">
            <span>⌖</span>
            <p>
              Our location will appear here
              <br />
              once the store address is confirmed.
            </p>
          </div>
        </div>
        <div>
          <h2>{item ? "Product inquiry" : "Get in touch"}</h2>
          {item && <p className="notice">You’re asking about: {item}</p>}
          <p>
            Our online contact form will open when the bookstore’s contact
            details and email service are configured.
          </p>
          <p>No messages are being collected in this preview.</p>
          <Link href="/catalog" className="button primary">
            Continue exploring
          </Link>
          <h3 className="spaced">Frequently asked questions</h3>
          {[
            [
              "How do I check whether an item is in stock?",
              "The catalog currently contains demonstration items. Verified stock details and a contact method will be added before launch.",
            ],
            [
              "Will sacramental gifts be available?",
              "Our planned collections include sacramental gifts. The store will confirm its actual selection.",
            ],
            [
              "How can I learn about events?",
              "Visit the events calendar for confirmed announcements. Newsletter registration will open once email delivery is configured.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
          <small>Preview FAQ copy awaits store approval.</small>
        </div>
      </section>
    </>
  );
}
