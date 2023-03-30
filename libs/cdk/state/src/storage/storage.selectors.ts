import { Selector } from '@ngxs/store';
import { StorageId } from './storage.model';
import { StorageState } from './storage.state';

/** Selector class for retrieving data from the Storage */
export class StorageSelectors {
  @Selector([StorageState])
  static get(): (id: StorageId, key: string) => string | undefined {
    return (id, key) => StorageSelectors.getStorage(id).getItem(key) ?? undefined;
  }

  @Selector([Selector])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Allow selector name
  static length(): (id: StorageId) => number | undefined {
    return (id) => StorageSelectors.getStorage(id).length;
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
