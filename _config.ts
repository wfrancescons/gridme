import plugins from "@/plugins/plugins.ts";
import lume from "lume/mod.ts";

const site = lume({
  src: "./src",
});

site.data("dirs", {
  src: site.src(),
});

site.use(plugins());

export default site;
