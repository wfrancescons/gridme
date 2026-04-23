import plugins from "./plugins.ts";

import "lume/types.ts";

export default function () {
  return (site: Lume.Site) => {
    // Configure the site
    site.use(plugins());

    // Add remote files
    const files = [
      // Components
      "_components/cards/Code/comp.tsx",
      "_components/cards/Code/script.ts",
      "_components/cards/Code/style.css",
      "_components/cards/Folder/comp.tsx",
      "_components/cards/Folder/script.ts",
      "_components/cards/Map/comp.tsx",
      "_components/cards/Map/script.ts",
      "_components/cards/Image.tsx",
      "_components/cards/Link.tsx",
      "_components/cards/Note.tsx",
      "_components/cards/Telegram.tsx",
      "_components/cards/Text.tsx",
      "_components/cards/Todo.tsx",
      "_components/Card.tsx",
      "_components/Footer.tsx",
      "_components/Grid.tsx",
      "_components/Profile.tsx",
      "_components/Section.tsx",

      // Layouts
      "_includes/layouts/main.tsx",
      "_includes/layouts/og_images.tsx",

      // Icons
      "icons/arrow-up-right.svg",
      "icons/check.svg",
      "icons/close.svg",
      "icons/copy.svg",
      "icons/gridme-logo.svg",
      "icons/telegram.svg",

      // Images
      "img/avatar.jpg",
      "img/map-placeholder.png",

      // Internals
      "assets/map-style.json",
      "_data.yml",
      "index.yml",
      "style.css",
    ];

    for (const file of files) {
      site.remoteFile(file, import.meta.resolve(`./src/${file}`));
    }
  };
}
