import Link from "next/link";
import { ArrowRight, BookOpen, Heart, MapPin, Sparkles } from "lucide-react";
import { categories, products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Newsletter } from "@/components/site";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-art" aria-hidden="true">
          <div className="arch">
            <span>✦</span>
            <div className="shelf">
              {Array.from({ length: 21 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    height: `${100 + ((i * 37) % 110)}px`,
                    background: ["#72523b", "#344435", "#937447", "#573e31"][
                      i % 4
                    ],
                  }}
                />
              ))}
            </div>
            <div className="shelf lower">
              {Array.from({ length: 24 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    height: `${100 + ((i * 23) % 90)}px`,
                    background: ["#344435", "#7f6141", "#4f372b"][i % 3],
                  }}
                />
              ))}
            </div>
          </div>
          <small>Illustrative bookstore setting · Photography to come</small>
        </div>
        <div className="hero-copy">
          <p className="eyebrow light">FAITH. TRADITION. COMMUNITY.</p>
          <h1>
            Welcome to Veritas
            <br />
            <em>Catholic Bookstore</em>
          </h1>
          <div className="gold-line" />
          <p>
            A place to discover the beauty of the Catholic faith through books,
            sacred gifts, and timeless treasures.
          </p>
          <div className="actions">
            <Link href="/catalog" className="button gold">
              Explore Our Catalog <ArrowRight size={17} />
            </Link>
            <Link href="/info" className="button outline-light">
              Visit Our Store
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          A PLACE FOR FAITH TO GROW <span>✦</span> SOMETHING MEANINGFUL FOR
          EVERY SEASON
        </div>
      </section>
      <div className="values">
        <span>
          <BookOpen size={19} /> Timeless Catholic literature
        </span>
        <span>
          <Heart size={19} /> Gifts with meaning
        </span>
        <span>
          <Sparkles size={19} /> Rooted in faith & tradition
        </span>
      </div>
      <section className="welcome section">
        <div className="ornament">✦</div>
        <p className="eyebrow">MORE THAN A BOOKSTORE</p>
        <h2>
          Good books. Sacred treasures.
          <br />
          <em>A warm welcome.</em>
        </h2>
        <p>
          At Veritas Catholic Bookstore, we believe that faith is nurtured
          through learning, prayer, and community. Whether you’re searching for
          a meaningful gift, an inspiring book, or a beautiful devotional item,
          we invite you to explore our collection and discover something
          special.
        </p>
        <Link className="text-link" href="/about">
          Get to know Veritas <ArrowRight size={16} />
        </Link>
      </section>
      <section className="section category-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIND SOMETHING MEANINGFUL</p>
            <h2>Explore our collections</h2>
          </div>
          <Link href="/catalog" className="text-link">
            Browse the catalog <ArrowRight size={17} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((c, i) => (
            <Link
              href={`/catalog?category=${encodeURIComponent(c)}`}
              className={`category category-${i}`}
              key={c}
            >
              <span className="category-symbol">
                {["✦", "✝︎", "✧", "✥", "✦", "✝︎"][i]}
              </span>
              <small>ILLUSTRATIVE COLLECTION</small>
              <div>
                <h3>{c}</h3>
                <ArrowRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THOUGHTFULLY CHOSEN, FAITHFULLY INSPIRED</p>
            <h2>A glimpse of the collection</h2>
          </div>
          <Link className="text-link" href="/catalog">
            View all products <ArrowRight size={17} />
          </Link>
        </div>
        <p className="notice">
          Preview collection: these editable examples are demonstration content,
          not confirmed inventory.
        </p>
        <div className="product-grid">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <section className="community section">
        <div>
          <p className="eyebrow">GATHER. LEARN. GROW.</p>
          <h2>Faith brings us together.</h2>
          <p>
            There’s a place for you here. Discover future author visits,
            thoughtful conversations, and moments of community.
          </p>
          <Link href="/events" className="button primary">
            View Full Calendar <ArrowRight size={17} />
          </Link>
        </div>
        <div className="empty-card">
          <span className="ornament">✦</span>
          <h3>Good things are on the horizon</h3>
          <p>
            No confirmed events have been published yet.
            <br />
            Check back for our upcoming gatherings.
          </p>
        </div>
      </section>
      <Newsletter />
      <section className="visit section">
        <MapPin size={30} strokeWidth={1} />
        <h2>We look forward to welcoming you.</h2>
        <p>
          Our address, opening hours, and contact details will be shared here
          once confirmed.
        </p>
        <Link className="text-link" href="/info">
          Plan your visit <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
