import { describe, expect, test } from "@jest/globals";

import { compile } from "../src/core/compiler";

describe("test compiler.ts", () => {
  test("test compile fn", async () => {
    const result = await compile({
      code: "function hello() { console.log('hello'); return (<div>111111</div>); }",
    });
    expect(result).toBe(
      `function hello() { console.log('hello'); return (<div data-v-inspector="1:49">111111</div>); }`
    );
  });
});
