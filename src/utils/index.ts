export const isArray = (value: unknown) =>
  Object.prototype.toString.call(value) === "[object Array]";
