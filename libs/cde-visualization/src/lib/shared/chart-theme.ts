import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, DestroyRef, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { rgbToHex } from '@hra-ui/design-system/color-picker';
import { map } from 'rxjs';
import { View } from 'vega';

/** Chart font, read from the theme's body medium type token */
export interface ChartFont {
  /** Font family for all chart text */
  font: string;
  /** Font size in pixels */
  fontSize: number;
  /** Font weight */
  fontWeight: number;
  /** Line height in pixels */
  lineHeight: number;
}

/** Chart colors and font, read from the theme's CSS custom properties */
export interface ChartTheme extends ChartFont {
  /** Chart background color */
  background: string;
  /** Color of axis, header, and legend titles */
  titleColor: string;
  /** Color of axis, header, and legend labels */
  labelColor: string;
  /** Color of grid lines */
  gridColor: string;
  /** Color of violin outlines and series without their own color */
  markColor: string;
}

/** Chart theme colors */
type ChartThemeColor = Exclude<keyof ChartTheme, keyof ChartFont>;

/** Font size, weight, and line height of chart labels and titles */
interface ChartTextConfig {
  /** Label font size */
  labelFontSize?: number;
  /** Title font size */
  titleFontSize?: number;
  /** Label font weight */
  labelFontWeight?: number;
  /** Title font weight */
  titleFontWeight?: number;
  /** Label line height */
  labelLineHeight?: number;
  /** Title line height */
  titleLineHeight?: number;
}

/** Font size, weight, and line height of legend labels and titles. Vega legends have no label line height. */
type ChartLegendTextConfig = Omit<ChartTextConfig, 'labelLineHeight'>;

/** Chart title type, in Vega's title config */
interface ChartTitleConfig {
  /** Font size */
  fontSize?: number;
  /** Font weight */
  fontWeight?: number;
  /** Line height */
  lineHeight?: number;
}

/** Vega-Lite spec properties set from the chart theme */
export interface ThemeableChartSpec {
  /** Spec params, including the theme color params */
  params: { name: string; value?: unknown }[];
  /** Chart configuration */
  config: {
    /** Font family */
    font: string;
    /** Axis text configuration */
    axis: ChartTextConfig;
    /** Facet header text configuration */
    header?: ChartTextConfig;
    /** Legend text configuration, used by legends in exported images */
    legend?: ChartLegendTextConfig;
    /** Chart title configuration, themed when the spec has one */
    title?: ChartTitleConfig;
  };
}

/** Type token used for all chart text */
const CHART_FONT_TOKEN = '--mat-sys-body-medium';

/** Chart font to use if the type token is not set: body medium in the AtlasNG HRA theme */
const CHART_FONT_FALLBACK: ChartFont = { font: 'Nunito Sans Variable', fontSize: 14, fontWeight: 400, lineHeight: 21 };

/** Theme token and fallback value for each chart theme color. Fallbacks are the AtlasNG HRA light theme's values. */
const CHART_THEME_TOKENS: Record<ChartThemeColor, [token: string, fallback: string]> = {
  background: ['--mat-sys-background', '#fcfbfd'],
  titleColor: ['--mat-sys-on-surface', '#1a1c1e'],
  labelColor: ['--mat-sys-on-surface-variant', '#414751'],
  gridColor: ['--mat-sys-outline-variant', '#c1c7d4'],
  markColor: ['--mat-sys-on-surface', '#1a1c1e'],
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
 * Properties whose token is not set use the AtlasNG HRA light theme's value.
 *
 * @param el Element to read the computed styles of
 * @returns The chart theme
 */
export function getChartTheme(el: Element): ChartTheme {
  return {
    ...resolveFont(el),
    background: resolveColor(el, CHART_THEME_TOKENS.background),
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
 * Resolves the chart type token to the font family, size, weight, and line height Vega needs.
 * The token is applied to a hidden probe element and its computed font is read back.
 *
 * @param el Element whose tokens are used
 * @returns The resolved font
 */
function resolveFont(el: Element): ChartFont {
  const { font, fontSize, fontWeight, lineHeight } = CHART_FONT_FALLBACK;
  const probe = el.ownerDocument.createElement('span');
  probe.style.display = 'none';
  probe.style.font = `var(${CHART_FONT_TOKEN}, ${fontWeight} ${fontSize}px/${lineHeight}px ${font})`;
  el.appendChild(probe);

  const styles = getComputedStyle(probe);
  const resolved = {
    font: styles.fontFamily,
    fontSize: Number.parseFloat(styles.fontSize),
    fontWeight: Number.parseFloat(styles.fontWeight),
    lineHeight: Number.parseFloat(styles.lineHeight),
  };
  probe.remove();

  // Environments that don't resolve CSS variables, such as jsdom, return no usable font
  if (!resolved.font || !Number.isFinite(resolved.fontSize)) {
    return CHART_FONT_FALLBACK;
  }

  return {
    font: resolved.font,
    fontSize: resolved.fontSize,
    fontWeight: Number.isFinite(resolved.fontWeight) ? resolved.fontWeight : fontWeight,
    lineHeight: Number.isFinite(resolved.lineHeight) ? resolved.lineHeight : Math.round(resolved.fontSize * 1.5),
  };
}

/**
 * Sets the font and the initial theme colors of a spec from a chart theme.
 * All chart labels and titles use the theme's body medium type.
 * Mutates the spec, so call it on an immer draft.
 *
 * @param spec Spec draft to update
 * @param theme Chart theme to apply
 */
export function applyChartTheme(spec: ThemeableChartSpec, theme: ChartTheme): void {
  const text: ChartTextConfig = {
    labelFontSize: theme.fontSize,
    titleFontSize: theme.fontSize,
    labelFontWeight: theme.fontWeight,
    titleFontWeight: theme.fontWeight,
    labelLineHeight: theme.lineHeight,
    titleLineHeight: theme.lineHeight,
  };

  spec.config.font = theme.font;
  Object.assign(spec.config.axis, text);
  spec.config.header = { ...spec.config.header, ...text };
  spec.config.legend = {
    ...spec.config.legend,
    labelFontSize: theme.fontSize,
    titleFontSize: theme.fontSize,
    labelFontWeight: theme.fontWeight,
    titleFontWeight: theme.fontWeight,
    titleLineHeight: theme.lineHeight,
  };
  if (spec.config.title) {
    spec.config.title = {
      ...spec.config.title,
      fontSize: theme.fontSize,
      fontWeight: theme.fontWeight,
      lineHeight: theme.lineHeight,
    };
  }
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
