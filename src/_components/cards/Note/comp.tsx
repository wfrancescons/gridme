import type { CardProps } from "@/_components/Card.tsx";

export type NoteProps = CardProps & {
  content: string;
};

let noteId = 0;

function generateNoteId() {
  noteId += 1;
  return `note-${noteId}`;
}

export default function Note({ content, size, comp }: NoteProps) {
  const id = generateNoteId();

  return (
    <comp.Card size={size}>
      <div class="flex h-full w-full flex-col overflow-hidden">
        <div class="flex flex-row items-center justify-between bg-amber-200 p-3">
          <h3 class="font-semibold text-amber-950 leading-tight">Note</h3>
          <div class="flex flex-row-reverse items-center justify-center gap-1">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-amber-500/30 p-2 text-amber-950/60 transition-all duration-200 hover:bg-amber-500/50 active:scale-85"
              aria-label="Copy"
              data-note-id={id}
            >
              <img
                class="h-3 w-3"
                src="/icons/copy.svg"
                alt=""
                inline
              />
            </button>
            <span class="origin-right scale-0 select-none text-amber-950/50 text-xs transition-transform duration-150 ease-in-out">
              Copied!
            </span>
          </div>
        </div>

        <div
          class="flex-1 overflow-y-auto bg-amber-100 px-3 py-2 text-zinc-600"
          data-note-content={id}
        >
          {content.split("\n").map((line) => (
            <p>
              {line}
            </p>
          ))}
        </div>
      </div>
    </comp.Card>
  );
}
