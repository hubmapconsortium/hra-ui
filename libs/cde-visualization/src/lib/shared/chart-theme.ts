import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, DestroyRef, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { rgbToHex } from '@hra-ui/design-system/color-picker';
import { map } from 'rxjs';
import { View } from 'vega';

/** Chart colors and font, read from the theme's CSS custom properties */
export interface ChartTheme {
  /** Chart background color */
  background: string;
  /** Font family for axis and legend text */
  font: string;
  /** Color of axis, header, and legend titles */
  titleColor: string;
  /** Color of axis, header, and legend labels */
  labelColor: string;
  /** Color of grid lines */
  gridColor: string;
  /** Color of outlines, box plots, and series without their own color */
  markColor: string;
}

/** Chart theme colors */
type ChartThemeColor = Exclude<keyof ChartTheme, 'font'>;

/** Vega-Lite spec properties set from the chart theme */
export interface ThemeableChartSpec {
  /** Spec params, including the theme color params */
  params: { name: string; value?: unknown }[];
  /** Chart configuration */
  config: {
    /** Font family */
    font: string;
  };
}

/** Theme token and fallback value for each chart theme property */
const CHART_THEME_TOKENS: Record<keyof ChartTheme, [token: string, fallback: string]> = {
  background: ['--mat-sys-surface-container-low', '#fcfcfc'],
  font: ['--mat-sys-label-medium-font', 'Metropolis'],
  titleColor: ['--mat-sys-on-surface', '#201e3d'],
  labelColor: ['--mat-sys-on-surface-variant', '#4b4b5e'],
  gridColor: ['--mat-sys-outline-variant', '#dddddd'],
  markColor: ['--mat-sys-on-surface', '#000000'],
};

/** Spec param (Vega signal) holding each chart theme color */
const CHART_THEME_PARAMS: Record<ChartThemeColor, string> = {
  background: 'themeBackground',
  titleColor: 'themeTitleColor',
  labelColor: 'themeLabelColor',
  gridColor: 'themeGridColor',
  markColor: 'themeMarkColor',
};

/** Matches the `rgb()` and `rgba()` colors that `getComputedStyle` returns */
const RGB_COLOR = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/;

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
  const [fontToken, fontFallback] = CHART_THEME_TOKENS.font;

  return {
    background: resolveColor(el, CHART_THEME_TOKENS.background),
    font: styles.getPropertyValue(fontToken).trim() || fontFallback,
    titleColor: resolveColor(el, CHART_THEME_TOKENS.titleColor),
    labelColor: resolveColor(el, CHART_THEME_TOKENS.labelColor),
    gridColor: resolveColor(el, CHART_THEME_TOKENS.gridColor),
    markColor: resolveColor(el, CHART_THEME_TOKENS.markColor),
  };
}

/**
 * Resolves a color token to a hex color.
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
  const match = RGB_COLOR.exec(color);
  return match ? rgbToHex([Number(match[1]), Number(match[2]), Number(match[3])]) : fallback;
}

/**
 * Sets the font and the initial theme colors of a spec from a chart theme.
 * Mutates the spec, so call it on an immer draft.
 *
 * @param spec Spec draft to update
 * @param theme Chart theme to apply
 */
export function applyChartTheme(spec: ThemeableChartSpec, theme: ChartTheme): void {
  spec.config.font = theme.font;
  for (const param of spec.params) {
    const color = getThemeColorKey(param.name);
    if (color) {
      param.value = theme[color];
    }
  }
}

/**
 * Updates the theme colors of a rendered chart in place.
 * Only the colors are re-encoded, so data transforms such as binning and density estimates don't run again.
 *
 * @param view Vega view of a spec with the theme color params
 * @param theme Chart theme to apply
 */
export function updateChartTheme(view: View, theme: ChartTheme): void {
  for (const [color, name] of Object.entries(CHART_THEME_PARAMS)) {
    view.signal(name, theme[color as ChartThemeColor]);
  }
  view.run();
}

/**
 * Finds the chart theme color a spec param holds
 *
 * @param name Param name
 * @returns The chart theme color, or undefined if the param doesn't hold one
 */
function getThemeColorKey(name: string): ChartThemeColor | undefined {
  const entry = Object.entries(CHART_THEME_PARAMS).find(([, param]) => param === name);
  return entry?.[0] as ChartThemeColor | undefined;
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
