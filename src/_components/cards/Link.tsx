import type { CardProps } from "@/_components/Card.tsx";
import { fetchOpenGraph } from "@/utils/fetchOpenGraph.ts";

export type LinkProps = CardProps & {
  url: string;
};

export default async function Link(
  { url, size, comp }: LinkProps,
) {
  const linkData = await fetchOpenGraph(url);
  const url2 = new URL(url);

  return (
    <comp.Card size={size} url={url}>
      <div class="flex h-full w-full flex-row justify-between gap-3 overflow-hidden bg-neutral-100 p-4 group-[.card-large]/card:flex-col-reverse">
        <div class="flex flex-1 flex-col justify-center gap-3">
          {/* Title */}
          <div class="">
            <div class="flex flex-col items-start text-start">
              <span class="line-clamp-3 font-bold text-base text-neutral-800">
                {linkData.title ? linkData.title : url}
              </span>
            </div>
          </div>

          {/* Icon + Hostname */}
          <div class="flex flex-row items-center gap-2">
            <img
              src={linkData.favicon || `${url2.origin}/favicon.ico`}
              class="h-4 w-4 rounded-full"
              alt="Site icon"
              onerror="this.onerror=null; this.style.display='none';"
              download-image
            />
            <span class="font-medium text-neutral-700/80 text-xs">
              {url2.hostname}
            </span>
          </div>
        </div>

        {/* Image */}
        {linkData.image && (
          <div class="flex aspect-square flex-none overflow-hidden rounded-2xl group-[.card-square]/card:hidden group-[.card-large]/card:aspect-video group-[.card-large]/card:w-full">
            <img
              src={linkData.image}
              alt="Site image"
              class="h-full w-full object-cover"
              download-image
              transform-images="avif webp jpg 350"
            />
          </div>
        )}
      </div>
    </comp.Card>
  );
}
