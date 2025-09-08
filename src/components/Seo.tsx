import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string; // og:type, default "article"
  publishedTime?: string; // ISO string
  modifiedTime?: string; // ISO string
  authorName?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  jsonLdType?: "Article" | "CreativeWork";
  robots?: string; // e.g., "noindex,follow"
}

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}='${key}']`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  if (!href) return;
  let el = document.head.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const upsertJsonLd = (id: string, data: object) => {
  let script = document.head.querySelector(`script[type='application/ld+json'][data-id='${id}']`) as HTMLScriptElement | null;
  const json = JSON.stringify(data);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-id", id);
    document.head.appendChild(script);
  }
  script.text = json;
};

export const Seo = ({
  title,
  description,
  url,
  image,
  type = "article",
  publishedTime,
  modifiedTime,
  authorName = "Thushara",
  breadcrumbs,
  jsonLdType = "Article",
  robots
}: SeoProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Basic meta
    upsertMeta("name", "description", description);
    if (robots) upsertMeta("name", "robots", robots);

    // Canonical
    upsertLink("canonical", url);

    // Open Graph
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    if (image) upsertMeta("property", "og:image", image);

    // Twitter
    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    if (image) upsertMeta("name", "twitter:image", image);

    // JSON-LD Article/CreativeWork
    const mainEntity = {
      "@context": "https://schema.org",
      "@type": jsonLdType,
      headline: title,
      name: title,
      description,
      url,
      image: image ? [image] : undefined,
      author: authorName ? { "@type": "Person", name: authorName } : undefined,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      mainEntityOfPage: url
    } as any;

    upsertJsonLd("cs-main", mainEntity);

    // Breadcrumbs
    if (breadcrumbs && breadcrumbs.length > 0) {
      const itemList = breadcrumbs.map((b, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: b.name,
        item: b.url
      }));
      upsertJsonLd("breadcrumbs", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: itemList
      });
    }
  }, [title, description, url, image, type, publishedTime, modifiedTime, authorName, JSON.stringify(breadcrumbs), robots]);

  return null;
}; 