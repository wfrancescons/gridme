import lume from "lume/mod.ts";
import plugins from "./plugins.ts";

const siteUrl = "https://gridme.bio";

const site = lume({
  src: "./src",
  location: new URL(siteUrl),
});

site.use(plugins());

export default site;
