/** Name of a single builtin breakpoint */
export type Breakpoint = keyof typeof Breakpoints;

/** Builtin breakpoints */
export const Breakpoints = {
  Mobile: '(max-width: 639.98px)',
  Desktop: '(min-width: 640px) and (max-width: 1920.98px)',
  LargeDesktop: '(min-width: 1921px)',
};
