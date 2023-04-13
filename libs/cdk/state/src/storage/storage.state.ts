import { produce } from 'immer';
import { StorageContext } from './storage.model';
import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { StorageId, StorageModel } from './storage.model';
import { Set, Delete, Clear } from './storage.actions';
@State<StorageModel>({
  name: 'storage',
  defaults: {
    [StorageId.Local]: 0,
    [StorageId.Session]: 0,
  },
})
@Injectable()
export class StorageState {
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

  @Action(Set)
  set(ctx: StorageContext, { id, key, value }: Set): void {
    StorageState.getStorage(id).setItem(key, value);
    this.increaseChangeCount(ctx, id);
  }

  @Action(Delete)
  delete(ctx: StorageContext, { id, key }: Delete): void {
    StorageState.getStorage(id).removeItem(key);
    this.increaseChangeCount(ctx, id);
  }

  @Action(Clear)
  clear(ctx: StorageContext, { id }: Clear): void {
    StorageState.getStorage(id).clear();
    this.increaseChangeCount(ctx, id);
  }

  private increaseChangeCount(ctx: StorageContext, id: StorageId): void {
    ctx.setState(
      produce((draft) => {
        draft[id] += 1;
      })
    );
  }
}
