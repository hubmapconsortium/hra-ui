import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { load } from 'js-yaml';
import { map, Observable } from 'rxjs';
import { Add, AddFromYaml, AddMany, LoadFromYaml, LoadMarkdown } from './resource-registry.actions';
import {
  BuiltinResourceType,
  ResourceRegistryContext,
  ResourceRegistryModel,
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

  /**
   * Add a single entry
   * @param ctx State context
   * @param action Action with id and entry to add
   */
  @Action(Add)
  addOne(ctx: ResourceRegistryContext, { id, entry }: Add): void {
    this.addMany(ctx, new AddMany({ [id]: entry }));
  }

  /**
   * Add multiple entries
   * @param ctx State context
   * @param action Action with entries to add
   */
  @Action(AddMany)
  addMany(ctx: ResourceRegistryContext, { entries }: AddMany): void {
    ctx.patchState(entries);
  }

  /**
   * Parse and add entries from yaml
   * @param ctx State context
   * @param action Action with raw yaml data
   * @param filename Optional url/filename from which the data was loaded (for improved error messages)
   */
  @Action(AddFromYaml)
  addYaml(ctx: ResourceRegistryContext, { yaml }: AddFromYaml, filename?: string): void {
    const data = load(yaml, { filename });
    const entries = RESOURCE_REGISTRY_SCHEMA.parse(data);
    this.addMany(ctx, new AddMany(entries));
  }

  /**
   * Load and add entries from an external yaml file
   * @param ctx State context
   * @param action Action with the external file url
   * @returns An observable that completes when the entries has been added
   */
  @Action(LoadFromYaml)
  loadYaml(ctx: ResourceRegistryContext, { url }: LoadFromYaml): Observable<void> {
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(map((data) => this.addYaml(ctx, new AddFromYaml(data), url)));
  }

  /**
   * Adds a markdown entry with content loaded from an external file
   * @param ctx State context
   * @param action Action with id and url to the external markdown
   * @returns An observable that completes when the entry has been added
   */
  @Action(LoadMarkdown)
  loadMarkdown(ctx: ResourceRegistryContext, { id, url }: LoadMarkdown): Observable<void> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((markdown) => new Add(id, { type: BuiltinResourceType.Markdown, markdown })),
      map((action) => this.addOne(ctx, action))
    );
  }
}
