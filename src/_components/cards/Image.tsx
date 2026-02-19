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
      <div class="flex h-full w-full flex-col overflow-hidden">
        <figure class="relative h-full w-full overflow-hidden rounded-2xl">
          <img
            src={src}
            alt={alt || caption || "Image"}
            class="h-full w-full object-cover"
            transform-images="avif webp jpg 600"
            loading="lazy"
            fetchpriority={getImageIndex() > 2 ? "low" : "high"}
          />

          {/* Bottom Gradient */}
          {caption && (
            <div class="absolute bottom-0 left-0 h-1/3 w-full bg-linear-to-t from-black/60 to-transparent" />
          )}

          {/* Caption + Link Indicator */}
          <div class="absolute bottom-0 left-0 flex w-full items-end justify-between p-3">
            <figcaption class="line-clamp-3 font-semibold text-shadow-md/30 text-sm/4 text-white">
              {caption}
            </figcaption>

            {url && (
              <div class="rounded-full bg-black/25 p-1 text-white outline-2 outline-white/20 backdrop-blur-sm">
                <img
                  src="/icons/arrow-up-right.svg"
                  class="h-4 w-4"
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
