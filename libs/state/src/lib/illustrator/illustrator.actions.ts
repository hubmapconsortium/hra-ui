import { Action } from '@hra-ui/cdk/state';
import { IllustrationMappingItem, Iri } from '@hra-ui/services';

/**
 * Loads the state with the current Iri
 */
export class Load extends Action('[Illustrator] Load') {
  /** Intializes the set iri */
  constructor(readonly iri: Iri) {
    super();
  }
}

/**
 * Sets the selection for the Item in the current state on SetHover
 */
export class SetHover extends Action('[Illustrator] Set Selection on Hover') {
  /** Initializes the Mapping Item */
  constructor(readonly selectedOnHover: IllustrationMappingItem | undefined) {
    super();
  }
}

/**
 * Sets the selection for the Item in the current state on SetClicked
 */
export class SetClicked extends Action('[Illustrator] Set Selection on Clicked') {
  /** Initializes the Mapping Item */
  constructor(readonly selectedOnClick: IllustrationMappingItem) {
    super();
  }
}

/**
 * Sets highlighted cell type id in the state from label
 */
export class HighlightCellType extends Action('[Illustrator] Highlight Cell Type Id') {
  /** Initializes the Mapping Item */
  constructor(readonly hoverLabel?: string) {
    super();
  }
}

/**
 * Clears the selection for the current state
 */
export class ClearSelection extends Action('[Illustrator] Clear Selection') {}

/**
 * Resets the state
 */
export class Reset extends Action('[Illustrator] Reset') {}
