import { TissueBlock } from '@hra-api/ng-client';

export interface ListResult {
  selected: boolean;
  color?: string;
  tissueBlock: TissueBlock;
  rank?: number;
}
