import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { AddResource, LoadMarkdown } from './resource-registry.actions';

export enum ResourceId {}

export type ResourceRegistryModel = Record<ResourceId, unknown>;

@State<ResourceRegistryModel>({
  name: 'resourceRegistry',
  defaults: {},
})
@Injectable()
export class ResourceRegistryState {
  constructor(private http: HttpClient) {}

  @Action(AddResource)
  addResource({ patchState }: StateContext<ResourceRegistryModel>, { id, entry }: AddResource): void {
    patchState({ [id]: entry });
  }

  @Action(LoadMarkdown)
  loadMarkdown({ patchState }: StateContext<ResourceRegistryModel>, { id, url }: LoadMarkdown): void {
    this.http.get(url).pipe(
      tap((data) => {
        //
        patchState({ [id]: data });
      })
    );
  }
}
