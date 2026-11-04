"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ArrowRight, BookOpen } from "lucide-react";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="announcement">
        Books to nourish the mind. Treasures to nurture the soul.
      </div>
      <header>
        <Link
          href="/"
          className="brand"
          aria-label="Veritas Catholic Bookstore home"
        >
          <BookOpen size={33} strokeWidth={1} />
          <span>
            VERITAS<small>CATHOLIC BOOKSTORE</small>
          </span>
        </Link>
        <button
          className="mobile-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "open" : ""} aria-label="Main navigation">
          {[
            ["/", "Home"],
            ["/catalog", "Catalog"],
            ["/events", "Events"],
            ["/info", "Info & Location"],
            ["/about", "About Us"],
          ].map(([url, name]) => (
            <Link key={url} href={url} onClick={() => setOpen(false)}>
              {name}
            </Link>
          ))}
          <Link href="/catalog" aria-label="Search catalog">
            <Search size={19} />
          </Link>
          <Link
            href="/#newsletter"
            className="nav-join"
            onClick={() => setOpen(false)}
          >
            Stay connected <ArrowRight size={15} />
          </Link>
        </nav>
      </header>
    </>
  );
}
export function Newsletter() {
  return (
    <section className="newsletter" id="newsletter">
      <div>
        <p className="eyebrow">A LITTLE INSPIRATION, DELIVERED</p>
        <h2>Stay Connected with Veritas</h2>
        <p>
          New arrivals, upcoming events, and inspiration from our Catholic
          community.
        </p>
      </div>
      <div className="signup-note">
        <BookOpen size={28} />
        <p>Our newsletter is coming soon.</p>
        <small>
          Subscription will open when our email service is configured. No email
          addresses are collected in this preview.
        </small>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            Veritas
          </Link>
          <p>
            Catholic books, sacred gifts,
            <br />
            and timeless treasures.
          </p>
          <small>A place for faith to grow.</small>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/catalog">Our catalog</Link>
          <Link href="/events">Events & gatherings</Link>
          <Link href="/about">Our story</Link>
          <Link href="/rewards">Veritas Rewards</Link>
        </div>
        <div>
          <h3>Plan your visit</h3>
          <p>Address & hours coming soon.</p>
          <Link href="/info">
            Store information <ArrowRight size={14} />
          </Link>
          <p>Contact details await store confirmation.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Veritas Catholic Bookstore</span>
        <span>Demonstration website · Store content pending approval</span>
      </div>
    </footer>
  );
}
