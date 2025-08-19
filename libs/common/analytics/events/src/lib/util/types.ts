/**
 * Unique symbol type used to store the brand on a type.
 * Doesn't need to be initialized as it should only ever be used as a type.
 */
declare const BRAND: unique symbol;

/** A brand type */
export type Brand<T extends string> = { [BRAND]: { [K in T]: true } };

/** Tiny helper to prettify intersection types */
export type Prettify<T> = { [K in keyof T]: T[K] };
