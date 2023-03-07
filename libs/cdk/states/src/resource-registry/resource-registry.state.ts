import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { AddResource, LoadMarkdown } from './resource-registry.actions';
import { ResourceEntry, ResourceId, ResourceRegistryModel, ResourceType } from './resource-registry.model';

@State<ResourceRegistryModel>({
  name: 'resourceRegistry',
  defaults: {},
})
@Injectable()
export class ResourceRegistryState {
  constructor(private http: HttpClient) {}

  @Action(AddResource)
  addResource(ctx: StateContext<ResourceRegistryModel>, { id, entry }: AddResource): void {
    this.addResourceEntry(ctx, id, entry);
  }

  @Action(LoadMarkdown)
  loadMarkdown(ctx: StateContext<ResourceRegistryModel>, { id, url }: LoadMarkdown): void {
    this.http
      .get(url, { responseType: 'text' })
      .pipe(
        tap((data) => {
          const entry = { type: ResourceType.Markdown, markdown: data };
          this.addResourceEntry(ctx, id, entry);
        })
      )
      .subscribe();
  }

  private addResourceEntry(
    { patchState }: StateContext<ResourceRegistryModel>,
    id: ResourceId,
    entry: ResourceEntry
  ): void {
    const resource = { [id]: entry };
    patchState(resource);
  }
}
