type FooterProps = {
  hasMapCard?: boolean;
};

export default function Footer({ hasMapCard }: FooterProps) {
  return (
    <footer class="mt-auto flex flex-col items-center justify-center pt-6 text-neutral-500 text-sm">
      <p class="flex flex-row items-center justify-center text-center">
        Made with{" "}
        <a
          href="https://github.com/wfrancescons/gridme"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex flex-row items-center justify-center gap-0.5 font-bold hover:underline"
        >
          <img
            src="/icons/gridme-logo.svg"
            alt="Gridme Logo"
            class="mx-1 size-5 shadow-xs"
            inline
          />
          Gridme
        </a>
      </p>
      {hasMapCard && (
        <p class="mt-4 text-center text-neutral-400 text-xs [&>a]:hover:underline">
          Map's attribution information:
          <br />
          <a
            href="https://maplibre.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MapLibre
          </a>{" "}
          |{" "}
          <a
            href="https://openfreemap.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenFreeMap
          </a>
          {" © "}
          <a
            href="https://www.openmaptiles.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenMapTiles
          </a>
          <br />
          Data from{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap
          </a>
        </p>
      )}
    </footer>
  );
}
