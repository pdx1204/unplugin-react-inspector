export interface Options {
  /**
   * Port number
   * @default 3000
   */
  port?: number;

  /**
   * Entry file path
   * @default "src/main.{tsx, jsx}"
   */
  entryFile?: string;
  /**
   * Default enable state
   * @default false
   */
  enabled?: boolean;
}

export interface CompileOptions {
  code: string;
  id?: string;
}
