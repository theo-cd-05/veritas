import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/data";
export function ProductArt({ product }: { product: Product }) {
  return (
    <div
      className={`product-art ${product.tone}`}
      role="img"
      aria-label={`Placeholder illustration for ${product.name}`}
    >
      <div className="book-spine" />
      <span>{product.symbol}</span>
      <small>VERITAS COLLECTION</small>
      <em>Illustrative placeholder</em>
    </div>
  );
}
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/catalog/${product.slug}`}>
        <ProductArt product={product} />
        <p className="eyebrow">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="muted">Demonstration item · Price & stock unconfirmed</p>
        <span className="text-link">
          View details <ArrowUpRight size={16} />
        </span>
      </Link>
    </article>
  );
}
