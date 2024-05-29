/** Brand type key. No need to initialize */
declare const BRAND: unique symbol;

/** A brand that can be attached to different type to model nominal typing */
export type Brand<T extends string | number | symbol> = { [BRAND]: { [P in T]: true } };

/** Any brand type */
export type AnyBrand = Brand<string | number | symbol>;
