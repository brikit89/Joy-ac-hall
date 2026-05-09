/**
 * Decap CMS OAuth proxy — Cloudflare Worker
 *
 * Exchanges a GitHub OAuth `code` for an access token and posts it back to
 * the Decap CMS popup via `window.opener.postMessage`.
 *
 * Endpoints:
 *   GET /auth      → redirect user to GitHub authorize page
 *   GET /callback  → handle GitHub redirect, return HTML that posts the token
 *
 * Required environment variables (Cloudflare Worker secrets):
 *   OAUTH_CLIENT_ID      — from your GitHub OAuth App
 *   OAUTH_CLIENT_SECRET  — from your GitHub OAuth App
 *
 * GitHub OAuth App callback URL must be set to:
 *   https://<your-worker>.workers.dev/callback
 */

const SCOPE = "repo,user";
const GITHUB_AUTH = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Login start — redirect to GitHub authorize
    if (url.pathname === "/auth") {
      const params = new URLSearchParams({
        client_id: env.OAUTH_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope: SCOPE,
        state: crypto.randomUUID(),
      });
      return Response.redirect(`${GITHUB_AUTH}?${params}`, 302);
    }

    // 2. GitHub callback — exchange code for token, post message to opener
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Missing ?code parameter", { status: 400 });
      }

      const tokenRes = await fetch(GITHUB_TOKEN, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: env.OAUTH_CLIENT_ID,
          client_secret: env.OAUTH_CLIENT_SECRET,
          code,
        }),
      });

      const data = await tokenRes.json();
      const success = !!data.access_token;
      const payload = success
        ? { token: data.access_token, provider: "github" }
        : { error: data.error || "no_token" };
      const messageType = success ? "success" : "error";

      const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Authorizing…</title></head>
<body>
<p>Authorizing with GitHub… you can close this window if it does not close automatically.</p>
<script>
(function () {
  var msg = "authorization:github:${messageType}:" + ${JSON.stringify(JSON.stringify(payload))};
  function send() {
    if (!window.opener) return;
    window.opener.postMessage(msg, "*");
  }
  window.addEventListener("message", function (e) {
    if (e.data === "authorizing:github") send();
  }, false);
  send();
})();
</script>
</body></html>`;

      return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Health check
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response("Decap CMS OAuth proxy is running.", { status: 200 });
    }

    return new Response("Not found", { status: 404 });
  },
};
