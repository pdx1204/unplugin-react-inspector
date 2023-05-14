# unplugin-react-inspector

## Introduction

Open the editor by clicking on the browser element,A plugin to improve the happiness index of react development.


## Install

```bash
npm i -D unplugin-react-inspector
```

## Usage

### Configuration Vite

```javascript
import { vitePlugin as reactInspectorPlugin } from "unplugin-react-inspector";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      ...
      reactInspectorPlugin({ enabled: true })
  ],
});

```

### Configuration Webpack

```javascript
const { webpackPlugin: reactInspectorPlugin } = require("unplugin-react-inspector");

module.exports = {
  plugins: [
      ...
      reactInspectorPlugin({ enabled: true })
  ],
};
```



### Configuration Rspack

```javascript
const { rspackPlugin: reactInspectorPlugin } = require("unplugin-react-inspector");

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  plugins: [
      ...
      reactInspectorPlugin({ enabled: true })
  ],
};

```

### Options

```typescript
interface Options {
  /**
   * Entry file path
   * @example
   * "src/main.tsx"
   * ["src/main.tsx", "src/main.jsx"],
   * /(src\/main\.tsx)|(src\/main\.jsx)/
   * @default "src/main.tsx"
   */
  injectClientEntryFile?: string | string[] | RegExp;

  /**
   * Default enable state
   * @default false
   */
  enabled?: boolean;
}
```

