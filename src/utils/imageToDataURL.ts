import { encodeBase64 } from "jsr:@std/encoding@^1.0.10/base64";
import { existsSync } from "jsr:@std/fs@^1.0.10";
import { extname, join } from "jsr:@std/path@^1.1.4";

export default async function imageToDataURL(
  imgSrc: string,
  localSrc: string,
) {
  function isHttpUrl(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  let ext: string;
  let bytes: Uint8Array;

  if (isHttpUrl(imgSrc)) {
    const url = new URL(imgSrc);
    ext = extname(url.pathname).slice(1).toLowerCase();

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to load image");
    }

    bytes = new Uint8Array(await response.arrayBuffer());
  } else {
    const cleanPath = imgSrc.replace(/^\/+/, "");
    const imagePath = join(localSrc, cleanPath);

    if (existsSync(imagePath)) {
      ext = extname(imagePath).slice(1).toLowerCase();
      bytes = await Deno.readFile(imagePath);
    } else {
      // fallback
      const themeUrl = import.meta.resolve(`../${cleanPath}`);
      const themePath = new URL(themeUrl);

      ext = extname(cleanPath).slice(1).toLowerCase();
      bytes = await Deno.readFile(themePath);
    }
  }

  if (ext === "jpg") {
    ext = "jpeg";
  }

  return `data:image/${ext};base64,${encodeBase64(bytes)}`;
}
