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
      <div className="
      h-full w-full overflow-hidden p-4
      bg-sky-100
      flex flex-row gap-1 justify-between
      ">
        <div class="flex flex-col justify-between flex-1">
          {/* Header */}
          <div className="flex flex-row gap-2">
            <img src="/icons/telegram.svg" className="w-5 h-5" inline />
            <span className="font-semibold text-neutral-700/80 text-sm">
              Telegram
            </span>
          </div>

          {/* Telegram Infos */}
          <div className=" ">
            <div className="flex flex-col items-start text-start
          ">
              <span className="font-bold text-neutral-800 text-base group-[.card-large]/card:text-lg">
                {telegramData.title}
              </span>
              <span className="group-[.card-square]/card:hidden font-semibold text-neutral-700/50 text-xs group-[.card-large]/card:text-md">
                {`@${telegramParsed.username}`}
              </span>
            </div>
          </div>

          {/* Action */}
          <div className="       ">
            <a
              href={telegramParsed.url.toString()}
              target="_blank"
              rel="noopener noreferrer"
              className="
          inline-flex items-center gap-2
          px-4 py-2
          bg-sky-500 rounded-full
          text-sm font-bold text-white
          whitespace-nowrap
          transition-transform duration-150 active:scale-90
        "
            >
              <span>
                {telegramParsed.username.toLowerCase().endsWith("bot")
                  ? "Start bot"
                  : "Start chat"}
              </span>
              <img
                src="/icons/arrow-up-right.svg"
                className="w-4 h-4"
                alt="Telegram logo"
                inline
              />
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="
        flex-none w-1/3
        group-[.card-square]/card:hidden
        group-[.card-large]/card:w-1/2
        self-center
        ">
          <img
            src={telegramData.image}
            alt="Telegram avatar"
            className="
            w-full aspect-square
            rounded-full
            "
            loading="lazy"
            fetchpriority="auto"
            download-image
            transform-images="avif webp jpg 200"
          />
        </div>
      </div>
    </comp.Card>
  );
}
