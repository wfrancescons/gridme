import "lume/types.ts";

import { Page } from "lume/core/file.ts";

function getImageExtension(
  src: string,
  contentType: string | null,
): string {
  // 1. Try to extract from the URL pathname
  try {
    const url = new URL(src);
    const match = url.pathname.match(/\.([a-zA-Z0-9]+)$/);

    if (match) {
      return match[1].toLowerCase();
    }
  } catch {
    // Invalid URL
  }

  // 2. Fallback to Content-Type
  if (contentType) {
    if (contentType.includes("svg")) return "svg";

    if (contentType.startsWith("image/")) {
      return contentType
        .replace("image/", "")
        .replace("+xml", "")
        .split(";")[0];
    }
  }

  // 3. Final fallback
  return "img";
}

export default function downloadImages() {
  return (site: Lume.Site) => {
    site.process([".html"], async (pages, allPages) => {
      const imageCache = new Map<
        string,
        { url: string; content: Uint8Array; contentType: string }
      >();

      for (const page of pages) {
        const document = page.document;
        if (!document) continue;

        const images = document.querySelectorAll<HTMLImageElement>(
          "img[download-image][src^='https://']",
        );

        for (const img of images) {
          const src = img.getAttribute("src");
          if (!src) continue;

          // Cache hit
          const cached = imageCache.get(src);
          if (cached) {
            img.setAttribute("src", cached.url);
            continue;
          }

          const response = await fetch(src);
          if (!response.ok) continue;

          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.startsWith("image/")) continue;

          const extension = getImageExtension(src, contentType);

          const filename = `${crypto.randomUUID()}.${extension}`;
          const url = `/img/${filename}`;

          const content = new Uint8Array(await response.arrayBuffer());

          allPages.push(
            Page.create({
              url,
              content,
              contentType,
            }),
          );

          imageCache.set(src, {
            url,
            content,
            contentType,
          });

          img.setAttribute("src", url);
        }
      }
    });
  };
}
