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
