type FooterProps = {
  hasMapCard?: boolean;
};

export default function Footer({ hasMapCard }: FooterProps) {
  return (
    <footer class="mt-auto flex flex-col items-center justify-center pt-6 text-sm text-neutral-500">
      <p class="text-center flex flex-row items-center justify-center">
        Made with{" "}
        <a
          href="https://github.com/wfrancescons/gridme"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold hover:underline inline-flex flex-row gap-0.5 items-center justify-center"
        >
          <img
            src="/icons/gridme-logo.svg"
            alt="Gridme Logo"
            class="size-5 shadow-xs mx-1"
            inline
          />
          Gridme
        </a>
      </p>
      {hasMapCard && (
        <p class="text-center mt-4 text-neutral-400 text-xs [&>a]:hover:underline">
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
