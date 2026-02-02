import plugins from "@/plugins/plugins.ts";
import lume from "lume/mod.ts";

const site = lume({
  src: "./src",
});

site.use(plugins());

export default site;
