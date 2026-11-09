/** What an empty state's button does */
export type EmptyStateAction = 'select-all-cell-types' | 'undo' | 'restore-deleted-cells';

/** An empty state's button */
export interface EmptyStateButton {
  /** What the button does */
  action: EmptyStateAction;
  /** Button label */
  label: string;
}

/** Text content for an empty state */
export interface EmptyStateContent {
  /** Heading */
  heading: string;
  /** Supporting text below the heading */
  description: string;
  /** Buttons, in order */
  actions: EmptyStateButton[];
}

/** Selects every cell type again */
const SELECT_ALL_BUTTON: EmptyStateButton = { action: 'select-all-cell-types', label: 'Select all cell types' };

/** Undoes the last change to the deleted cells */
const UNDO_BUTTON: EmptyStateButton = { action: 'undo', label: 'Undo' };

/** Restores every deleted cell */
const RESTORE_BUTTON: EmptyStateButton = { action: 'restore-deleted-cells', label: 'Restore deleted cells' };

/** Shown in the visualization panels when no cell types are selected */
export const NO_CELL_TYPES_SELECTED_CONTENT: EmptyStateContent = {
  heading: 'No cell types selected',
  description: 'Select cell types to show their cells and distances.',
  actions: [SELECT_ALL_BUTTON],
};

/**
 * Shown in the charts when only the anchor cell type is selected. The charts leave the anchor type out,
 * so they have no distances to show.
 *
 * @param anchorCellType Name of the anchor cell type
 * @returns Empty state content
 */
export function noDistancesContent(anchorCellType: string): EmptyStateContent {
  return {
    heading: 'No distances to show',
    description: `Select a cell type other than ${anchorCellType} to show its distances.`,
    actions: [SELECT_ALL_BUTTON],
  };
}

/**
 * Buttons that bring back deleted cells
 *
 * @param undoAvailable Whether the last change to the deleted cells can be undone
 * @returns Undo, when available, and Restore deleted cells
 */
function deletedCellsButtons(undoAvailable: boolean): EmptyStateButton[] {
  return undoAvailable ? [UNDO_BUTTON, RESTORE_BUTTON] : [RESTORE_BUTTON];
}

/**
 * Shown in the visualization panels when every cell of the selected cell types was deleted
 *
 * @param undoAvailable Whether the last change to the deleted cells can be undone
 * @returns Empty state content
 */
export function allCellsDeletedContent(undoAvailable: boolean): EmptyStateContent {
  return {
    heading: 'All cells deleted',
    description: 'Every cell of the selected cell types was deleted.',
    actions: deletedCellsButtons(undoAvailable),
  };
}

/**
 * Shown in the charts when every selected cell other than the anchor cells was deleted.
 * The spatial view still shows the anchor cells, but the charts leave them out.
 *
 * @param anchorCellType Name of the anchor cell type
 * @param undoAvailable Whether the last change to the deleted cells can be undone
 * @returns Empty state content
 */
export function distancesDeletedContent(anchorCellType: string, undoAvailable: boolean): EmptyStateContent {
  return {
    heading: 'No distances to show',
    description: `Every selected cell other than ${anchorCellType} was deleted.`,
    actions: deletedCellsButtons(undoAvailable),
  };
}
