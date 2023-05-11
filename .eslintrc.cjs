module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["@qiuqfang/basic", "@qiuqfang/react", "@qiuqfang/typescript"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
};
