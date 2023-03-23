import { Selector } from '@ngxs/store';
import { StorageId, StorageModel } from './storage.model';
import { StorageState } from './storage.state';

/** Selector class for retrieving data from the Storage */
export class StorageSelectors {
  /**
   * Gets the array of data sources from the SourceList object.
   * @param state The current state of the SourceListState
   * @returns array of source objects
   */
  @Selector([StorageState])
  static get(): (id: StorageId, key: string) => string | undefined {
    return (id, key) => StorageSelectors.getStorage(id).getItem(key) ?? undefined;
  }

  private static getStorage(id: StorageId): Storage {
    switch (id) {
      case StorageId.Local:
        return localStorage;

      case StorageId.Session:
        return sessionStorage;
    }
  }
}
