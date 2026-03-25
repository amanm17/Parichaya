# Parichaya

Parichaya is a polished MVP for a collaborative family graph. It includes:

- interactive graph view
- Root / Bark / Branch / Leaf semantics
- Angel Bloom and Honorary overlays
- member profile pages
- friendly updates feed
- add-member flow
- trace relation panel
- sample Supabase schema and seed data

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Then add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. Create your Supabase database

In Supabase SQL Editor:

1. run `supabase/schema.sql`
2. then run `supabase/seed.sql`

## 4. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## 5. Deploy to Cloudflare Pages

1. Push this folder to GitHub.
2. In Cloudflare Pages, connect the GitHub repository.
3. Use the default Next.js preset.
4. Add the two environment variables from `.env.local`.
5. Deploy.

## Notes

- Without Supabase configured, the app falls back to sample in-memory data so you can still preview the UI.
- The add-member page saves records only when Supabase is configured.
- The trace engine in this MVP highlights the most direct known path. Alternate near-direct traces can be added later.
