import { encodeBase64 } from "@std/encoding/base64";
import { extname, join, toFileUrl } from "@std/path";

export default async function imageToDataURL(imgSrc: string, localSrc: string) {
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

  if (isHttpUrl(imgSrc)) {
    url = new URL(imgSrc);
    ext = extname(url.pathname).slice(1).toLowerCase();
  } else {
    const imagePath = join(localSrc, imgSrc);

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

  return imageDataUrl;
}
