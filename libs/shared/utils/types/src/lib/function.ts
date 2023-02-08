import type { Any } from './any';

/**
 * Any function type.
 * Primarly for use as constraint on generic types.
 */
export type AnyFunction = (...args: Any[]) => Any;

/**
 * Any constructor type.
 * Primarly for use as constraint on generic types.
 */
export type AnyConstructor = new (...args: Any) => Any;

/**
 * Any constructor type.
 * Primarly for use as constraint on generic types.
 */
export type AnyAbstractConstructor = abstract new (...args: Any) => Any;

/**
 * Extracts the pure function signature from any function with properties.
 */
export type SignatureOf<Fn extends AnyFunction> = Fn extends (...args: infer Args) => infer Res
  ? (...args: Args) => Res
  : never;
