import type { CardProps } from "@/_components/Card.tsx";

export type MapProps = CardProps & {
  center: [lng: number, lat: number];
  zoom?: number;
  caption?: string;
};

export default function Map(
  { size, center, zoom = 10, caption, comp }: MapProps,
) {
  const mapInfos = {
    center: center.map((coord) => coord.toFixed(3)),
    zoom,
  };

  return (
    <comp.Card
      size={size}
      url={`https://www.google.com/maps/@${center[1]},${center[0]},${zoom}z`}
    >
      <div class="h-full w-full">
        <div class="relative h-full w-full overflow-hidden rounded-2xl">
          {/* Map */}
          <div
            data-map-infos={JSON.stringify(mapInfos)}
            class="h-full w-full"
          >
          </div>

          {/* Placeholder */}
          <div
            data-map-placeholder
            class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-zinc-100 opacity-100 transition-opacity duration-1000"
          >
            <img
              src="/img/map-placeholder.png"
              alt="Map placeholder"
              class="h-full w-full object-cover"
              loading="lazy"
              fetchpriority="high"
              transform-images="avif webp jpg 500"
            />
          </div>

          {/* Caption */}
          {caption && (
            <div class="pointer-events-none absolute bottom-0 left-0 z-20 p-3">
              <div class="w-fit rounded-xl bg-white/45 px-3 py-2 shadow-md/10 backdrop-blur-sm">
                <span class="block truncate font-semibold text-sm/4 text-zinc-700">
                  {caption}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </comp.Card>
  );
}
