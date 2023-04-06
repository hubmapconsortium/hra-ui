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
  // @Action(Set)
  // set(ctx: StorageContext, { id, key, value }: Set): void {
  // }
}
