export type SectionProps = {
  title: string;
  subtitle?: string;
};

export default function Section({ title, subtitle }: SectionProps) {
  return (
    <div class="flex flex-col items-center gap-1 text-center">
      <h2 class="font-bold text-2xl text-neutral-800">{title}</h2>
      {subtitle && <p class="text-neutral-500 text-sm">{subtitle}</p>}
    </div>
  );
}
