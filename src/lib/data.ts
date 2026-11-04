export const categories = [
  "Catholic Books",
  "Rosaries & Devotionals",
  "Prayer Cards",
  "Religious Icons & Sacred Art",
  "Religious Statues & Figures",
  "Gifts & Sacramental Items",
];
export const products = [
  {
    slug: "spiritual-reading",
    name: "A companion for quiet reflection",
    category: categories[0],
    author: "Sample author",
    description:
      "A demonstration of our future collection of Catholic spiritual reading. Replace this entry with a verified title and publisher before launch.",
    symbol: "✦",
    tone: "green",
  },
  {
    slug: "wooden-rosary",
    name: "Traditional wooden rosary",
    category: categories[1],
    author: "",
    description:
      "An illustrative devotional item for the demonstration catalog. Materials, dimensions, pricing, and availability await store confirmation.",
    symbol: "✝︎",
    tone: "brown",
  },
  {
    slug: "marian-prayer-card",
    name: "Marian prayer card",
    category: categories[2],
    author: "",
    description:
      "A sample prayer card entry. Actual artwork, prayer text, and product details will be provided by the bookstore.",
    symbol: "✧",
    tone: "gold",
  },
  {
    slug: "sacred-art",
    name: "Sacred art for the home",
    category: categories[3],
    author: "",
    description:
      "A demonstration sacred art listing. Authentic product photography and artist information will replace this illustration.",
    symbol: "✥",
    tone: "brown",
  },
  {
    slug: "devotional-statue",
    name: "A devotional figure",
    category: categories[4],
    author: "",
    description:
      "A sample entry for the future statue collection. No stock or price is implied.",
    symbol: "✦",
    tone: "gold",
  },
  {
    slug: "sacramental-keepsake",
    name: "A meaningful sacramental keepsake",
    category: categories[5],
    author: "",
    description:
      "An editable sample gift entry. Browse this demonstration to explore how the catalog will work.",
    symbol: "✝︎",
    tone: "green",
  },
];
export type Product = (typeof products)[number];
export const store = {
  name: "Veritas Catholic Bookstore",
  address: null,
  phone: null,
  email: null,
  hours: null,
};
