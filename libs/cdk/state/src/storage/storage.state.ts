import { produce } from 'immer';
import { StorageContext } from './storage.model';
import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { StorageId, StorageModel } from './storage.model';
import { Set, Delete, Clear } from './storage.actions';
/**
 * State holding Storage types
 */
@State<StorageModel>({
  name: 'storage',
  defaults: {
    [StorageId.Local]: 0,
    [StorageId.Session]: 0,
  },
})
@Injectable()
/**
 *  class for managing storage state
 */
export class StorageState {
  /**
   * StorageState class to manage storage objects
   * @param id-Storage Identifier
   * @returns - Storage objects - session and local
   */
  static getStorage(id: StorageId): Storage {
    switch (id) {
      case StorageId.Local:
        return localStorage;

      case StorageId.Session:
        return sessionStorage;

      default:
        throw new Error(`No such storage '${id}'`);
    }
  }
  /**
   * sets the key,value pair in the given storageId
   * @param ctx - StorageContext object
   * @param param1- {id: StorageId ,key:string ,value:string} of type Set to set key,value pair for the given id
   */
  @Action(Set)
  set(ctx: StorageContext, { id, key, value }: Set): void {
    StorageState.getStorage(id).setItem(key, value);
    this.increaseChangeCount(ctx, id);
  }
  /**
   * deletes the value pointed by key in the list of values stored in the specified storage id
   * @param ctx - StorageContext object
   * @param param1- id: StorageId ,key:string ,value:string} of type Set to set key,value pair for the given id
   */
  @Action(Delete)
  delete(ctx: StorageContext, { id, key }: Delete): void {
    StorageState.getStorage(id).removeItem(key);
    this.increaseChangeCount(ctx, id);
  }
  /**
   * clears the values of the specified storage id
   * @param ctx - StorageContext object
   * @param param1 - id: StorageId ,key:string ,value:string} of type Set to set key,value pair for the given id
   */
  @Action(Clear)
  clear(ctx: StorageContext, { id }: Clear): void {
    StorageState.getStorage(id).clear();
    this.increaseChangeCount(ctx, id);
  }
  /**
   * increases count after each operation is performed on the specified storage id
   * @param ctx  - StorageContext obje
   * @param id - StorageId - Storage identifier for which the change count has to be updated
   */
  private increaseChangeCount(ctx: StorageContext, id: StorageId): void {
    ctx.setState(
      produce((draft) => {
        draft[id] += 1;
      })
    );
  }
}
