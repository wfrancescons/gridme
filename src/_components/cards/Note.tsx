import type { CardProps } from "@/_components/Card.tsx";

export type NoteProps = CardProps & {
  content: string;
};

export default function Note({ content, size, comp }: NoteProps) {
  return (
    <comp.Card size={size}>
      <div class="flex h-full w-full flex-col overflow-hidden">
        <div class="flex flex-row items-center justify-between bg-amber-200 p-3">
          <h3 class="font-semibold text-amber-950 leading-tight">Note</h3>
        </div>

        <div class="flex-1 overflow-y-auto bg-amber-100 px-3 py-2 text-zinc-600">
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
