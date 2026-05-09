# Deploying Joy AC Hall to Cloudflare Pages + Decap CMS

## Architecture

| Component | Where it runs |
|---|---|
| Static website | **Cloudflare Pages** (auto-deployed from `main`) |
| Decap CMS UI | Same Pages site, served at `/admin/` |
| GitHub OAuth proxy | **Cloudflare Worker** (this repo, `cloudflare-worker/`) |
| Content storage | GitHub repo (`Ozzitech/Joy-ac-hall`), files in `client/data/*.json` |

CMS edits commit to `main` on GitHub → Cloudflare Pages auto-rebuilds → live in ~30 seconds.

---

## 1. Run locally

```bash
# Install dependencies (once)
npm install

# Dev server with hot reload
npm run dev
# → http://localhost:8080
```

## 2. Run the CMS locally (offline editing, no GitHub needed)

Two terminals:

```bash
# Terminal 1 — local CMS proxy (writes to client/data/*.json on disk)
npm run cms:proxy

# Terminal 2 — Vite dev server
npm run dev
```

Open http://localhost:8080/admin/ — Decap CMS UI loads, edits save to disk, Vite reloads.

## 3. Production preview

```bash
npm run preview
# → builds to dist/spa and serves it locally
```

---

## 4. Deploy to Cloudflare Pages — one-time setup

### a. Push your code to GitHub

The repo is already at `Ozzitech/Joy-ac-hall`. Make sure your latest changes are pushed:

```bash
git add .
git commit -m "..."
git push
```

### b. Connect Cloudflare Pages to the repo

1. Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** tab → **Connect to Git**
2. Authorize GitHub if prompted, pick `Ozzitech/Joy-ac-hall`
3. Configure the build:
   - **Project name**: `joy-ac-hall` (becomes `joy-ac-hall.pages.dev`)
   - **Production branch**: `main`
   - **Framework preset**: None (or "Vite" if offered)
   - **Build command**: `npm run build:client`
   - **Build output directory**: `dist/spa`
   - **Root directory**: leave empty (project root)
   - **Environment variables**: none required for the basic build
4. Click **Save and Deploy**

First build runs in 1–2 minutes. When it's done you'll have:
- Production URL: `https://joy-ac-hall.pages.dev`
- Preview URL for every other branch / PR

### c. Attach the custom domain

1. Pages project → **Custom domains** → **Set up a custom domain** → enter `joyachall.com`
2. If your DNS is on Cloudflare, it adds the records automatically
3. If DNS is elsewhere, Cloudflare shows you a CNAME to add at your registrar
4. SSL provisions automatically once DNS resolves (~5–10 min)

Repeat for `www.joyachall.com` if you want the `www` subdomain to work too.

### d. Future deploys

Push to `main` → Cloudflare Pages auto-builds and deploys. No CLI required.

For PR previews, every other branch gets a unique `*.pages.dev` URL — useful for review before merging.

---

## 5. Decap CMS — production setup

The CMS is hosted at `/admin/` on the same domain. It commits content directly to your GitHub repo. To make that work in production you need a GitHub OAuth flow.

### a. Create a GitHub OAuth App

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
2. Fill in:
   - **Application name**: Joy AC Hall CMS
   - **Homepage URL**: `https://joyachall.com`
   - **Authorization callback URL**: temporarily `https://example.com/callback` (we update this in step 5c)
3. Save, then copy the **Client ID** and click "Generate a new client secret" → copy the secret.

### b. Deploy the OAuth Worker

The Worker source is in [`cloudflare-worker/worker.js`](cloudflare-worker/worker.js).

**Easiest path (Cloudflare dashboard, no CLI):**
1. **Workers & Pages → Create application → Create Worker** (don't use Connect to Git)
2. Name it `joy-ac-hall-cms-oauth` → **Deploy** the placeholder
3. **Edit code** → delete the placeholder → paste contents of [`cloudflare-worker/worker.js`](cloudflare-worker/worker.js) → **Save and deploy**
4. **Settings → Variables and Secrets → Add variable** (toggle Encrypt):
   - `OAUTH_CLIENT_ID` = Client ID from step a
   - `OAUTH_CLIENT_SECRET` = Client Secret from step a
5. Note the Worker URL, e.g. `https://joy-ac-hall-cms-oauth.YOUR-SUB.workers.dev`

**Alternative — Wrangler CLI:**
```bash
cd cloudflare-worker
npx wrangler login
npx wrangler secret put OAUTH_CLIENT_ID
npx wrangler secret put OAUTH_CLIENT_SECRET
npx wrangler deploy
```

### c. Update the GitHub OAuth App callback URL

Go back to GitHub → your OAuth App → set callback URL to:

```
https://joy-ac-hall-cms-oauth.YOUR-SUB.workers.dev/callback
```

Click **Update application**.

### d. Wire the proxy into Decap config

Edit [`public/admin/config.yml`](public/admin/config.yml) `backend.base_url` to your Worker URL:

```yaml
backend:
  name: github
  repo: Ozzitech/Joy-ac-hall
  branch: main
  base_url: https://joy-ac-hall-cms-oauth.YOUR-SUB.workers.dev
  auth_endpoint: auth
```

Commit + push. Cloudflare Pages redeploys in ~30s.

### e. Test it

1. Open `https://joyachall.com/admin/`
2. Click **Login with GitHub**
3. Popup → authorize → popup closes → CMS UI unlocks
4. Edit a piece of content (e.g. a review), click **Publish**
5. Verify the commit appears on `main` in GitHub
6. Wait ~30s for Pages to rebuild → site updates

---

## File reference

| File | Purpose |
|---|---|
| `public/_redirects` | SPA fallback (every unknown route → `index.html`) |
| `public/_headers` | Cache + security headers, MIME types for SEO files |
| `public/admin/index.html` | Decap CMS app loader |
| `public/admin/config.yml` | CMS content schema and backend config |
| `cloudflare-worker/worker.js` | GitHub OAuth proxy code |
| `cloudflare-worker/wrangler.toml` | Worker deploy config |
| `client/data/*.json` | CMS-managed content (site, rooms-images, faqs, attractions, reviews) |
