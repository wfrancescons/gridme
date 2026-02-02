export type SectionProps = {
  title: string;
  subtitle?: string;
};

export default function Section({ title, subtitle }: SectionProps) {
  return (
    <div class="flex flex-col gap-2 items-center text-center">
      <h2 class="text-2xl font-bold text-neutral-800">{title}</h2>
      {subtitle && <p class="text-sm text-neutral-500">{subtitle}</p>}
    </div>
  );
}
