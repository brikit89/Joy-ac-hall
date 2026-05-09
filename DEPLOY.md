# Deploying Joy AC Hall to Firebase + Decap CMS

## 1. One-time Firebase setup

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Sign in to Google
firebase login

# Create the Firebase project at https://console.firebase.google.com/ first.
# Pick a project ID (e.g. `joyachall-website`) and update `.firebaserc`:
#   { "projects": { "default": "<your-project-id>" } }

# Initialize the project locally (skip if already configured)
firebase use --add
```

## 2. Build & deploy

```bash
# One-shot build + deploy
npm run firebase:deploy

# OR step-by-step:
npm run build:client       # outputs to dist/spa
firebase deploy --only hosting
```

Firebase will serve the SPA at the project's `*.web.app` URL. To attach
`joyachall.com`, go to **Hosting → Add custom domain** in the Firebase console.

## 3. Local preview against the Firebase emulator

```bash
npm run firebase:serve
# opens http://localhost:5000
```

## 4. Decap CMS setup (one-time)

The CMS is hosted at `/admin/` on the same domain. It commits content
directly to your GitHub repo. To make that work you need:

### a. Create a GitHub OAuth App

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New**.
2. Set:
   - Homepage URL: `https://joyachall.com`
   - Callback URL: the URL of your OAuth proxy (next step) + `/callback`
3. Note the Client ID and Client Secret.

### b. Host an OAuth proxy

Decap CMS needs a tiny server-side helper to exchange the OAuth code for a
GitHub token. Easiest options (pick one):

- **Cloudflare Workers** (free): https://github.com/sterlingwes/netlify-cms-cloudflare-pages
- **Vercel** (free): https://github.com/vencax/netlify-cms-github-oauth-provider
- **Firebase Functions**: deploy the proxy as a 2nd-gen function in this same project.

Whichever you pick, set environment variables:
- `OAUTH_CLIENT_ID` (from step a)
- `OAUTH_CLIENT_SECRET` (from step a)
- `REDIRECT_URL` = your proxy's URL + `/callback`

### c. Wire the proxy into `public/admin/config.yml`

Edit two lines in the `backend:` block:
```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/joy-rameswaram-luxury-875
  branch: main
  base_url: https://decap-oauth.your-domain.workers.dev   # <- your proxy URL
  auth_endpoint: auth
```

### d. Visit `/admin/`

After deploying, browse to `https://joyachall.com/admin/`. You'll see
"Login with GitHub". Click → authorize → you're in.

The CMS lets you edit:
- **Site Settings** — phone, email, address, hero text, Maps URL
- **Rooms** — name, capacity, price, features, slider images
- **Attractions** — home page list of nearby attractions
- **FAQs** — home page FAQ items
- **Reviews** — Google review cards

Saved edits are committed to GitHub. Once your repo is connected to a CI/CD
pipeline (Firebase via GitHub Actions, or manual `npm run firebase:deploy`),
the live site updates automatically.

## 5. Local CMS development (no GitHub needed)

For testing the CMS UI locally without committing to GitHub, run two
terminals:

```bash
# Terminal 1 — CMS proxy (uses local filesystem)
npm run cms:proxy
# Listening on http://localhost:8081

# Terminal 2 — dev server
npm run dev
```

Then visit `http://localhost:8080/admin/`. The `local_backend: true` flag
in `config.yml` makes Decap CMS read/write your local `client/data/`
files directly through the proxy.

## 6. Production environment variables

If your build step needs any (none required today), add them in the
Firebase Hosting console under **Project Settings → Environment**.

## 7. Custom domain

```bash
firebase hosting:channel:deploy preview-name   # for preview channels
# or use the console for connecting joyachall.com
```

After adding the domain in the Firebase console, update DNS A records to
the values Firebase provides. Verify at https://joyachall.com once SSL
provisions (~15 min).

---

## Files summary

| File / dir | Purpose |
|---|---|
| `firebase.json` | Hosting config, rewrites, headers |
| `.firebaserc` | Firebase project alias |
| `public/admin/index.html` | Decap CMS app loader |
| `public/admin/config.yml` | Content schema & backend config |
| `public/uploads/` | CMS-uploaded media (created on first upload) |
| `client/data/site.json` | Site settings |
| `client/data/reviews.json` | Google reviews |
| `client/data/faqs.json` | Home page FAQ list |
| `client/data/attractions.json` | Home page attractions |
