import { SourceReference } from '@hra-ui/services';
import { Selector } from '@ngxs/store';
import { SourceRefsState } from './source-refs.state';

export class SourceRefsSelectors {
  @Selector([SourceRefsState])
  static sourceReferences(refs: SourceReference[]): SourceReference[] {
    return refs;
  }
}
