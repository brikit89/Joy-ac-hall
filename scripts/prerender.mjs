#!/usr/bin/env node
/**
 * Post-build prerender step.
 *
 * Vite builds a single dist/spa/index.html. Search engines crawling
 * /rooms/family-deluxe-room initially see that homepage HTML (and
 * the per-route <title>/<meta> only appear after React hydrates and
 * useDocumentMeta runs). Some crawlers (and many social-card scrapers
 * like Slack, WhatsApp, X) never execute JS, so they index the
 * homepage title for every URL.
 *
 * This script takes dist/spa/index.html as a template and emits a
 * static dist/spa/<route>/index.html for each route in routesMeta.json
 * with the title and meta tags already substituted. Cloudflare Workers
 * Static Assets (see wrangler.jsonc) serves the per-route index.html
 * for direct requests; the React app still loads and useDocumentMeta
 * keeps things in sync for client-side navigation.
 *
 * No headless browser. Pure string replacement on known tags.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist/spa");
const TEMPLATE = path.join(DIST, "index.html");
const META_FILE = path.join(ROOT, "client/data/routesMeta.json");

const escapeAttr = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeText = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/**
 * Replace the first match of a multi-line meta/link tag. Falls back to
 * inserting before </head> if the tag isn't present in the template.
 */
function replaceTag(html, regex, replacement) {
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace("</head>", `    ${replacement}\n  </head>`);
}

function applyMeta(html, meta) {
  const title = escapeText(meta.title);
  const titleAttr = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  const canonical = escapeAttr(meta.canonical);
  const ogImage = meta.ogImage ? escapeAttr(meta.ogImage) : null;
  const keywords = meta.keywords ? escapeAttr(meta.keywords) : null;

  let out = html;

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);

  out = replaceTag(
    out,
    /<meta\s+name="title"[\s\S]*?\/?>/i,
    `<meta name="title" content="${titleAttr}" />`,
  );
  out = replaceTag(
    out,
    /<meta\s+name="description"[\s\S]*?\/?>/i,
    `<meta name="description" content="${description}" />`,
  );
  if (keywords) {
    out = replaceTag(
      out,
      /<meta\s+name="keywords"[\s\S]*?\/?>/i,
      `<meta name="keywords" content="${keywords}" />`,
    );
  }

  out = replaceTag(
    out,
    /<meta\s+property="og:title"[\s\S]*?\/?>/i,
    `<meta property="og:title" content="${titleAttr}" />`,
  );
  out = replaceTag(
    out,
    /<meta\s+property="og:description"[\s\S]*?\/?>/i,
    `<meta property="og:description" content="${description}" />`,
  );
  out = replaceTag(
    out,
    /<meta\s+property="og:url"[\s\S]*?\/?>/i,
    `<meta property="og:url" content="${canonical}" />`,
  );
  if (ogImage) {
    out = replaceTag(
      out,
      /<meta\s+property="og:image"(?!:)[\s\S]*?\/?>/i,
      `<meta property="og:image" content="${ogImage}" />`,
    );
  }

  out = replaceTag(
    out,
    /<meta\s+name="twitter:title"[\s\S]*?\/?>/i,
    `<meta name="twitter:title" content="${titleAttr}" />`,
  );
  out = replaceTag(
    out,
    /<meta\s+name="twitter:description"[\s\S]*?\/?>/i,
    `<meta name="twitter:description" content="${description}" />`,
  );
  out = replaceTag(
    out,
    /<meta\s+name="twitter:url"[\s\S]*?\/?>/i,
    `<meta name="twitter:url" content="${canonical}" />`,
  );
  if (ogImage) {
    out = replaceTag(
      out,
      /<meta\s+name="twitter:image"[\s\S]*?\/?>/i,
      `<meta name="twitter:image" content="${ogImage}" />`,
    );
  }

  out = replaceTag(
    out,
    /<link\s+rel="canonical"[\s\S]*?\/?>/i,
    `<link rel="canonical" href="${canonical}" />`,
  );

  return out;
}

async function writeRouteHtml(route, html) {
  const isHome = route === "/";
  const outPath = isHome
    ? TEMPLATE
    : path.join(DIST, route.replace(/^\//, ""), "index.html");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, html, "utf8");
  return outPath;
}

async function main() {
  const [templateHtml, metaRaw] = await Promise.all([
    fs.readFile(TEMPLATE, "utf8"),
    fs.readFile(META_FILE, "utf8"),
  ]);
  const routesMeta = JSON.parse(metaRaw);

  const routes = Object.keys(routesMeta);
  console.log(`[prerender] generating ${routes.length} route(s)`);

  for (const route of routes) {
    const meta = routesMeta[route];
    const html = applyMeta(templateHtml, meta);
    const written = await writeRouteHtml(route, html);
    console.log(
      `[prerender] ${route.padEnd(32)} → ${path.relative(ROOT, written)}`,
    );
  }
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
