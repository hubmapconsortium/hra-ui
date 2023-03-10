import { Source } from './source-list.state';

/** Actions for updating the SourceList state */
export class AddSourceList {
  static readonly type = '[SourceList] Add';
  constructor(readonly sourceList: Source[]) {}
}
