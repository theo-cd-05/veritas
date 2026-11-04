import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/data";
import { ProductArt, ProductCard } from "@/components/product-card";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <section className="section">
      <Link href="/catalog" className="text-link">
        ← Back to the collection
      </Link>
      <div className="detail">
        <ProductArt product={p} />
        <div>
          <p className="eyebrow">{p.category}</p>
          <h1>{p.name}</h1>
          <p>{p.description}</p>
          <p className="notice">
            Demonstration item. Price and availability are not confirmed.
          </p>
          <Link
            href={`/info?item=${encodeURIComponent(p.name)}`}
            className="button primary"
          >
            Contact Store About This Item
          </Link>
        </div>
      </div>
      <h2>You may also enjoy</h2>
      <div className="product-grid">
        {products
          .filter((x) => x.slug !== slug)
          .slice(0, 3)
          .map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
      </div>
    </section>
  );
}
