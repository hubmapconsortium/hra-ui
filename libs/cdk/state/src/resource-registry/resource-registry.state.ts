import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { load } from 'js-yaml';
import { map, Observable } from 'rxjs';
import { Add, AddFromYaml, AddMany, LoadFromYaml, LoadMarkdown } from './resource-registry.actions';
import {
  ResourceRegistryContext,
  ResourceRegistryModel,
  ResourceType,
  RESOURCE_REGISTRY_SCHEMA,
} from './resource-registry.model';

/** State keeping track of global resources */
@State<ResourceRegistryModel>({
  name: 'resourceRegistry',
  defaults: {},
})
@Injectable()
export class ResourceRegistryState {
  /** Http service for resource loading */
  private readonly http = inject(HttpClient);

  @Action(Add)
  addOne(ctx: ResourceRegistryContext, { id, entry }: Add): void {
    this.addMany(ctx, new AddMany({ [id]: entry }));
  }

  @Action(AddMany)
  addMany(ctx: ResourceRegistryContext, { entries }: AddMany): void {
    ctx.patchState(entries);
  }

  @Action(AddFromYaml)
  addYaml(ctx: ResourceRegistryContext, { yaml }: AddFromYaml, filename?: string): void {
    const data = load(yaml, { filename });
    const entries = RESOURCE_REGISTRY_SCHEMA.parse(data);
    this.addMany(ctx, new AddMany(entries));
  }

  @Action(LoadFromYaml)
  loadYaml(ctx: ResourceRegistryContext, { url }: LoadFromYaml): Observable<void> {
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(map((data) => this.addYaml(ctx, new AddFromYaml(data), url)));
  }

  @Action(LoadMarkdown)
  loadMarkdown(ctx: ResourceRegistryContext, { id, url }: LoadMarkdown): Observable<void> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((markdown) => new Add(id, { type: ResourceType.Markdown, markdown })),
      map((action) => this.addOne(ctx, action))
    );
  }
}
