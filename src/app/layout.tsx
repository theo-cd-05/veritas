import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/site";
export const metadata: Metadata = {
  title: {
    default: "Veritas Catholic Bookstore | A place for faith to grow",
    template: "%s | Veritas Catholic Bookstore",
  },
  description:
    "Discover Catholic books, devotional gifts, and community at Veritas Catholic Bookstore. Demonstration website.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
