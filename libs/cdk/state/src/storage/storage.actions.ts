import { ActionGroup } from '../actions/actions';
import { StorageId } from './storage.model';

/** Base action factory */
const Action = ActionGroup('Storage');

/**
 * Class Set Action for set method
 */
export class Set extends Action('Set') {
  /**
   * constructor class for Set action object
   * @param id - type: StorageId - Storage identifier
   * @param key - type: string - Key to be stored in the storage identifier
   * @param value - type: string - value to be stored with the key
   */
  constructor(readonly id: StorageId, readonly key: string, readonly value: string) {
    super();
  }
}
/**
 *  Class Delete Action for delete method
 */
export class Delete extends Action('Delete') {
  /**
   * constructor class for Delete action object
   * @param id - type: StorageId - Storage identifier
   * @param key - type: string - Key to be stored in the storage identifier
   */
  constructor(readonly id: StorageId, readonly key: string) {
    super();
  }
}
/**
 * Clear the values stored in the specified StorageId
 */
export class Clear extends Action('Clear') {
  /**
   * constructor class for clear action object
   * @param id - type: StorageId - Storage identifier
   */
  constructor(readonly id: StorageId) {
    super();
  }
}
