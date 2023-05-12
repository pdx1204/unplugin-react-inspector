/* eslint-disable @typescript-eslint/no-non-null-assertion */
import MagicString from "magic-string";
import { parse as babelParse, traverse as babelTraverse } from "@babel/core";
import { CompileOptions, InjectClientOptions } from "../types";
import path from "path";

import { KEY_DATA } from "./constants";
import { isArray } from "../utils";

export const injectClient = ({
  parseCode,
  filePath,
  port,
  enabled,
  injectClientEntryFile,
}: InjectClientOptions) => {
  if (isArray(injectClientEntryFile)) {
    const flag = (injectClientEntryFile as Array<string>).some((entryFile) =>
      filePath!.match(entryFile)
    );
    if (flag) {
      const options = {
        dataKey: KEY_DATA,
        port,
        enabled,
      };
      parseCode.prepend(
        `import { createClient } from "unplugin-react-inspector/client";\n createClient(${JSON.stringify(
          options
        )});\n`
      );
    }
  } else if (filePath!.match(injectClientEntryFile as string | RegExp)) {
    const options = {
      dataKey: KEY_DATA,
      port,
      enabled,
    };

    console.log("injectClientEntryFile", options);

    parseCode.prepend(
      `import { createClient } from "unplugin-react-inspector/client";\n createClient(${JSON.stringify(
        options
      )});\n`
    );
  }
  return parseCode;
};

export const injectInspectorInDom = (
  code: string,
  filePath: string,
  magicCode: MagicString
): Promise<string> => {
  const relativePath = path.relative(process.cwd(), filePath as string);
  return new Promise((resolve) => {
    const ast = babelParse(code, {
      babelrc: false,
      comments: true,
      plugins: [["@babel/plugin-transform-typescript", { isTSX: true, allExtensions: true }]],
    });

    babelTraverse(ast, {
      enter({ node }) {
        if (node.type === "JSXElement") {
          if (
            node.openingElement.attributes.some(
              (attr) => attr.type !== "JSXSpreadAttribute" && attr.name.name === KEY_DATA
            )
          )
            return;

          const insertPosition =
            node.openingElement.end! - (node.openingElement.selfClosing ? 2 : 1);
          const { line, column } = node.loc!.start;

          const content = ` ${KEY_DATA}="${relativePath}:${line}:${column}"`;

          magicCode.prependLeft(insertPosition, content);
        }
      },
    });
    resolve(magicCode.toString());
  });
};

export const filterInspectorOverlay = (filePath: string) => filePath.match("InspectorOverlay.jsx");

export async function compile(
  code: string,
  filePath: string,
  { port, enabled, injectClientEntryFile }: CompileOptions
) {
  if (filterInspectorOverlay(filePath!)) return code;
  console.log("compile", filePath, injectClientEntryFile);

  let magicCode = new MagicString(code);

  magicCode = injectClient({
    parseCode: magicCode,
    filePath,
    port,
    enabled,
    injectClientEntryFile,
  });

  const result = await injectInspectorInDom(code, filePath!, magicCode);

  return result;
}
