export const BUILTIN_PARSERS = {
  boolean: (value: unknown): boolean => `${value}` !== 'false',
  json: (value: unknown): unknown => (typeof value === 'string' ? JSON.parse(value) : value),
  stringArray: (value: unknown): unknown =>
    typeof value === 'string' ? Array.from(value).filter((item) => !'[], '.includes(item)) : value,
  function: (value: unknown) => {
    if (typeof value !== 'function') {
      throw new Error('Expected a javascript function');
    }

    return value;
  },
};
