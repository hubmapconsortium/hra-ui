import { Selector } from '@ngxs/store';
import { StorageId } from './storage.model';
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

  static lengthofState(): (id: StorageId) => number | undefined {
    return (id) => StorageSelectors.lengthOfStorage(id) ?? undefined;
  }

  private static getStorage(id: StorageId): Storage {
    switch (id) {
      case StorageId.Local:
        return localStorage;

      case StorageId.Session:
        return sessionStorage;
    }
  }

  private static lengthOfStorage(id: StorageId): number {
    switch (id) {
      case StorageId.Local:
        return localStorage.length;

      case StorageId.Session:
        return sessionStorage.length;
    }
  }
}
