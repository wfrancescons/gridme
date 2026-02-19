export type ProfileProps = {
  name: string;
  img: string;
  description: string;
};
export default function Profile({ name, img, description }: ProfileProps) {
  return (
    <header class="flex flex-col items-center gap-4 pt-6 pb-4 text-center">
      <div class="size-26 overflow-hidden rounded-full border-4 border-white shadow-lg/10">
        <img
          class="size-full object-cover"
          src={img}
          alt="Avatar"
          fetchpriority="high"
          download-image
          transform-images="avif webp jpg 300"
        />
      </div>
      <div class="flex max-w-sm flex-col gap-2 text-base text-neutral-500">
        <h1 class="font-bold text-3xl text-neutral-900">{name}</h1>
        {description.split("\n").map((line) => (
          <p>
            {line}
          </p>
        ))}
      </div>
    </header>
  );
}
