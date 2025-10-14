import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

/** Builtin breakpoints */
const Breakpoints = {
    Mobile: '(max-width: 639.98px)',
    Desktop: '(min-width: 640px) and (max-width: 1920.98px)',
    LargeDesktop: '(min-width: 1921px)',
};

/** State produced by `watchBreakpoints` */
class BreakpointWatchState {
    /**
     * Initialize the state
     *
     * @param state The underlying state provided by @angular/cdk
     * @param mapping Mapping from breakpoint names to queries
     */
    constructor(state, mapping) {
        this.state = state;
        this.mapping = mapping;
    }
    /**
     * Checks whether at least one query matches
     *
     * @returns true if any matches, false otherwise
     */
    matchesAny() {
        return this.state.matches;
    }
    /**
     * Checks whether the specific query matches
     *
     * @param query The query to check
     * @returns true if the query matches, false otherwise
     */
    matchesQuery(query) {
        return this.state.breakpoints[query] ?? false;
    }
    /**
     * Checks whether a specific breakpoint matches
     *
     * @param breakpoint The breakpoint to check
     * @returns true if the breakpoint matches, false otherwise
     */
    matchesBreakpoint(breakpoint) {
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
function watchBreakpoint(query) {
    const watcher = watchBreakpoints([query]);
    return computed(() => watcher().matchesAny());
}
/**
 * Watch multiple queries or breakpoints.
 *
 * @param arg A list of queries or mapping from breakpoints to queries
 * @returns A signal containing the latest watch state
 */
function watchBreakpoints(arg = Breakpoints) {
    const mapping = Array.isArray(arg) ? {} : arg;
    const queries = Array.isArray(arg) ? arg : Object.values(arg);
    const breakpoints$ = inject(BreakpointObserver).observe(queries);
    const state$ = breakpoints$.pipe(map((state) => new BreakpointWatchState(state, mapping)));
    return toSignal(state$, { requireSync: true });
}

/**
 * Generated bundle index. Do not edit.
 */

export { BreakpointWatchState, Breakpoints, watchBreakpoint, watchBreakpoints };
//# sourceMappingURL=hra-ui-cdk-breakpoints.mjs.map
