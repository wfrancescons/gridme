import type { CardProps } from "@/_components/Card.tsx";
import { fetchOpenGraph } from "@/utils/fetchOpenGraph.ts";

export type TelegramProps = CardProps & {
  url: string;
};

type TelegramParsed = {
  username: string;
  url: URL;
};

function parseLink(input: string): TelegramParsed {
  if (typeof input !== "string" || !input.trim()) {
    throw new Error("Telegram Card: Invalid input");
  }

  const value = input.trim();

  try {
    const url = new URL(value);

    if (url.hostname !== "t.me") {
      throw new Error("Telegram Card: Invalid domain");
    }

    const username = url.pathname.replace(/^\/+/, "");

    if (!username) {
      throw new Error("Telegram Card: Missing username in URL");
    }

    return {
      username,
      url: new URL(`https://t.me/${username}`),
    };
  } catch {
    throw new Error("Telegram Card: Invalid input");
  }
}

export default async function Telegram(
  { url, size, comp }: TelegramProps,
) {
  const telegramParsed = parseLink(url);
  const telegramData = await fetchOpenGraph(telegramParsed.url.href);

  return (
    <comp.Card size={size}>
      <div class="flex h-full w-full flex-row justify-between gap-1 overflow-hidden bg-sky-100 p-4">
        <div class="flex flex-1 flex-col justify-between">
          {/* Header */}
          <div class="flex flex-row gap-2">
            <img src="/icons/telegram.svg" class="h-5 w-5" inline />
            <span class="font-semibold text-neutral-700/80 text-sm">
              Telegram
            </span>
          </div>

          {/* Telegram Infos */}
          <div class="flex flex-col items-start text-start">
            <span class="font-bold text-base text-neutral-800 group-[.card-large]/card:text-lg">
              {telegramData.title}
            </span>
            <span class="font-semibold text-neutral-700/50 text-xs group-[.card-square]/card:hidden group-[.card-large]/card:text-md">
              {`@${telegramParsed.username}`}
            </span>
          </div>

          {/* Action */}
          <div class="flex">
            <a
              href={telegramParsed.url.toString()}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-sky-500 px-4 py-2 font-bold text-sm text-white transition-transform duration-150 active:scale-90"
            >
              <span>
                {telegramParsed.username.toLowerCase().endsWith("bot")
                  ? "Start bot"
                  : "Start chat"}
              </span>
              <img
                src="/icons/arrow-up-right.svg"
                class="h-4 w-4"
                alt="Telegram logo"
                inline
              />
            </a>
          </div>
        </div>

        {/* Image */}
        <div class="w-1/3 flex-none self-center p-2 group-[.card-square]/card:hidden group-[.card-large]/card:w-1/2">
          <img
            src={telegramData.image}
            alt="Telegram avatar"
            class="aspect-square w-full rounded-full"
            loading="lazy"
            fetchpriority="auto"
            download-image
            transform-images="avif webp jpg 250"
          />
        </div>
      </div>
    </comp.Card>
  );
}
