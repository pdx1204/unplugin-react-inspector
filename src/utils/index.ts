// 统一路径分隔符
export const normalizePath = (path: string) => path.replace(/\\/g, "/");

export const isArray = (value: unknown) =>
  Object.prototype.toString.call(value) === "[object Array]";
