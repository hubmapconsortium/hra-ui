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
  labelColor: ['--mat-sys-on-secondary-fixed', '#4b4b5e'],
};

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
    background: read(CHART_THEME_TOKENS.background),
    font: read(CHART_THEME_TOKENS.font),
    titleColor: read(CHART_THEME_TOKENS.titleColor),
    labelColor: read(CHART_THEME_TOKENS.labelColor),
  };
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
