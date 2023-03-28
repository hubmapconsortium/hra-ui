import { UnionMember } from '@hra-ui/utils/types';
import { Selector } from '@ngxs/store';
import { LinkEntry, LinkId, LinkRegistryModel, LinkType } from './link-registry.model';
import { LinkRegistryQuery, LinkRegistryState } from './link-registry.state';

/**
 * Selectors for Link Registry
 */
export class LinkRegistrySelectors {
  /**
   * Queries for a link entry
   * @param state Current state
   * @returns link query function
   */
  @Selector([LinkRegistryState])
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
    const typeMatches = type === undefined || entry?.type === type;
    return typeMatches ? entry : undefined;
  }
}
