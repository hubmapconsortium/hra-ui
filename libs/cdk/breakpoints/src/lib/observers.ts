import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Breakpoint, Breakpoints } from './breakpoints';

/** State produced by `watchBreakpoints` */
export class BreakpointWatchState<T extends string = never> {
  /**
   * Initialize the state
   *
   * @param state The underlying state provided by @angular/cdk
   * @param mapping Mapping from breakpoint names to queries
   */
  constructor(
    private readonly state: BreakpointState,
    private readonly mapping: Record<T, string>,
  ) {}

  /**
   * Checks whether at least one query matches
   *
   * @returns true if any matches, false otherwise
   */
  matchesAny(): boolean {
    return this.state.matches;
  }

  /**
   * Checks whether the specific query matches
   *
   * @param query The query to check
   * @returns true if the query matches, false otherwise
   */
  matchesQuery(query: string): boolean {
    return this.state.breakpoints[query] ?? false;
  }

  /**
   * Checks whether a specific breakpoint matches
   *
   * @param breakpoint The breakpoint to check
   * @returns true if the breakpoint matches, false otherwise
   */
  matchesBreakpoint(breakpoint: T): boolean {
    return this.matchesQuery(this.mapping[breakpoint]);
  }
}

/**
 * Watch a single query.
 * Must be called in an injection context.
 *
 * @param query Breakpoint query to watch
 * @returns A signal with indicating when the query matches
 */
export function watchBreakpoint(query: string): Signal<boolean> {
  const watcher = watchBreakpoints([query]);
  return computed(() => watcher().matchesAny());
}

/**
 * Watch the default breakpoints.
 * Must be called in an injection context.
 *
 * @returns A signal containing the latest watch state
 */
export function watchBreakpoints(): Signal<BreakpointWatchState<Breakpoint>>;
/**
 * Watch multiple queries.
 * Must be called in an injection context.
 *
 * @param queries Queries to watch
 * @returns A signal containing the latest watch state
 */
export function watchBreakpoints(queries: string[]): Signal<BreakpointWatchState>;
/**
 * Watch multiple breakpoints.
 * Must be called in an injection context.
 *
 * @param mapping Mapping from breakpoints to queries
 * @returns A signal containing the latest watch state
 */
export function watchBreakpoints<T extends string>(mapping: Record<T, string>): Signal<BreakpointWatchState<T>>;
/**
 * Watch multiple queries or breakpoints.
 *
 * @param arg A list of queries or mapping from breakpoints to queries
 * @returns A signal containing the latest watch state
 */
export function watchBreakpoints(arg: string[] | Record<string, string> = Breakpoints): Signal<BreakpointWatchState> {
  const mapping = Array.isArray(arg) ? {} : arg;
  const queries = Array.isArray(arg) ? arg : Object.values(arg);
  const breakpoints$ = inject(BreakpointObserver).observe(queries);
  const state$ = breakpoints$.pipe(map((state) => new BreakpointWatchState(state, mapping)));
  return toSignal(state$, { requireSync: true });
}
