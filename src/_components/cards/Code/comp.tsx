import type { CardProps } from "@/_components/Card.tsx";

import hljs from "npm:highlight.js@11.11.1";

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
  const highlighted = hljs.highlightAuto(content).value;

  return (
    <comp.Card size={size}>
      <div class="flex h-full w-full flex-col overflow-hidden">
        <div class="flex flex-row items-center justify-between bg-stone-700 p-3">
          <h3 class="font-semibold text-stone-100 leading-tight">Code</h3>
          <div class="flex flex-row-reverse items-center justify-center gap-1">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-stone-100/60 p-2 text-stone-700/90 transition-all duration-200 hover:bg-stone-100/40 active:scale-85"
              aria-label="Copy"
              data-code-id={id}
            >
              <img class="h-3 w-3" src="/icons/copy.svg" alt="" inline />
            </button>
            <span class="origin-right scale-0 select-none text-stone-100/75 text-xs transition-transform duration-150 ease-in-out">
              Copied!
            </span>
          </div>
        </div>

        <div
          class="scrollbar scrollbar-thin scrollbar-thumb-stone-100/50 scrollbar-track-stone-800 flex-1 overflow-y-auto bg-stone-800 px-3 py-2 text-sm text-stone-50"
          data-code-content={id}
        >
          <pre class="whitespace-pre-wrap break-words font-mono">
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
          </pre>
        </div>
      </div>
    </comp.Card>
  );
}