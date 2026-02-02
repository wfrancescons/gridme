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
      <div className="h-full w-full overflow-hidden p-4 bg-neutral-100 flex flex-row gap-3 justify-between
      group-[.card-large]/card:flex-col-reverse">
        <div class="flex flex-col flex-1 justify-center gap-3">
          {/* Title */}
          <div className=" ">
            <div className="flex flex-col items-start text-start
          ">
              <span className="font-bold text-neutral-800 text-base line-clamp-3">
                {linkData.title ? linkData.title : url}
              </span>
            </div>
          </div>

          {/* Icon + Hostname */}
          <div className="flex flex-row gap-2 items-center">
            <img
              src={linkData.favicon || `${url2.origin}/favicon.ico`}
              className="w-4 h-4 rounded-full"
              alt="Site icon"
              onerror="this.onerror=null; this.style.display='none';"
              download-image
            />
            <span className="font-medium text-neutral-700/80 text-xs">
              {url2.hostname}
            </span>
          </div>
        </div>

        {/* Image */}
        {linkData.image && (
          <div className="flex-none flex overflow-hidden aspect-square rounded-2xl
            group-[.card-square]/card:hidden group-[.card-large]/card:w-full group-[.card-large]/card:aspect-video">
            <img
              src={linkData.image}
              alt="Site image"
              className="w-full h-full object-cover"
              download-image
              transform-images="avif webp jpg 350"
            />
          </div>
        )}
      </div>
    </comp.Card>
  );
}
