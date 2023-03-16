import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { load } from 'js-yaml';
import { Add, AddFromYaml, AddMany } from './link-registry.actions';
import { LinkRegistryContext, LinkRegistryModel, LINK_REGISTRY_SCHEMA } from './link-registry.model';

/** State for keeping track of links globally */
@State<LinkRegistryModel>({
  name: 'linkRegistry',
  defaults: {},
})
@Injectable()
export class LinkRegistryState {
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
}
