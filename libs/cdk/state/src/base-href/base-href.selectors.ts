import { Selector } from '@ngxs/store';
import { BaseHrefState } from './base-href.state';

/** Selectors for BaseHrefState */
export class BaseHrefSelectors {
  @Selector([BaseHrefState])
  static baseHref(value: string): string {
    return value;
  }
}
