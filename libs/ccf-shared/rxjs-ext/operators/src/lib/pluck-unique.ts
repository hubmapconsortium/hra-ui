/* eslint-disable max-len */
import { OperatorFunction } from 'rxjs';
import { distinctUntilChanged, pluck, shareReplay } from 'rxjs/operators';

/**
 * Options for `pluckUnique` operator
 */
export interface PluckUniqueOptions<T> {
  /**
   * Custom comparison for determining distinct values
   */
  compare?: (lhs: T, rhs: T) => boolean;
}

/**
 * Default options
 */
const DEFAULT_OPTIONS: PluckUniqueOptions<unknown> = {};

/**
 * Combines the functionaliy of `pluck` and `distinctUntilChanged`
 * as well as adding a `shareReplay`.
 *
 * @param k1 Key 1
 * @param [opts] Additional options
 * @returns An `Observable` operator
 */
export function pluckUnique<T, K1 extends keyof T>(
  k1: K1,
  opts?: PluckUniqueOptions<T[K1]>,
): OperatorFunction<T, T[K1]>;
/**
 * Combines the functionaliy of `pluck` and `distinctUntilChanged`
 * as well as adding a `shareReplay`.
 *
 * @param k1 Key 1
 * @param k2 Key 2
 * @param [opts] Additional options
 * @returns An `Observable` operator
 */
export function pluckUnique<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  k1: K1,
  k2: K2,
  opts?: PluckUniqueOptions<T[K1][K2]>,
): OperatorFunction<T, T[K1][K2]>;
/**
 * Combines the functionaliy of `pluck` and `distinctUntilChanged`
 * as well as adding a `shareReplay`.
 *
 * @param k1 Key 1
 * @param k2 Key 2
 * @param k3 Key 3
 * @param [opts] Additional options
 * @returns An `Observable` operator
 */
export function pluckUnique<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  k1: K1,
  k2: K2,
  k3: K3,
  opts?: PluckUniqueOptions<T[K1][K2][K3]>,
): OperatorFunction<T, T[K1][K2][K3]>;
/**
 * Combines the functionaliy of `pluck` and `distinctUntilChanged`
 * as well as adding a `shareReplay`.
 *
 * @param k1 Key 1
 * @param k2 Key 2
 * @param k3 Key 3
 * @param k4 Key 4
 * @param [opts] Additional options
 * @returns An `Observable` operator
 */
export function pluckUnique<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
>(k1: K1, k2: K2, k3: K3, k4: K4, opts?: PluckUniqueOptions<T[K1][K2][K3][K4]>): OperatorFunction<T, T[K1][K2][K3][K4]>;
/**
 * Combines the functionaliy of `pluck` and `distinctUntilChanged`
 * as well as adding a `shareReplay`.
 *
 * @param k1 Key 1
 * @param k2 Key 2
 * @param k3 Key 3
 * @param k4 Key 4
 * @param k5 Key 5
 * @param [opts] Additional options
 * @returns An `Observable` operator
 */
export function pluckUnique<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  opts?: PluckUniqueOptions<T[K1][K2][K3][K4][K5]>,
): OperatorFunction<T, T[K1][K2][K3][K4][K5]>;
/**
 * Combines the functionaliy of `pluck` and `distinctUntilChanged`
 * as well as adding a `shareReplay`.
 *
 * @param k1 Key 1
 * @param k2 Key 2
 * @param k3 Key 3
 * @param k4 Key 4
 * @param k5 Key 5
 * @param k6 Key 6
 * @param [opts] Additional options
 * @returns An `Observable` operator
 */
export function pluckUnique<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6,
  opts?: PluckUniqueOptions<T[K1][K2][K3][K4][K5][K6]>,
): OperatorFunction<T, T[K1][K2][K3][K4][K5][K6]>;
/**
 * Combines the functionaliy of `pluck` and `distinctUntilChanged`
 * as well as adding a `shareReplay`.
 *
 * @param {...string} props Properties to pluck
 * @returns An `Observable` operator
 */
export function pluckUnique<T, R>(...props: [string, ...string[]]): OperatorFunction<T, R>;
/**
 * Combines the functionaliy of `pluck` and `distinctUntilChanged`
 * as well as adding a `shareReplay`.
 *
 * @param {...string} props Properties to pluck
 * @param [opts] Additional options
 * @returns An `Observable` operator
 */
export function pluckUnique<T, R>(...props: [string, ...string[], PluckUniqueOptions<R>]): OperatorFunction<T, R>;
/**
 * Combines the functionaliy of `pluck` and `distinctUntilChanged`
 * as well as adding a `shareReplay`.
 *
 * @param {...string} props Properties to and options
 * @returns An `Observable` operator
 */
export function pluckUnique(...props: unknown[]): OperatorFunction<unknown, unknown> {
  const last = props[props.length - 1];
  let keys = props as string[];
  let opts = DEFAULT_OPTIONS;

  if (typeof last === 'object') {
    opts = last as PluckUniqueOptions<unknown>;
    keys = keys.slice(0, -1);
  }

  return (source) => source.pipe(pluck(...keys), distinctUntilChanged(opts.compare), shareReplay(1));
}
