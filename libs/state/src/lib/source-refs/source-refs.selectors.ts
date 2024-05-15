import { SourceReference } from '@hra-ui/services';
import { Selector } from '@ngxs/store';

import { SourceRefsModel, SourceRefsState } from './source-refs.state';

/** Selectors for SourceRefState */
export class SourceRefsSelectors {
  /** returns the source references */
  @Selector([SourceRefsState])
  static sourceReferences({ sources }: SourceRefsModel): SourceReference[] {
    return sources;
  }

  /**
   * Returns currently selected source references
   */
  @Selector([SourceRefsState])
  static selectedSourceReferences({ selected }: SourceRefsModel): SourceReference[] {
    return selected;
  }
}
