import { Catalog } from "@/components/catalog";
export const metadata = { title: "Catalog" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const p = await searchParams;
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">BOOKS & TREASURES FOR THE JOURNEY</p>
        <h1>Our collection</h1>
        <p>
          Discover something to inspire your faith, enrich your home, or share
          with someone you love.
        </p>
      </div>
      <section className="section">
        <p className="notice">
          Demonstration catalog · Illustrations and sample listings await real
          inventory. No purchases are enabled.
        </p>
        <Catalog initialCategory={p.category || ""} />
      </section>
    </>
  );
}
