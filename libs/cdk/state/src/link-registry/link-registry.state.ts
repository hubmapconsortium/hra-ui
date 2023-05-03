import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';
import { Router, UrlCreationOptions } from '@angular/router';
import { createExternalUrl } from '@hra-ui/utils';
import { UnionMember } from '@hra-ui/utils/types';
import { Action, State } from '@ngxs/store';
import { load } from 'js-yaml';
import { map, Observable } from 'rxjs';
import { Add, AddFromYaml, AddMany, LoadFromYaml, Navigate } from './link-registry.actions';
import {
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
  defaults: {},
})
@Injectable()
export class LinkRegistryState {
  /** Http service for link loading */
  private readonly http = inject(HttpClient);
  /** Injects angular router */
  private readonly router = inject(Router);
  /** Injects ngZone for routing */
  private readonly zone = inject(NgZone);

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
  async navigate(ctx: LinkRegistryContext, { id, extras }: Navigate): Promise<void> {
    const entry = ctx.getState()[id];
    switch (entry?.type) {
      case LinkType.Internal:
        await this.navigateToInternal(entry, extras);
        break;

      case LinkType.External:
        this.navigateToExternal(entry, extras);
        break;

      default:
        throw new Error(`Cannot navigate to non-existing link '${id}'`);
    }
  }

  /**
   * Method to navigate to an internal link using Angular router
   * @param entry Internal Link Entry with commands and extras
   */
  private async navigateToInternal(entry: InternalLinkEntry, extras: UrlCreationOptions): Promise<void> {
    await this.zone.run(() => this.router.navigate(entry.commands, { ...entry.extras, ...extras }));
  }

  /**
   * Method to navigate to an external link using window
   * @param entry External link entry with url, target, and rel
   */
  private navigateToExternal(entry: ExternalLinkEntry, extras: UrlCreationOptions): void {
    const url = createExternalUrl(entry.url, extras);
    window.open(url, entry.target, entry.rel);
  }
}
