export interface Options {
  /**
   * Port number
   * @default 3000
   */
  port?: number;
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
