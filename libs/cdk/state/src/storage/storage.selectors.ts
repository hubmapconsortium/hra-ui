import { Selector } from '@ngxs/store';
import { StorageId } from './storage.model';
import { StorageState } from './storage.state';
/**
 * Storage selectors - class for retrieving storage types
 */
export class StorageSelectors {
  /**
   * returns the value stored in the key,value pair in the storageId given
   * @returns (id,key) of the given storage id else undefined
   */
  @Selector([StorageState])
  static get(): (id: StorageId, key: string) => string | undefined {
    return (id, key) => StorageState.getStorage(id).getItem(key) ?? undefined;
  }
  /**
   * returns the number of items in the given storage id stored
   * @returns length of the given StorageId supplied
   */
  @Selector([StorageState])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Allow selector name
  static length(): (id: StorageId) => number | undefined {
    return (id) => StorageState.getStorage(id).length;
  }
}
