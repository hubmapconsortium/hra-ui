import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { StorageId, StorageModel } from './storage.model';

@State<StorageModel>({
  name: 'storage',
  defaults: {
    [StorageId.Local]: 0,
    [StorageId.Session]: 0,
  },
})
@Injectable()
export class StorageState {}
