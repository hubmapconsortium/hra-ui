import { Selector } from '@ngxs/store';
import { BaseHrefState } from './base-href.state';

/** Selectors for BaseHrefState */
export class BaseHrefSelectors {
  /**
   * Returns base href value
   * @param value href value
   * @returns href value
   */
  @Selector([BaseHrefState])
  static baseHref(value: string): string {
    return value;
  }
}
