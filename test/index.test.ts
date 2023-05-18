import { filterInspectorOverlay } from "./../src/core/unplugin";
import { describe, expect, test } from "@jest/globals";

import { compile } from "../src/core/compiler";

describe("test core fn", () => {
  test("test compile fn", async () => {
    const result = await compile(
      "function hello() { console.log('hello'); return (<div>111111</div>); }",
      "src/App.tsx",
      {
        port: 3000,
        enabled: true,
        injectClientEntryFile: "src/main.tsx",
      }
    );
    expect(result).toBe(
      `function hello() { console.log('hello'); return (<div data-inspector="src/App.tsx:1:49">111111</div>); }`
    );
  });
  test("test filterInspectorOverlay fn", async () => {
    expect(!filterInspectorOverlay("InspectorOverlay.jsx")).toBe(true);
    expect(!filterInspectorOverlay("Inspector.jsx")).toBe(true);
  });
});
