import MagicString from "magic-string";

export interface UserOptions {
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

export interface CompileOptions {
  port?: number;
  enabled?: boolean;
  injectClientEntryFile?: string | string[] | RegExp;
}

export type InjectClientOptions = Omit<CompileOptions, "code"> & {
  parseCode: MagicString;
  filePath: string;
};

export type InspectorOptions = {
  dataKey: string;
  port: number | undefined;
  enabled: boolean | undefined;
};
