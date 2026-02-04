import "lume/types.ts";

import { Page } from "lume/core/file.ts";
import { encodeBase64 } from "lume/deps/base64.ts";
import { extname, join, toFileUrl } from "lume/deps/path.ts";

export default function generateFavicon() {
  return (site: Lume.Site) => {
    site.preprocess([".html"], async (pages) => {
      const firstPage = pages[0];
      if (!firstPage) return;

      const avatar = firstPage.data.avatar;
      if (!avatar || typeof avatar !== "string") return;

      function isHttpUrl(value: string): boolean {
        try {
          const url = new URL(value);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch {
          return false;
        }
      }

      let url: URL;
      let ext: string;

      if (isHttpUrl(avatar)) {
        url = new URL(avatar);
        ext = extname(url.pathname).slice(1).toLowerCase();
      } else {
        const imagePath = join(firstPage.data.dirs.src, avatar);
        url = toFileUrl(imagePath);
        ext = extname(imagePath).slice(1).toLowerCase();
      }

      if (ext === "jpg") {
        ext = "jpeg";
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to load image");
      }

      const bytes = new Uint8Array(await response.arrayBuffer());
      const base64 = encodeBase64(bytes);
      const imageDataUrl = `data:image/${ext};base64,${base64}`;

      const faviconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
            <clipPath id="clip">
            <circle cx="50" cy="50" r="50" />
            </clipPath>
        </defs>
        <image
            href="${imageDataUrl}"
            width="100"
            height="100"
            clip-path="url(#clip)"
            preserveAspectRatio="xMidYMid slice"
        />
        </svg>`
        .trim();

      site.pages.push(Page.create({
        url: "/favicon.svg",
        content: faviconSvg,
      }));
    });
  };
}
