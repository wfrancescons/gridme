export type GridProps = {
  children: JSX.Children;
};

export default function Grid({ children }: GridProps) {
  return (
    <div class="flex justify-center">
      <div class="card-grid">
        {children}
      </div>
    </div>
  );
}
