import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UnionMember } from '@hra-ui/utils/types';
import { Action, Selector, State } from '@ngxs/store';
import { load } from 'js-yaml';
import { map, Observable } from 'rxjs';
import { Add, AddFromYaml, AddMany, LoadFromYaml } from './link-registry.actions';
import {
  createLinkId,
  LinkEntry,
  LinkId,
  LinkRegistryContext,
  LinkRegistryModel,
  LinkType,
  LINK_REGISTRY_SCHEMA,
} from './link-registry.model';

/** Query function for resource entry optionally with type specified */
export type LinkRegistryQuery = <T extends LinkType | string = string>(
  id: LinkId,
  type?: T
) => UnionMember<LinkEntry, 'type', T> | undefined;

/** State for keeping track of links globally */
@State<LinkRegistryModel>({
  name: 'linkRegistry',
  defaults: {
    [createLinkId('Test')]: { type: LinkType.Internal, commands: [''] },
    [createLinkId('')]: { type: LinkType.Internal, commands: [''] },
  },
})
@Injectable()
export class LinkRegistryState {
  /** Http service for resource loading */
  private readonly http = inject(HttpClient);

  /**
   * Queries for a resource entry
   * @param state Current state
   * @returns Resource query function
   */
  @Selector()
  static query(state: LinkRegistryModel): LinkRegistryQuery {
    return (id, type) => this.getEntry(state, id, type);
  }

  /**
   * Gets a resource entry by id and optionally type
   * @param state Resource registry state
   * @param id Entry id
   * @param type Optional entry type
   * @returns The entry if found, undefined otherwise
   */
  private static getEntry<T extends LinkType | string>(
    state: LinkRegistryModel,
    id: LinkId,
    type?: T
  ): UnionMember<LinkEntry, 'type', T> | undefined {
    const entry = state[id] as UnionMember<LinkEntry, 'type', T>;
    const typeMatches = type === undefined || entry?.type === type;
    return typeMatches ? entry : undefined;
  }

  /**
   * Add a single entry
   * @param ctx State context
   * @param action Action with id and entry to add
   */
  @Action(Add)
  addOne(ctx: LinkRegistryContext, { id, entry }: Add): void {
    this.addMany(ctx, new AddMany({ [id]: entry }));
  }

  /**
   * Add multiple entries
   * @param ctx State context
   * @param action Action with entries to add
   */
  @Action(AddMany)
  addMany(ctx: LinkRegistryContext, { entries }: AddMany): void {
    ctx.patchState(entries);
  }

  /**
   * Parse and add entries from yaml
   * @param ctx State context
   * @param action Action with raw yaml data
   * @param filename Optional url/filename from which the data was loaded (for improved error messages)
   */
  @Action(AddFromYaml)
  addYaml(ctx: LinkRegistryContext, { yaml }: AddFromYaml, filename?: string): void {
    const data = load(yaml, { filename });
    const entries = LINK_REGISTRY_SCHEMA.parse(data);
    this.addMany(ctx, new AddMany(entries));
  }

  /**
   * Load and add entries from an external yaml file
   * @param ctx State context
   * @param action Action with the external file url
   * @returns An observable that completes when the entries has been added
   */
  @Action(LoadFromYaml)
  loadYaml(ctx: LinkRegistryContext, { url }: LoadFromYaml): Observable<void> {
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(map((data) => this.addYaml(ctx, new AddFromYaml(data), url)));
  }
}
