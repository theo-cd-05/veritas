"use client";
import { useState } from "react";
import { categories, products } from "@/lib/data";
import { ProductCard } from "./product-card";
export function Catalog({ initialCategory }: { initialCategory: string }) {
  const [category, setCategory] = useState(initialCategory),
    [query, setQuery] = useState(""),
    [sort, setSort] = useState("az");
  const filtered = products
    .filter(
      (p) =>
        (!category || p.category === category) &&
        `${p.name} ${p.description} ${p.author}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "za"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name),
    );
  return (
    <div className="catalog-layout">
      <aside>
        <h2>Collections</h2>
        <fieldset>
          <legend className="sr-only">Filter by collection</legend>
          {["", ...categories].map((c) => (
            <label key={c}>
              <input
                type="radio"
                name="category"
                checked={category === c}
                onChange={() => setCategory(c)}
              />
              {c || "All collections"}
            </label>
          ))}
        </fieldset>
        <p className="muted">
          Price and availability filters will become available when verified
          inventory is added.
        </p>
      </aside>
      <div>
        <div className="catalog-tools">
          <label>
            Search the collection
            <input
              type="search"
              placeholder="Search books, gifts, authors…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label>
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="az">Name: A–Z</option>
              <option value="za">Name: Z–A</option>
            </select>
          </label>
        </div>
        <p aria-live="polite" className="muted">
          {filtered.length} demonstration{" "}
          {filtered.length === 1 ? "item" : "items"}
        </p>
        <div className="product-grid catalog-products">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        {!filtered.length && (
          <div className="empty-card">
            <h2>No items found</h2>
            <p>Try a different search or collection.</p>
            <button
              className="button primary"
              onClick={() => {
                setQuery("");
                setCategory("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
