import { TooltipHandler, View } from 'vega';

/** Vega view, with the tooltip handler getter that its typings leave out */
type TooltipHandlerView = View & { tooltip(): TooltipHandler };

/** Id of the element vega-tooltip shows tooltips in */
const TOOLTIP_ELEMENT_ID = 'vg-tooltip-element';

/**
 * Sets up a chart's tooltips. After each tooltip update, the tooltip element:
 * - Moves into the overlay holding the chart, such as a fullscreen view, or back to the body.
 *   vega-tooltip appends its element to the body, but CDK overlays open in the browser's top layer,
 *   which covers the rest of the page whatever its z-index.
 * - Takes the chart's font. The body is outside the app element that holds the theme's font tokens,
 *   so the tooltip can't read the font from the stylesheet.
 *
 * @param view Vega view using vega-embed's tooltip handler
 */
export function setUpChartTooltips(view: View): void {
  const tooltip = (view as TooltipHandlerView).tooltip();
  view.tooltip(function (this: unknown, handler, event, item, value) {
    tooltip.call(this, handler, event, item, value);

    const chart = view.container();
    const el = (chart?.ownerDocument ?? document).getElementById(TOOLTIP_ELEMENT_ID);
    if (chart && el) {
      moveTooltipElement(el, chart);
      matchChartFont(el, chart);
    }
  });
}

/**
 * Moves the tooltip element into the overlay holding a chart,
 * or into the fullscreen element or body when the chart is not in an overlay
 *
 * @param el Tooltip element
 * @param chart Element the chart is rendered in
 */
function moveTooltipElement(el: HTMLElement, chart: HTMLElement): void {
  const doc = chart.ownerDocument;
  const overlay = chart.closest('.cdk-overlay-pane')?.parentElement;
  const parent = overlay ?? doc.fullscreenElement ?? doc.body;
  if (el.parentElement !== parent) {
    parent.appendChild(el);
  }
}

/**
 * Sets the tooltip element's font family to the one the chart's container uses
 *
 * @param el Tooltip element
 * @param chart Element the chart is rendered in
 */
function matchChartFont(el: HTMLElement, chart: HTMLElement): void {
  const font = getComputedStyle(chart).fontFamily;
  if (font && el.style.fontFamily !== font) {
    el.style.fontFamily = font;
  }
}
