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
      <div class="w-full h-full flex flex-col overflow-hidden">
        <div class="flex flex-row justify-between bg-amber-200 p-3 items-center">
          <h3 class="font-semibold leading-tight text-amber-950">Note</h3>
          <div class="flex flex-row-reverse gap-1 justify-center items-center">
            <button
              type="button"
              class="text-amber-950/60 inline-flex justify-center items-center bg-amber-500/30 hover:bg-amber-500/50 rounded-full p-2 transition-all duration-200 active:scale-85"
              aria-label="Copy"
              data-note-id={id}
            >
              <img
                class="w-3 h-3"
                src="/icons/copy.svg"
                alt=""
                inline
              />
            </button>
            <span class="scale-0 select-none origin-right transition-transform duration-150 ease-in-out text-xs text-amber-950/50">
              Copied!
            </span>
          </div>
        </div>

        <div
          class="flex-1 px-3 py-2 bg-amber-100 text-zinc-600 overflow-y-auto"
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
