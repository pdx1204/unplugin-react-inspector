import type { Options } from "./../types";
import { createUnplugin } from "unplugin";
import { compile } from "./compiler";
import { createServer } from "./server";
import { DEFAULT_OPTIONS } from "./constants";
import getPort from "get-port";

export default createUnplugin<Options>((ops = DEFAULT_OPTIONS) => {
  if (typeof window === undefined) return { name: "nplugin-react-inspector" };
  if (process.env.NODE_ENV === "production") return { name: "unplugin-react-inspector" };
  let defaultPort: number;

  const options = { ...DEFAULT_OPTIONS, ...ops };

  if (options.enabled) {
    // get port
    getPort().then((port) => {
      console.log("port", port);

      // initialize server
      defaultPort = port;
      createServer(port);
    });
  }

  return {
    name: "unplugin-react-inspector",
    enforce: "pre",
    transform(code, id) {
      console.log("transform", id);

      const isJsx = id.endsWith(".jsx") || id.endsWith(".tsx");
      if (isJsx && options.enabled)
        return compile({
          code,
          id,
          port: defaultPort,
          injectClientEntryFile: options.injectClientEntryFile,
        });
      return code;
    },
  };
});
