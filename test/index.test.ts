import { describe, expect, test } from "@jest/globals";

import { a, b } from "../src/index";

describe("test index.ts", () => {
  test("test a fn", () => {
    expect(a("张三", 12)).toMatchObject({ name: "张三", age: 12 });
    expect(a("李四", 12)).toMatchObject({ name: "李四", age: 12 });
  });
  test("test b fn", () => {
    expect(b()).not.toBe("Hello");
    expect(b()).toEqual("Hello World");
  });
});
