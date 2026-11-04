# Veritas Catholic Bookstore

A working first frontend built with Next.js App Router, TypeScript, React, Tailwind CSS, and Lucide. The warm cream, walnut, forest, and antique gold palette is centralized in `src/app/globals.css`.

## Local development

Use Node.js 24 LTS and npm. From the checkout:

```sh
npm ci
npm run dev
```

The development server runs on port 3000. No credentials or external services are required for the demonstration frontend.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Run typecheck after the first build to include generated Next.js route types. An environment template is provided in `.env.example`; copy to `.env.local` only when connecting services. Never commit secrets.

## Implemented first iteration

- Responsive home, catalog, product details, events, store information, about, and rewards pages.
- Mobile navigation, catalog text search across title/description/author, category filters, alphabetical sorting, and empty results.
- Interactive local monthly calendar with correct boundaries, date selection, and empty event state.
- CSS illustrations labeled as placeholders; demonstration items have no invented pricing or availability.
- Newsletter, contact delivery, staff authentication, loyalty enrollment, and checkout are explicitly inactive. No personal data is collected.
- Semantic navigation, focus indicators, skip link, reduced motion support, page metadata, loading and error states.

The UI currently uses Georgia and system sans-serif fonts for offline reproducibility. Replace them with locally licensed Cormorant Garamond and Inter files when supplied. Authentic store photography should replace CSS illustrations.

## Architecture

```
src/app/              App Router pages and shared layout
src/components/       Navigation, footer, catalog, product cards, calendar
src/lib/data.ts       Typed demonstration products and category configuration
src/lib/supabase/     Server Supabase client factory (not used by preview)
supabase/migrations/  PostgreSQL and storage security foundation
```

## Supabase: next phase

Create a development Supabase project, configure its URL and publishable key, then apply the migration through Supabase CLI (`supabase link --project-ref YOUR_REF`, then `supabase db push`). Review the target before applying. The migration has not been applied or integration-tested by this frontend setup.

The migration covers products, images, category hierarchy, events, settings, homepage content, staff profiles, subscribers, inquiries, and loyalty foundations. Public reads expose published content only. Staff content management uses database staff membership and RLS; users cannot assign their own role. Provision the first staff profile through a trusted database administrator. Customer data has no anonymous access. Loyalty rules are constrained to disabled, and the ledger has no client write grants. Public storage is intended only for approved public imagery; do not upload private customer or unpublished sensitive content to that bucket.

Before replacing demonstration data, add typed database queries and server-side validation. Build authenticated staff CRUD with session refresh, server authorization on every action, and tested RLS policies. The `/admin` route currently shows a closed access page; it is not a finished dashboard. Proposed modules: overview, products/categories/images, events, subscriber campaigns, store content, loyalty settings. Add recurring events only after time zone and recurrence semantics are defined.

Contact and newsletter endpoints need validation, rate limits, bot protection, consent records, verified sender configuration, double opt-in, opaque expiring tokens, preference management and unsubscribe handling before activation. Never report delivery success until the provider accepts the request. Store provider keys only server-side. No service-role key is required for the demo.

## Replace demonstration content

1. Replace `src/lib/data.ts` with verified products, approved categories/subcategories, authentic photography, and database queries.
2. Confirm address, hours, holiday closures, phone, email, social accounts, and IANA store time zone. Add directions/map only after location confirmation.
3. Have the owner approve About, FAQ, mission, and homepage copy. No store history or affiliations are asserted.
4. Add confirmed events with `timestamptz` instants and explicit store time zone; replace the empty calendar with event queries and detail views.
5. Enable email and loyalty only after their integrations, privacy notices, and business rules are approved.
6. Review accessibility, real images/alt text, metadata, and mobile layout before public launch.

## Vercel deployment

Import this GitHub repository into Vercel and select the Next.js preset (root directory is the repository root). Build command: `npm run build`. Set Node.js 24.x. Add environment variables for the intended deployment and redeploy after changes. The frontend runs without Supabase values until integration is implemented. Set `NEXT_PUBLIC_SITE_URL` to the real verified domain. Keep preview deployments out of search indexes; add a production sitemap and canonical/robots configuration when the domain and approved public pages are known.

No deployment, live email, database provisioning, payment integration, or repository push is performed by this setup. Future commerce should be a separate phase: approved pricing/inventory, policies, test-mode payments, orders, fulfillment, tax, and refunds before any live checkout.
