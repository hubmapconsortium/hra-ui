import { ActionGroup } from '@hra-ui/cdk/state';
import { StorageId } from './storage.model';

const Action = ActionGroup('Storage');

/** action of adding a list of sources to the SourceList state */
export class Set extends Action('Set') {
  constructor(readonly id: StorageId, readonly key: string, readonly value: string) {
    super();
  }
}

export class Delete extends Action('Delete') {
  constructor(readonly id: StorageId) {
    super();
  }
}

export class Clear extends Action('Clear') {
  /** Action Type  */

  constructor(readonly id: StorageId) {
    super();
  }
}
