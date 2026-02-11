import type { CardProps } from "@/_components/Card.tsx";

export type TodoProps = CardProps & {
  items: { text: string; completed?: boolean }[];
};

export default function Todo({ items, size, comp }: TodoProps) {
  const total = items.length;
  const completedCount = items.filter((i) => i.completed).length;

  const percentage = total === 0
    ? 0
    : Math.round((completedCount / total) * 100);

  const isCompleted = percentage === 100;

  return (
    <comp.Card size={size}>
      <div class="w-full h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div class="flex flex-row justify-between bg-stone-200 p-3 items-center">
          <h3 class="font-semibold leading-tight text-stone-900">To-do</h3>

          <div class="flex flex-row items-center gap-1">
            <span class="text-xs font-semibold text-stone-950/50">
              {isCompleted ? "Done" : `${percentage}%`}
            </span>

            {isCompleted
              ? (
                <div class="size-5 flex items-center justify-center rounded-full bg-stone-600 text-stone-100">
                  <img
                    src="/icons/check.svg"
                    alt=""
                    class="w-3 h-3"
                    inline
                  />
                </div>
              )
              : (
                /* Progress Ring */
                <div class="grid grid-cols-1 grid-rows-1">
                  <div class="size-5 border-4 rounded-full border-stone-600/30 col-start-1 row-start-1" />
                  <div
                    class={`size-5 rounded-full border-4 border-stone-700/80 col-start-1 row-start-1 mask-conic-from-${percentage}% mask-conic-to-${percentage}%`}
                  />
                </div>
              )}
          </div>
        </div>

        {/* Body */}
        <div class="flex-1 px-3 py-2 bg-stone-100 text-zinc-600 flex flex-col gap-2 overflow-y-auto">
          {items.map((item, index) => (
            <div key={index} class="flex items-center gap-3">
              <div
                class={`w-4 h-4 flex items-center justify-center rounded-full ${
                  item.completed
                    ? "bg-stone-600 text-stone-100 outline-1 outline-stone-700"
                    : "bg-stone-50 outline-1 outline-stone-300"
                }`}
              >
                {item.completed && (
                  <img
                    src="/icons/check.svg"
                    alt=""
                    class="w-3 h-3"
                    inline
                  />
                )}
              </div>

              <span
                class={`text-sm ${
                  item.completed ? "line-through opacity-85 italic" : ""
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </comp.Card>
  );
}
