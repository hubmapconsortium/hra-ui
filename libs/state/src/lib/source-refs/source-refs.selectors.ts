import { SourceReference } from '@hra-ui/services';
import { Selector } from '@ngxs/store';
import { SourceRefsState } from './source-refs.state';

/** Selectors for SourceRefState */
export class SourceRefsSelectors {
  /** returns the source references */
  @Selector([SourceRefsState])
  static sourceReferences(refs: SourceReference[]): SourceReference[] {
    return refs;
  }
}
