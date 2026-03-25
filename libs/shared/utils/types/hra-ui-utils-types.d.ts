/**
 * `any` alias. DO NOT use to type function/method parameters and return value.
 * This alias is intended to only be used in generic types in the rare cases
 * where `unknown` does not work.
 */
type Any = any;

/**
 * Any function type.
 * Primarly for use as constraint on generic types.
 */
type AnyFunction = (...args: Any[]) => Any;
/**
 * Any constructor type.
 * Primarly for use as constraint on generic types.
 */
type AnyConstructor = new (...args: Any[]) => Any;
/**
 * Any constructor type.
 * Primarly for use as constraint on generic types.
 */
type AnyAbstractConstructor = abstract new (...args: Any[]) => Any;
/**
 * Extracts the pure function signature from any function with properties.
 */
type SignatureOf<Fn extends AnyFunction> = Fn extends (...args: infer Args) => infer Res ? (...args: Args) => Res : never;

/**
 * Extract a member of a discriminated union.
 */
type UnionMember<T, K extends PropertyKey, D> = Extract<T, {
    [P in K]: D;
}>;

export type { Any, AnyAbstractConstructor, AnyConstructor, AnyFunction, SignatureOf, UnionMember };
