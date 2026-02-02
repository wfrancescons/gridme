export type ProfileProps = {
  name: string;
  img: string;
  description: string;
};
export default function Profile({ name, img, description }: ProfileProps) {
  return (
    <header class="flex flex-col items-center text-center gap-4 pt-6 pb-4">
      <div class="size-26 rounded-full border-4 border-white shadow-lg/10 overflow-hidden">
        <img
          class="size-full object-cover"
          src={img}
          alt="Avatar"
          fetchpriority="high"
          download-image
          transform-images="avif webp jpg 300"
        />
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold text-neutral-900">{name}</h1>
        <p class="text-base text-neutral-500 max-w-sm">{description}</p>
      </div>
    </header>
  );
}
