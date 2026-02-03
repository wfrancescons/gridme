import { encodeBase64 } from "@std/encoding/base64";
import { extname, join } from "@std/path";

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
  const imagePath = join(dirs.src, avatar);
  const bytes = await Deno.readFile(imagePath);

  let ext = extname(imagePath).slice(1).toLowerCase();

  if (ext === "jpg") {
    ext = "jpeg";
  }

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
          viewBox="0 0 602 648"
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
            d="M272 212c13 5 13 6 61 34 34 19 30 31 30 94 0 26 1 42-28 59-57 34-61 34-66 36-22 4-35-7-63-22-34-20-45-26-50-47l-1-74c0-32 19-40 51-58 37-22 44-28 66-22Z"
            transform="translate(-377 -521) scale(2.615361)"
            fill="#fff"
          >
          </path>
          <path
            d="M275 202c14 5 14 6 64 34 11 7 19 13 24 20s8 15 10 26l1 58c0 17 0 31-7 43-4 9-12 17-26 25-61 36-64 36-70 37-14 3-24 1-36-4l-34-19c-38-22-51-30-56-54l-1-77c0-36 21-46 56-67 42-24 50-29 74-23l1 1Zm-3 10c-22-6-29 0-66 22-32 18-51 26-51 58l1 74c5 21 16 27 50 47 28 15 41 26 63 22 5-2 9-2 66-36 29-17 28-33 28-59 0-63 4-75-30-94-48-28-48-29-61-34Z"
            transform="translate(-377 -521) scale(2.615361)"
            fill="#202020"
          >
          </path>
          <path
            d="M245 222v23c0 7-3 13-6 15l-28 15c-2 2-5-1-5-8v-24c0-7 2-14 5-15l28-15c3-1 6 2 6 9Z"
            transform="translate(-215 -147) scale(2.615361)"
            fill="#77b3d0"
          >
          </path>
          <path
            d="M245 222v23c0 7-3 13-6 15l-28 15c-2 2-5-1-5-8v-24c0-7 2-14 5-15l28-15c3-1 6 2 6 9Z"
            transform="translate(-97 -209) scale(2.615361)"
            fill="#fdb62a"
          >
          </path>
          <path
            d="M289 198v23c0 6-6 15-12 18l-59 31c-7 4-12 1-12-5v-24c0-7 5-15 12-19l59-30c6-3 12 0 12 6Z"
            transform="translate(-215 -289) scale(2.615361)"
            fill="#ff6c1e"
          >
          </path>
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
