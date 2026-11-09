/** Action of an undo or redo shortcut */
export type HistoryShortcut = 'undo' | 'redo';

/** Labels of the shortcuts, shown in tooltips */
export interface HistoryShortcutLabels {
  /** Undo shortcut */
  undo: string;
  /** Redo shortcut */
  redo: string;
}

/** Keys of the shortcuts, for aria-keyshortcuts */
export const HISTORY_SHORTCUT_KEYS: HistoryShortcutLabels = {
  undo: 'Control+Z Meta+Z',
  redo: 'Control+Y Control+Shift+Z Meta+Shift+Z',
};

/**
 * Gets the action of an undo or redo shortcut. Ctrl or ⌘ with Z undoes. Ctrl+Y, or Shift with Ctrl or ⌘ and Z,
 * redoes. ⌘+Y is left alone, since browsers on Macs use it.
 *
 * @param event Key press
 * @returns The shortcut's action, or undefined for other keys
 */
export function getHistoryShortcut(event: KeyboardEvent): HistoryShortcut | undefined {
  if (event.altKey || !(event.ctrlKey || event.metaKey)) {
    return undefined;
  }

  const key = event.key.toLowerCase();
  if (key === 'z') {
    return event.shiftKey ? 'redo' : 'undo';
  } else if (key === 'y' && event.ctrlKey && !event.shiftKey) {
    return 'redo';
  }
  return undefined;
}

/**
 * Gets the shortcut labels for the platform: ⌘ on Apple devices and Ctrl elsewhere
 *
 * @param userAgent User agent of the browser
 * @returns Shortcut labels
 */
export function getHistoryShortcutLabels(userAgent = globalThis.navigator?.userAgent ?? ''): HistoryShortcutLabels {
  return /Mac|iPhone|iPad|iPod/.test(userAgent) ? { undo: '⌘Z', redo: '⇧⌘Z' } : { undo: 'Ctrl+Z', redo: 'Ctrl+Y' };
}
