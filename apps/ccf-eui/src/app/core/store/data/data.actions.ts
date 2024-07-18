import { Filter } from '@hra-api/ng-client';

export class UpdateFilter {
  static readonly type = '[DataState] Update filter';

  constructor(readonly filter: Partial<Filter>) {}
}
