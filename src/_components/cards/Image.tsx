import type { CardProps } from "@/_components/Card.tsx";

export type ImageProps = CardProps & {
  src: string;
  alt?: string;
  caption?: string;
  url?: string;
};

let imageIndex = 0;

function getImageIndex() {
  imageIndex++;
  return imageIndex;
}

export default function Image(
  { size, src, alt, caption, url, comp }: ImageProps,
) {
  return (
    <comp.Card size={size} url={url}>
      <div class="w-full h-full flex flex-col overflow-hidden">
        <figure class="relative overflow-hidden rounded-2xl w-full h-full">
          <img
            src={src}
            alt={alt || caption || "Image"}
            class="w-full h-full object-cover"
            transform-images="avif webp jpg 600"
            loading="lazy"
            fetchpriority={getImageIndex() > 2 ? "low" : "high"}
          />

          {/* Bottom Gradient */}
          {caption && (
            <div class="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-black/60 to-transparent" />
          )}

          {/* Caption + Link Indicator */}
          <div class="absolute bottom-0 left-0 w-full p-3 flex justify-between items-end">
            <figcaption class="text-white text-sm/4 text-shadow-md/30 font-semibold line-clamp-3">
              {caption}
            </figcaption>

            {url && (
              <div class="text-white bg-black/25 p-1 rounded-full backdrop-blur-sm outline-2 outline-white/20">
                <img
                  src="/icons/arrow-up-right.svg"
                  class="w-4 h-4"
                  inline
                />
              </div>
            )}
          </div>
        </figure>
      </div>
    </comp.Card>
  );
}
