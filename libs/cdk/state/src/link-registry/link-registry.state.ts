import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UnionMember } from '@hra-ui/utils/types';
import { Action, Selector, State } from '@ngxs/store';
import { load } from 'js-yaml';
import { map, Observable } from 'rxjs';
import { Add, AddFromYaml, AddMany, LoadFromYaml, Navigate } from './link-registry.actions';
import {
  createLinkId,
  ExternalLinkEntry,
  InternalLinkEntry,
  LinkEntry,
  LinkId,
  LinkRegistryContext,
  LinkRegistryModel,
  LinkType,
  LINK_REGISTRY_SCHEMA,
} from './link-registry.model';

/** Query function for link entry optionally with type specified */
export type LinkRegistryQuery = <T extends LinkType | string = string>(
  id: LinkId,
  type?: T
) => UnionMember<LinkEntry, 'type', T> | undefined;

/** State for keeping track of links globally */
@State<LinkRegistryModel>({
  name: 'linkRegistry',
  defaults: {
    [createLinkId('')]: { type: LinkType.Internal, commands: [''] },
  },
})
@Injectable()
export class LinkRegistryState {
  /** Http service for link loading */
  private readonly http = inject(HttpClient);
  /** Injects angular router */
  private readonly router = inject(Router);
  /**
   * Queries for a link entry
   * @param state Current state
   * @returns link query function
   */
  @Selector()
  static query(state: LinkRegistryModel): LinkRegistryQuery {
    return (id, type) => this.getEntry(state, id, type);
  }

  /**
   * Gets a link entry by id and optionally type
   * @param state link registry state
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
    const typeMatches = type === undefined || entry.type === type;
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

  /**
   * Navigate to Internal or External urls from id
   * @param ctx State context
   * @param param1 Navigate action with link id
   * @returns A promise
   */
  @Action(Navigate)
  async navigate(ctx: LinkRegistryContext, { id }: Navigate): Promise<void> {
    const entry = LinkRegistryState.getEntry(ctx.getState(), id);
    switch (entry?.type) {
      case LinkType.Internal:
        await this.navigateToInternal(entry);
        break;

      case LinkType.External:
        this.navigateToExternal(entry);
        break;

      default:
        throw new Error(`Cannot navigate to non-existing link '${id}'`);
    }
  }

  /**
   * Method to navigate to an internal link using Angular router
   * @param entry Internal Link Entry with commands and extras
   */
  private async navigateToInternal(entry: InternalLinkEntry): Promise<void> {
    await this.router.navigate(entry.commands, entry.extras);
  }

  /**
   * Method to navigate to an external link using window
   * @param entry External link entry with url, target, and rel
   */
  private navigateToExternal(entry: ExternalLinkEntry): void {
    window.open(entry.url, entry.target, entry.rel);
  }
}
