import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { AddResource, LoadMarkdown } from './resource-registry.actions';
import { ResourceEntry, ResourceId, ResourceRegistryModel, ResourceType } from './resource-registry.model';

/**
 * Resource registry state
 */
@State<ResourceRegistryModel>({
  name: 'resourceRegistry',
  defaults: {},
})
@Injectable()
export class ResourceRegistryState {
  /** injects httpClient */
  private readonly http = inject(HttpClient);

  /**
   * Action for adding a resource to state
   * @param ctx State context
   * @param param1 addResource action object containing id and entry
   */
  @Action(AddResource)
  addResource(ctx: StateContext<ResourceRegistryModel>, { id, entry }: AddResource): void {
    this.addResourceEntry(ctx, id, entry);
  }

  /**
   * action for loading markdown
   * @param ctx State context
   * @param param1 loadMarkdown object containing id and url
   */
  @Action(LoadMarkdown)
  loadMarkdown(ctx: StateContext<ResourceRegistryModel>, { id, url }: LoadMarkdown): Observable<string> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      tap((data) => {
        const entry = { type: ResourceType.Markdown, markdown: data };
        this.addResourceEntry(ctx, id, entry);
      })
    );
  }

  /**
   * method to add a resource entry to the state
   * @param param0 State context
   * @param id id of the resource
   * @param entry resource entry to be added
   */
  private addResourceEntry(
    { patchState }: StateContext<ResourceRegistryModel>,
    id: ResourceId,
    entry: ResourceEntry
  ): void {
    const resource = { [id]: entry };
    patchState(resource);
  }
}
