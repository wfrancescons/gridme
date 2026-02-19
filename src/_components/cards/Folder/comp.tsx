import type { CardProps } from "@/_components/Card.tsx";

export type FolderProps = CardProps & {
  name: string;
  itemCount: number;
  color?: "amber" | "blue" | "green" | "red" | "purple" | "neutral";
  children: JSX.Children;
};

let folderId = 0;

function generateFolderId() {
  folderId += 1;
  return `folder-${folderId}`;
}

export default function Folder(
  { name, itemCount, color = "neutral", children, size, comp }: FolderProps,
) {
  const id = generateFolderId();

  const colorsMap = {
    amber: ["bg-amber-200", "fill-amber-300", "text-amber-950"],
    blue: ["bg-blue-200", "fill-blue-300", "text-blue-950"],
    green: ["bg-lime-200", "fill-lime-300", "text-lime-950"],
    neutral: ["bg-stone-200", "fill-stone-300", "text-stone-950"],
    red: ["bg-red-200", "fill-red-300", "text-red-950"],
    purple: ["bg-purple-200", "fill-purple-300", "text-purple-950"],
  };

  return (
    <>
      {/* Folder card */}
      <comp.Card size={size} clickable>
        <button
          type="button"
          data-folder-id={id}
          class="h-full w-full cursor-pointer"
        >
          <div class="group/folder relative size-full overflow-hidden rounded-3xl">
            <div class={`absolute inset-0 z-0 ${colorsMap[color][0]}`} />

            <div class="absolute inset-0 z-10 flex items-start justify-start p-4">
              <div class="relative flex h-1/2 w-full items-start justify-center -space-x-15 *:rounded-lg *:shadow-lg/30">
                {Array.from({ length: Math.min(itemCount, 3) }).map((_, i) => (
                  <div
                    class={`z- aspect-3/4 w-40${(i + 1) * 10} flex ${
                      i % 2 === 0 ? "rotate-1" : "-rotate-1"
                    } mt-4 flex-col gap-2 bg-neutral-50 p-4 transition-all duration-500 ease-in-out group-hover/folder:mt-0`}
                  >
                    <div class="h-1.5 w-3/4 rounded-full bg-black/10" />
                    <div class="h-1.5 w-full rounded-full bg-black/5" />
                    <div class="h-1.5 w-5/6 rounded-full bg-black/5" />
                    <div class="h-1.5 w-2/3 rounded-full bg-black/3" />
                  </div>
                ))}
              </div>
            </div>

            <div class="absolute bottom-0 left-0 z-20 h-[65%] w-full">
              <svg
                viewBox="0 0 400 280"
                class="h-full w-full drop-shadow-[0_0px_3px_rgba(0,0,0,0.15)]"
                preserveAspectRatio="none"
              >
                <defs>
                  <mask id={`folder-mask-${id}`} maskUnits="userSpaceOnUse">
                    <rect width="100%" height="100%" fill="white" />
                    <path
                      d="M 400 0 L 400 50 L 250 50 C 190 50 180 0 90 0 L 0 0 Z"
                      fill="black"
                    />
                  </mask>
                </defs>

                <rect
                  width="100%"
                  height="100%"
                  rx="16"
                  class={colorsMap[color][1]}
                  mask={`url(#folder-mask-${id})`}
                />
              </svg>

              <div class="absolute bottom-0 left-0 flex h-full w-full flex-col items-start justify-end gap-1 p-4">
                <span
                  class={`truncate font-semibold text-base leading-none ${
                    colorsMap[color][2]
                  }/70`}
                >
                  {name}
                </span>
                <span class={`font-semibold text-sm ${colorsMap[color][2]}/50`}>
                  {itemCount}
                </span>
              </div>
            </div>
          </div>
        </button>
      </comp.Card>

      {/* Folder dialog */}
      <dialog
        id={id}
        closedby="any"
        class="group pointer-events-none invisible fixed inset-0 m-0 grid h-dvh max-h-none w-screen max-w-none items-end justify-center overflow-clip bg-black/10 p-0 opacity-0 transition-all transition-discrete duration-300 ease-in-out backdrop:bg-transparent open:pointer-events-auto open:visible open:opacity-100 md:items-center starting:open:opacity-0"
      >
        {/* Backdrop to close modal on outside click */}
        <form
          method="dialog"
          class="fixed inset-0 -z-10 cursor-default"
        >
          <button
            type="submit"
            class="h-full w-full"
            aria-label="Close"
          />
        </form>

        {/* Modal Box */}
        <div class="flex h-dvh max-h-9/10 w-screen max-w-full flex-col origin-bottom scale-90 overflow-hidden rounded-t-2xl bg-neutral-50 shadow-xl transition-transform duration-300 ease-in-out group-open:scale-100 md:max-h-8/10 md:max-w-4xl md:rounded-2xl">
          {/* Modal Header */}
          <div class="flex items-center p-4">
            <div class="w-10" />

            <h2 class="flex-1 text-center font-bold text-lg text-neutral-700">
              {name}
            </h2>

            <form method="dialog" class="flex w-10 justify-end">
              <button
                type="submit"
                class="rounded-full bg-neutral-400/20 p-2 text-2xl text-neutral-500 transition-transform duration-150 hover:opacity-70 active:scale-90"
                aria-label="Close"
              >
                <img
                  src="/icons/close.svg"
                  class="h-4.5 w-4.5"
                  alt=""
                  inline
                />
              </button>
            </form>
          </div>

          {/* Modal Body */}
          <div class="flex flex-1 flex-col gap-10 overflow-y-auto overscroll-contain p-2">
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
}
