const { rspackPlugin } = require("../../dist/index.cjs");

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: "./src/main.tsx",
  },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
  },
  plugins: [rspackPlugin()],
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
    ],
  },
  devServer: {
    open: true,
  },
};
