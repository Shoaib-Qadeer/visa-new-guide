# Comskills - Visa Guide

A Next.js 15 app that guides students through the student-visa process, with:

- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS**
- **Supabase** (Postgres + Auth) with **Google OAuth** sign-in
- **Row-Level Security** so every user only sees their own data
- Per-user **access expiry** (default: **2026-08-15 23:59:59 UTC**) with a live countdown clock on the dashboard
- Ready to deploy on **Vercel**

---

## 1. Prerequisites

- Node.js **18.18+** (Node 20 LTS recommended)
- A free **Supabase** project: https://supabase.com
- A **Google Cloud** project (for OAuth credentials)
- A **Vercel** account (for deployment)

---

## 2. Local setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in your values (see steps 3–4 below)
cp .env.local.example .env.local

# 3. Run the dev server
npm run dev
```

App runs at http://localhost:3000.

---

## 3. Supabase setup (free tier)

1. Go to https://supabase.com → **New Project**. Pick the **Free** plan, choose a region close to you, and set a strong database password.
2. Wait for the project to finish provisioning.
3. In the project sidebar, open **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](./supabase/schema.sql), and click **Run**.
   - This creates `public.profiles` and `public.checklist_progress`, enables RLS, and installs a trigger that auto-creates a profile row on every new sign-up with `access_expires_at = 2026-08-15 23:59:59 UTC`.
4. Open **Project Settings → API**. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys → `anon` public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Paste both into `.env.local`.

---

## 4. Google OAuth setup

### 4a. Create Google OAuth credentials

1. Open https://console.cloud.google.com/ → create or pick a project.
2. **APIs & Services → OAuth consent screen**: configure as **External**, add your email as a test user. Scopes can be left at defaults (email, profile).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**.
   - **Application type:** Web application
   - **Authorized JavaScript origins:**
     - `http://localhost:3000`
     - `https://YOUR-VERCEL-DOMAIN.vercel.app` (add later, once you deploy)
   - **Authorized redirect URIs** — this is the Supabase callback, **not your app**:
     - `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
4. Copy the generated **Client ID** and **Client Secret**.

### 4b. Enable Google in Supabase

1. Supabase Dashboard → **Authentication → Providers → Google**.
2. Toggle **Enable**, paste the **Client ID** and **Client Secret**, click **Save**.
3. Under **Authentication → URL Configuration**:
   - **Site URL:** `https://YOUR-VERCEL-DOMAIN.vercel.app` (use `http://localhost:3000` while developing)
   - **Redirect URLs** (add both):
     - `http://localhost:3000/auth/callback`
     - `https://YOUR-VERCEL-DOMAIN.vercel.app/auth/callback`

That's it — the app's `/auth/callback` route exchanges the OAuth code for a Supabase session and drops the user on `/dashboard`.

---

## 5. Environment variables

Create `.env.local` from `.env.local.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY

# Optional: only needed locally. Leave unset in production.
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

On Vercel, set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://visa-guide.vercel.app`) so OAuth redirects work correctly.

---

## 6. Deploy to Vercel

1. Push this repo to GitHub.
2. https://vercel.com/new → **Import** the repo.
3. Framework preset: **Next.js** (auto-detected). Build command and output can stay default.
4. **Environment Variables** — add the same three variables from `.env.local` (use your production `NEXT_PUBLIC_SITE_URL`).
5. Click **Deploy**.
6. Once deployed, go back to:
   - **Google Cloud Console** → add your Vercel URL to **Authorized JavaScript origins**.
   - **Supabase Auth → URL Configuration** → set **Site URL** and add the production `/auth/callback` URL.

---

## 7. Project structure

```
app/
  layout.tsx              # root layout
  page.tsx                # public landing page
  login/page.tsx          # Google sign-in
  auth/callback/route.ts  # OAuth code -> session exchange
  auth/signout/route.ts   # POST endpoint to sign out
  auth/auth-code-error/   # fallback page if callback fails
  dashboard/
    layout.tsx            # sidebar shell, requires auth
    page.tsx              # countdown + welcome cards
components/
  GoogleSignInButton.tsx
  CountdownTimer.tsx      # live ticking timer to access_expires_at
  SignOutButton.tsx
lib/
  config.ts               # APP_NAME, DEFAULT_ACCESS_EXPIRES_AT, getSiteUrl()
  supabase/
    client.ts             # browser client
    server.ts             # server / RSC client (cookies)
    middleware.ts         # session refresh + route guard
middleware.ts             # wires up updateSession on every request
supabase/
  schema.sql              # the SQL you run in Supabase
```

---

## 8. How the access expiry works

- A Postgres trigger (`on_auth_user_created`) creates a row in `public.profiles` for every new auth user, with `access_expires_at = '2026-08-15T23:59:59Z'`.
- The dashboard fetches the row and feeds `access_expires_at` to the `CountdownTimer` component, which re-renders every second.
- If the date has passed, an "Your access has expired" banner is shown.
- To extend a single user later, just update their row:
  ```sql
  update public.profiles
     set access_expires_at = '2027-01-01T00:00:00Z'
   where email = 'someone@example.com';
  ```

---

## 9. Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm start        # run production build locally
npm run lint     # next/eslint
```
