import type { CardProps } from "@/_components/Card.tsx";

export type TextProps = CardProps & {
  color?: "amber" | "blue" | "green" | "red" | "purple" | "neutral";
  textSize?: "small" | "medium" | "large" | "extra-large";
  children: JSX.Children;
};

export default function Text(
  { children, size, comp, color = "neutral", textSize = "medium" }: TextProps,
) {
  const colorsMap = {
    amber: ["bg-amber-500"],
    blue: ["bg-sky-500"],
    green: ["bg-lime-500"],
    neutral: ["bg-neutral-500"],
    red: ["bg-red-500"],
    purple: ["bg-purple-500"],
  };

  const textSizeMap = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    "extra-large": "text-xl",
  };

  return (
    <comp.Card size={size}>
      <div class="flex h-full w-full items-center overflow-hidden">
        <div
          class={`flex h-full w-full items-center justify-center ${
            colorsMap[color][0]
          } rounded-2xl p-4 text-center font-bold text-neutral-50 text-shadow-lg/10 ${
            textSizeMap[textSize]
          }`}
        >
          <p>{children}</p>
        </div>
      </div>
    </comp.Card>
  );
}
