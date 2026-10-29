/** Text content for an empty state */
export interface EmptyStateContent {
  /** Heading */
  heading: string;
  /** Supporting text below the heading */
  description: string;
  /** Action button label */
  actionLabel: string;
}

/** Label for the action that selects every cell type again */
const SELECT_ALL_LABEL = 'Select all cell types';

/** Shown in the visualization panels when no cell types are selected */
export const NO_CELL_TYPES_SELECTED_CONTENT: EmptyStateContent = {
  heading: 'No cell types selected',
  description: 'Select cell types to show their cells and distances.',
  actionLabel: SELECT_ALL_LABEL,
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
    actionLabel: SELECT_ALL_LABEL,
  };
}
