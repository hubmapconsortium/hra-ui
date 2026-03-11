import { InjectOptions, Injector } from '@angular/core';

/**
 * Extended `InjectOptions` for inject style functions.
 * Takes a `Strict` type parameter to simplify typing overloads for optional vs non-optional injects.
 *
 * @example
 * ```ts
 * function injectMyService(options: InjectOptionsExt<true>): MyService;
 * function injectMyService(options: InjectOptionsExt): MyService | null;
 * function injectMyService(options: InjectOptionsExt): MyService | null {
 *   // Perform injection
 * }
 * ```
 */
export type InjectOptionsExt<Strict extends boolean = false> = InjectOptions & { injector?: Injector } & {
  optional?: Strict extends true ? false : boolean;
};
