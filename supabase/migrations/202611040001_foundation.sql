-- Foundation only. Apply to a development Supabase project and review before production.
begin;
create table public.staff_profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 role text not null check (role in ('admin','editor')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create function public.is_staff() returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.staff_profiles where id = auth.uid() and role in ('admin','editor'));
$$;
create table public.categories (
 id uuid primary key default gen_random_uuid(), parent_id uuid references public.categories(id),
 name text not null check(length(trim(name)) > 0), slug text unique not null,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), check(parent_id is distinct from id)
);
create table public.products (
 id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null,
 description text not null default '', author text, publisher text, attributes jsonb not null default '{}',
 price_cents integer check(price_cents >= 0), currency text not null default 'USD' check(currency ~ '^[A-Z]{3}$'),
 availability text check(availability in ('in_stock','out_of_stock','special_order')),
 featured boolean not null default false, published boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.product_categories (
 product_id uuid references public.products(id) on delete cascade,
 category_id uuid references public.categories(id) on delete cascade, primary key(product_id,category_id)
);
create table public.product_images (
 id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id) on delete cascade,
 storage_path text not null, alt_text text not null, sort_order integer not null default 0,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.events (
 id uuid primary key default gen_random_uuid(), title text not null, description text not null default '',
 starts_at timestamptz not null, ends_at timestamptz not null, timezone text not null,
 location text not null, image_path text, registration_url text,
 featured boolean not null default false, published boolean not null default false, cancelled boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), check(ends_at > starts_at)
);
create table public.store_settings (
 id uuid primary key default gen_random_uuid(), key text unique not null, value jsonb not null,
 published boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.homepage_content (
 id uuid primary key default gen_random_uuid(), section text unique not null, content jsonb not null,
 published boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.newsletter_subscribers (
 id uuid primary key default gen_random_uuid(), email text unique not null, first_name text,
 status text not null default 'pending' check(status in ('pending','confirmed','unsubscribed')),
 consent_text text not null, consent_at timestamptz not null, confirmed_at timestamptz,
 preferences jsonb not null default '{}',
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.contact_inquiries (
 id uuid primary key default gen_random_uuid(), name text not null, email text not null, subject text not null,
 message text not null, product_id uuid references public.products(id) on delete set null,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.loyalty_accounts (
 id uuid primary key default gen_random_uuid(), user_id uuid unique not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.loyalty_reward_rules (
 id uuid primary key default gen_random_uuid(), name text not null, configuration jsonb not null,
 enabled boolean not null default false check(enabled = false),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.loyalty_transactions (
 id uuid primary key default gen_random_uuid(), account_id uuid not null references public.loyalty_accounts(id),
 points integer not null check(points <> 0), reason text not null, actor_id uuid not null references auth.users(id),
 created_at timestamptz not null default now()
);
create index products_published_idx on public.products(published,created_at desc);
create index events_start_idx on public.events(starts_at) where published;
create index product_categories_category_idx on public.product_categories(category_id);
create index product_images_product_idx on public.product_images(product_id);
create index loyalty_transactions_account_idx on public.loyalty_transactions(account_id);
create index categories_parent_idx on public.categories(parent_id);
create index products_search_idx on public.products using gin(to_tsvector('english',name || ' ' || description || ' ' || coalesce(author,'')));
create function public.set_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
do $$ declare t text; begin
 foreach t in array array['staff_profiles','categories','products','product_images','events','store_settings','homepage_content','newsletter_subscribers','contact_inquiries','loyalty_accounts','loyalty_reward_rules'] loop
 execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',t);
 end loop;
 foreach t in array array['staff_profiles','categories','products','product_categories','product_images','events','store_settings','homepage_content','newsletter_subscribers','contact_inquiries','loyalty_accounts','loyalty_transactions','loyalty_reward_rules'] loop
 execute format('alter table public.%I enable row level security',t);
 -- Explicitly remove broad platform defaults before granting least privileges.
 execute format('revoke all on public.%I from anon, authenticated',t);
 end loop;
 foreach t in array array['categories','products','product_images','events','store_settings','homepage_content','product_categories'] loop
 execute format('grant select on public.%I to anon, authenticated',t);
 execute format('grant insert, update, delete on public.%I to authenticated',t);
 execute format('create policy staff_manage on public.%I for all to authenticated using (public.is_staff()) with check (public.is_staff())',t);
 end loop;
end $$;
create policy published_products on public.products for select using(published);
create policy public_categories on public.categories for select using(true);
create policy published_images on public.product_images for select using(exists(select 1 from public.products p where p.id=product_id and p.published));
create policy published_categories on public.product_categories for select using(exists(select 1 from public.products p where p.id=product_id and p.published));
create policy published_events on public.events for select using(published);
create policy published_settings on public.store_settings for select using(published);
create policy published_homepage on public.homepage_content for select using(published);
grant select on public.staff_profiles to authenticated;
create policy own_staff_profile on public.staff_profiles for select to authenticated using(id=auth.uid());
grant select on public.loyalty_accounts, public.loyalty_transactions to authenticated;
create policy own_loyalty_account on public.loyalty_accounts for select to authenticated using(user_id=auth.uid());
create policy own_transactions on public.loyalty_transactions for select to authenticated using(exists(select 1 from public.loyalty_accounts a where a.id=account_id and a.user_id=auth.uid()));
-- No client writes to subscriptions, contact inquiries, staff roles, or loyalty ledgers.
-- Future validated server endpoints must enforce consent, abuse controls, and authorization.
insert into storage.buckets(id,name,public) values ('catalog','catalog',true) on conflict(id) do nothing;
create policy public_catalog_images on storage.objects for select using(bucket_id='catalog');
create policy staff_catalog_upload on storage.objects for insert to authenticated with check(bucket_id='catalog' and public.is_staff());
create policy staff_catalog_update on storage.objects for update to authenticated using(bucket_id='catalog' and public.is_staff()) with check(bucket_id='catalog' and public.is_staff());
create policy staff_catalog_delete on storage.objects for delete to authenticated using(bucket_id='catalog' and public.is_staff());
commit;
