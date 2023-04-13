import { Selector } from '@ngxs/store';
import { StorageId } from './storage.model';
import { StorageState } from './storage.state';

/** Selector class for retrieving data from the Storage */
export class StorageSelectors {
  @Selector([StorageState])
  static get(): (id: StorageId, key: string) => string | undefined {
    return (id, key) => StorageState.getStorage(id).getItem(key) ?? undefined;
  }

  @Selector([StorageState])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Allow selector name
  static length(): (id: StorageId) => number | undefined {
    return (id) => StorageState.getStorage(id).length;
  }
}
