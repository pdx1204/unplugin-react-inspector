/* eslint-disable @typescript-eslint/no-non-null-assertion */
import MagicString from "magic-string";
import { parse as babelParse, traverse as babelTraverse } from "@babel/core";
import { CompileOptions } from "../types";
import path from "path";

import { KEY_DATA } from "./constants";

export async function compile({ code, id }: CompileOptions) {
  const s = new MagicString(code);
  if (id!.match(/(main\.jsx)|(main\.tsx)/)) {
    s.prepend(
      `import { createClient } from "unplugin-react-inspector/client";\n createClient('${KEY_DATA}');\n`
    );
    return s.toString();
  }
  const relativePath = path.relative(process.cwd(), id as string);
  const result = await new Promise((resolve) => {
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

          s.prependLeft(insertPosition, content);
        }
      },
    });
    resolve(s.toString());
  });

  return result as string;
}
