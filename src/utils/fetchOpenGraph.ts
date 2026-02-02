import { load } from "cheerio";

export async function fetchOpenGraph(
  url: string,
): Promise<Record<string, string>> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("OpenGraph: Failed to fetch URL");
  }

  const html = await response.text();
  const $ = load(html);

  const og: Record<string, string> = {};

  $('meta[property^="og:"]').each((_, el) => {
    const property = $(el).attr("property");
    const content = $(el).attr("content");

    if (!property || !content) return;

    const key = property.replace(/^og:/, "");
    og[key] = content;
  });

  const faviconSelectors = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
  ];

  for (const selector of faviconSelectors) {
    const href = $(selector).first().attr("href");

    if (href) {
      try {
        const faviconUrl = new URL(href, url).toString();
        og.favicon = faviconUrl;
        break;
      } catch {
        // Ignore invalid URLs
      }
    }
  }

  return og;
}
