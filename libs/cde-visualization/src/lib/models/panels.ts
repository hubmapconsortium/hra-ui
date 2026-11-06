/** Panels that the toolbar's Panels menu shows and hides, in layout order. The cell types panel always shows. */
export const PANEL_IDS = ['metadata', 'distance-visualization', 'violin-graph', 'histogram'] as const;

/** Id of a panel */
export type PanelId = (typeof PANEL_IDS)[number];

/** Local storage key for the hidden panels, when the visualization remembers them */
export const HIDDEN_PANELS_STORAGE_KEY = 'cde-visualization-hidden-panels';

/**
 * Reads hidden panels from an array or a comma or space separated string. Unknown ids are dropped.
 *
 * @param value Panel ids
 * @returns Hidden panels in layout order
 */
export function parseHiddenPanels(value: unknown): PanelId[] {
  const items = Array.isArray(value) ? value : typeof value === 'string' ? value.split(/[\s,]+/) : [];
  return PANEL_IDS.filter((id) => items.includes(id));
}

/**
 * Reads the remembered hidden panels from local storage
 *
 * @returns Hidden panels, or undefined if none are stored
 */
export function loadHiddenPanels(): PanelId[] | undefined {
  try {
    const value = localStorage.getItem(HIDDEN_PANELS_STORAGE_KEY);
    return value === null ? undefined : parseHiddenPanels(JSON.parse(value));
  } catch {
    return undefined;
  }
}

/**
 * Remembers the hidden panels in local storage
 *
 * @param panels Hidden panels
 */
export function saveHiddenPanels(panels: PanelId[]): void {
  try {
    localStorage.setItem(HIDDEN_PANELS_STORAGE_KEY, JSON.stringify(panels));
  } catch {
    // Storage is unavailable, for example when site data is blocked. The layout lasts until reload.
  }
}
