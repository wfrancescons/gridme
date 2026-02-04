import "lume/types.ts";

import imageToDataURL from "@/utils/imageToDataURL.ts";
import { Page } from "lume/core/file.ts";

export default function generateFavicon() {
  return (site: Lume.Site) => {
    site.preprocess([".html"], async (pages) => {
      const firstPage = pages[0];
      if (!firstPage) return;

      const avatar = firstPage.data.avatar;
      if (!avatar || typeof avatar !== "string") return;

      const localSrc = firstPage.data.dirs.src;

      const imageDataUrl = await imageToDataURL(avatar, localSrc);

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
