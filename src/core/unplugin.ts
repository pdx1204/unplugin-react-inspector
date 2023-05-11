import type { Options } from "./../types";
import { createUnplugin } from "unplugin";
import { compile } from "./compiler";
import { createServer } from "./server";
import { DEFAULT_OPTIONS } from "./constants";

export default createUnplugin<Options>((options = DEFAULT_OPTIONS) => {
  createServer(options.port as number);
  return {
    name: "unplugin-react-inspector",
    enforce: "pre",
    transform(code, id) {
      const isJsx = id.endsWith(".jsx") || id.endsWith(".tsx");
      if (!isJsx) return code;
      console.log("transform", id);

      return compile({ code, id });
    },
  };
});
