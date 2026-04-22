import type { CardProps } from "@/_components/Card.tsx";

export type CodeProps = CardProps & {
  content: string;
};

let codeId = 0;

function generateCodeId() {
  codeId += 1;
  return `code-${codeId}`;
}

export default function Code({ content, size, comp }: CodeProps) {
  const id = generateCodeId();

  return (
    <comp.Card size={size}>
      <div class="flex h-full w-full flex-col overflow-hidden">
        <div class="flex flex-row items-center justify-between bg-stone-800 p-3">
          <h3 class="font-semibold text-stone-100 leading-tight">Code</h3>
          <div class="flex flex-row-reverse items-center justify-center gap-1">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-stone-100/25 p-2 text-stone-100/75 transition-all duration-200 hover:bg-stone-200/50 active:scale-85"
              aria-label="Copy"
              data-code-id={id}
            >
              <img
                class="h-3 w-3"
                src="/icons/copy.svg"
                alt=""
                inline
              />
            </button>
            <span class="origin-right scale-0 select-none text-stone-100/75 text-xs transition-transform duration-150 ease-in-out">
              Copied!
            </span>
          </div>
        </div>

        <div
  class="flex-1 overflow-y-auto bg-stone-700 px-3 py-2 text-sm text-stone-50"
  data-code-content={id}
>
  <pre class="whitespace-pre-wrap break-words font-mono">
    <code>
      {content.split("\n").map((line, i, arr) => (
        <>
          {line}
          {i < arr.length - 1 && "\n"}
        </>
      ))}
    </code>
  </pre>
</div>
      </div>
    </comp.Card>
  );
}
