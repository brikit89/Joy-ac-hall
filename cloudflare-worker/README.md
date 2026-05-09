# Decap CMS OAuth proxy — Cloudflare Worker

A tiny Worker that handles GitHub OAuth for Decap CMS. Two routes (`/auth`
and `/callback`), no dependencies, free on Cloudflare's free tier.

## Deploy via Cloudflare dashboard (no CLI)

1. Log in to <https://dash.cloudflare.com/>.
2. Sidebar → **Workers & Pages** → **Create application** → **Create Worker**.
3. Name it `joy-ac-hall-cms-oauth` (or anything — remember the name, it
   becomes part of the URL).
4. Click **Deploy** to create the default Worker.
5. Click **Edit code** → delete the placeholder code → paste the contents of
   [`worker.js`](./worker.js) → click **Save and deploy**.
6. Note the URL shown at the top, e.g.
   `https://joy-ac-hall-cms-oauth.YOUR-SUBDOMAIN.workers.dev`.
7. Sidebar → **Settings** → **Variables and Secrets** → **Add variable**
   (click **Encrypt** so it's stored as a secret):
   - Name: `OAUTH_CLIENT_ID`     Value: *(from your GitHub OAuth App)*
   - Name: `OAUTH_CLIENT_SECRET` Value: *(from your GitHub OAuth App)*
   Click **Deploy** to roll out the new variables.

## Deploy via Wrangler CLI (alternative)

```bash
cd cloudflare-worker
npx wrangler login
npx wrangler secret put OAUTH_CLIENT_ID       # paste your GitHub Client ID
npx wrangler secret put OAUTH_CLIENT_SECRET   # paste your GitHub Client Secret
npx wrangler deploy
```

## After deploying

1. **Update GitHub OAuth App callback URL** to:
   `https://joy-ac-hall-cms-oauth.YOUR-SUBDOMAIN.workers.dev/callback`
   (GitHub → Settings → Developer settings → OAuth Apps → your app → edit)

2. **Update Decap config** at `public/admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: Ozzitech/Joy-ac-hall
     branch: main
     base_url: https://joy-ac-hall-cms-oauth.YOUR-SUBDOMAIN.workers.dev
     auth_endpoint: auth
   ```

3. **Verify** by visiting
   `https://joy-ac-hall-cms-oauth.YOUR-SUBDOMAIN.workers.dev/health`
   — should respond "Decap CMS OAuth proxy is running."

4. Redeploy the website (`npm run firebase:deploy`) and visit `/admin/`.
   Click **Login with GitHub** → a popup opens → authorize → popup closes
   and the CMS unlocks.
