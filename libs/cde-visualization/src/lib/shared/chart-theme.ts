import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, DestroyRef, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

/** Chart colors and font, read from the theme's CSS custom properties */
export interface ChartTheme {
  /** Chart background color */
  background: string;
  /** Font family for axis and legend text */
  font: string;
  /** Color of axis and legend titles */
  titleColor: string;
  /** Color of axis and legend labels */
  labelColor: string;
}

/** Vega-Lite spec properties set from the chart theme */
export interface ThemeableChartSpec {
  /** Chart background color */
  background: string;
  /** Chart configuration */
  config: {
    /** Font family */
    font: string;
    /** Axis configuration */
    axis: {
      /** Axis title color */
      titleColor: string;
      /** Axis label color */
      labelColor: string;
    };
  };
}

/** Theme token and fallback value for each chart theme property */
const CHART_THEME_TOKENS: Record<keyof ChartTheme, [token: string, fallback: string]> = {
  background: ['--mat-sys-surface-container-low', '#fcfcfc'],
  font: ['--mat-sys-label-medium-font', 'Metropolis'],
  titleColor: ['--mat-sys-on-surface', '#201e3d'],
  labelColor: ['--mat-sys-on-surface-variant', '#4b4b5e'],
};

/** Media query matching a system preference for dark colors */
const PREFERS_DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * Reads the chart theme from the CSS custom properties in effect on an element.
 * Properties whose token is not set use the default HRA value.
 *
 * @param el Element to read the computed styles of
 * @returns The chart theme
 */
export function getChartTheme(el: Element): ChartTheme {
  const styles = getComputedStyle(el);
  const read = ([token, fallback]: [string, string]) => styles.getPropertyValue(token).trim() || fallback;

  return {
    background: resolveColor(el, CHART_THEME_TOKENS.background),
    font: read(CHART_THEME_TOKENS.font),
    titleColor: resolveColor(el, CHART_THEME_TOKENS.titleColor),
    labelColor: resolveColor(el, CHART_THEME_TOKENS.labelColor),
  };
}

/**
 * Resolves a color token to a color value that Vega can parse.
 * Color tokens can hold `light-dark()` values, which only the browser can resolve,
 * so the token is applied to a hidden probe element and its computed color is read back.
 *
 * @param el Element whose color scheme and tokens are used
 * @param tokenAndFallback Token to resolve and the color to use if it is not set
 * @returns The resolved color
 */
function resolveColor(el: Element, [token, fallback]: [string, string]): string {
  const probe = el.ownerDocument.createElement('span');
  probe.style.display = 'none';
  probe.style.color = `var(${token}, ${fallback})`;
  el.appendChild(probe);

  const color = getComputedStyle(probe).color;
  probe.remove();
  // Environments that don't resolve CSS variables, such as jsdom, return the value unresolved
  return color && !color.startsWith('var(') ? color : fallback;
}

/**
 * Sets the background, font, and axis colors of a spec from a chart theme.
 * Mutates the spec, so call it on an immer draft.
 *
 * @param spec Spec draft to update
 * @param theme Chart theme to apply
 */
export function applyChartTheme(spec: ThemeableChartSpec, theme: ChartTheme): void {
  spec.background = theme.background;
  spec.config.font = theme.font;
  spec.config.axis.titleColor = theme.titleColor;
  spec.config.axis.labelColor = theme.labelColor;
}

/**
 * Watches what decides whether theme colors resolve to their light or dark values:
 * the system color scheme preference and the `color-scheme` of the document's root element.
 * Must be called in an injection context.
 *
 * @returns A signal whose value changes when either one changes
 */
export function watchColorScheme(): Signal<string> {
  const root = inject(DOCUMENT).documentElement;
  const prefersDark$ = inject(BreakpointObserver).observe(PREFERS_DARK_QUERY);
  const prefersDark = toSignal(prefersDark$.pipe(map((state) => state.matches)), { requireSync: true });
  const readRootColorScheme = () => getComputedStyle(root).colorScheme ?? '';
  const rootColorScheme = signal(readRootColorScheme());
  const observer = new MutationObserver(() => rootColorScheme.set(readRootColorScheme()));

  observer.observe(root, { attributes: true });
  inject(DestroyRef).onDestroy(() => observer.disconnect());
  return computed(() => `${rootColorScheme()} ${prefersDark() ? 'dark' : 'light'}`);
}
