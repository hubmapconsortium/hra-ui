import { TissueBlock } from '@hra-api/ng-client';

/**
 * Represents a tissue block result in the results browser
 */
export interface ListResult {
  /** If the item is selected */
  selected: boolean;
  /** Color assigned to the item */
  color?: string;
  /** Associated tissue block */
  tissueBlock: TissueBlock;
  /** Color rank assigned to the item */
  rank?: number;
  /** If the item is expanded */
  expanded?: boolean;
}
