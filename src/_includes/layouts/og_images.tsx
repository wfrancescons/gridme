import { encodeBase64 } from "@std/encoding/base64";
import { extname, join, toFileUrl } from "@std/path";

type ogImageData = Lume.Site & {
  name: string;
  description: string;
  avatar: string;
  dirs: {
    src: string;
  };
};

export default async function ogImage(
  { name, description, avatar, dirs }: ogImageData,
) {
  function isHttpUrl(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  let url: URL;
  let ext: string;

  if (isHttpUrl(avatar)) {
    url = new URL(avatar);
    ext = extname(url.pathname).slice(1).toLowerCase();
  } else {
    const imagePath = join(dirs.src, avatar);

    url = toFileUrl(imagePath);
    ext = extname(imagePath).slice(1).toLowerCase();
  }

  if (ext === "jpg") {
    ext = "jpeg";
  }

  console.log(url.href);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to load image");
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  const base64 = encodeBase64(bytes);

  const imageDataUrl = `data:image/${ext};base64,${base64}`;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
        textAlign: "center",
        gap: "16px",
        paddingTop: "24px",
        paddingBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 141 151"
          space="preserve"
          style={{
            height: "30px",
            width: "30px",
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: "2",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            d="M77 14.3c7.6 2.8 7.3 3.4 33.9 18.6C129.2 43.3 127 50 127 84.2c0 14.3.8 23.2-15.2 32.6-31.6 18.6-33.3 19-36.5 19.6-12 2.6-18.8-3.5-34.1-12.1-18.7-10.5-25.1-14-27.6-25.8-.6-3.2-.8-4-.5-40.6.1-17.5 10.6-21.8 27.7-31.7C61.3 14.5 65 11.2 77 14.3"
          />
          <path
            fill="#2b2b2b"
            d="M81.5 2c8 2.9 7.7 3.4 35.9 19.5A48 48 0 0 1 133 34.4a36 36 0 0 1 6.5 17.3c1 7.3.7 17.3.7 32.5 0 11.2-.3 19.7-4.5 27.4-3 5.7-8 11.2-17.2 16.5-34.7 20.4-36.8 20.4-40.4 21.1-9 2-16.1.7-23.9-2.7-5.4-2.4-11.2-6.2-19.3-10.8-24-13.5-30.9-19.5-34-34.6-.7-3.4-1-4.1-.8-43.3.1-22.8 11.9-30 34.2-43 25.6-14.7 31-17 46-13.2zM77 14.3c-11.9-3-15.7.2-36.1 12-17.1 9.8-27.6 14-27.7 31.6-.3 36.7-.1 37.4.5 40.6 2.5 11.7 8.9 15.3 27.6 25.8 15.3 8.6 22.1 14.7 34 12.1 3.3-.7 5-1 36.6-19.6 16-9.4 15.2-18.3 15.2-32.6 0-34.2 2.1-40.9-16.2-51.3C84.3 17.7 84.6 17 77 14.3"
          />
          <path
            fill="#77b3d0"
            d="M96.1 98.1V111c0 3.7-1.5 7.2-3 8l-15.3 8.5c-1.4.8-3.1-.7-3.1-4.8v-13.1c0-3.9 1.5-7.4 3.1-8.2l15.3-8c1.3-.7 3 .8 3 4.8"
          />
          <path
            fill="#fdb62a"
            d="M120.9 85.1V98c0 3.7-1.6 7.2-3 8l-15.3 8.5c-1.4.8-3.2-.7-3.2-4.8V96.4c0-3.8 1.6-7.4 3.2-8.2l15.2-7.9c1.4-.7 3 .8 3 4.8"
          />
          <path
            fill="#ff6c1e"
            d="M120.2 55v12.8c0 3.4-3 8-6.4 9.8L81.4 94.8c-3.8 2-6.7.3-6.7-3.1V78.5c0-3.5 3-8.2 6.7-10l32.4-16.6c3.6-1.8 6.4-.2 6.4 3.1"
          />
        </svg>
        <p
          style={{
            fontSize: "20px", // text-3xl
            lineHeight: "36px",
            fontWeight: 700,
            color: "#171717", // neutral-900
            margin: 0,
          }}
        >
          Gridme
        </p>
      </div>
      <div
        style={{
          display: "flex",
          width: "104px", // size-26 (26 * 4px)
          height: "104px",
          borderRadius: "9999px",
          borderWidth: "4px",
          borderStyle: "solid",
          borderColor: "#ffffff",
          boxShadow: "0 10px 15px rgba(0,0,0,0.1)", // shadow-lg/10
          overflow: "hidden",
        }}
      >
        <img
          src={imageDataUrl}
          alt="Avatar"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "30px", // text-3xl
            lineHeight: "36px",
            fontWeight: 700,
            color: "#171717", // neutral-900
            margin: 0,
          }}
        >
          {name}
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "24px",
            color: "#737373", // neutral-500
            maxWidth: "384px", // max-w-sm
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
