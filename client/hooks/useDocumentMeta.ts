import { useEffect } from "react";

interface DocumentMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  keywords?: string;
  /** Optional JSON-LD structured data — array of objects, one <script> per entry */
  jsonLd?: object[];
}

/**
 * Imperatively updates <title> and head meta tags on route changes.
 * Used in place of react-helmet-async to avoid an extra dependency.
 * Tags are tagged with data-doc-meta="1" so they can be cleaned up between routes.
 */
export function useDocumentMeta({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  keywords,
  jsonLd,
}: DocumentMeta) {
  useEffect(() => {
    document.title = title;

    setMeta("name", "description", description);
    setMeta("name", "title", title);
    if (keywords) setMeta("name", "keywords", keywords);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:type", ogType);
    if (ogImage) setMeta("property", "og:image", ogImage);

    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:url", canonical);
    if (ogImage) setMeta("name", "twitter:image", ogImage);

    setLink("canonical", canonical);

    clearJsonLd();
    if (jsonLd && jsonLd.length) {
      for (const obj of jsonLd) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.docMeta = "1";
        script.textContent = JSON.stringify(obj);
        document.head.appendChild(script);
      }
    }
  }, [title, description, canonical, ogImage, ogType, keywords, JSON.stringify(jsonLd)]);
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function clearJsonLd() {
  document.head
    .querySelectorAll<HTMLScriptElement>('script[data-doc-meta="1"]')
    .forEach((el) => el.remove());
}
