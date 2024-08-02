import { AnyBrand } from '../models/brand';

/**
 * Transforms an input value by adding a brand.
 * This function does not change the value at runtime.
 * It is a compile time type change only.
 *
 * @returns A transform function
 */
export function brandAttribute<T, const BrandT extends AnyBrand>(): (value: T) => T & BrandT {
  return (value) => value as T & BrandT;
}

/**
 * Same as angular's `numberAttribute` except it takes the fallback value first and
 * returns a transform function making the fallback parameter actually useful.
 * It also accepts any type as the fallback so undefined etc. can more easily be
 * used instead of NaN.
 *
 * @returns A transform function
 * @see {@link https://github.com/angular/angular/blob/17.3.9/packages/core/src/util/coercion.ts#L38}
 */
export function numberAttribute(): (value: unknown) => number | undefined;
/**
 * Same as angular's `numberAttribute` except it takes the fallback value first and
 * returns a transform function making the fallback parameter actually useful.
 * It also accepts any type as the fallback so undefined etc. can more easily be
 * used instead of NaN.
 */
export function numberAttribute<FallbackT>(fallback: FallbackT): (value: unknown) => number | FallbackT;
/**
 * Same as angular's `numberAttribute` except it takes the fallback value first and
 * returns a transform function making the fallback parameter actually useful.
 * It also accepts any type as the fallback so undefined etc. can more easily be
 * used instead of NaN.
 */
export function numberAttribute<FallbackT>(fallback?: FallbackT): (value: unknown) => number | FallbackT | undefined {
  return (value) => {
    const isNumberValue = !isNaN(parseFloat(value as string)) && !isNaN(Number(value));
    return isNumberValue ? Number(value) : fallback;
  };
}
