import { coerceArray } from '@angular/cdk/coercion';
import { Icon, IconList } from '../types/icon.schema';

/**
 * Coerces mixed format icons into a list of icon object that
 * can be passed directly into hra-icon's `[icon]` input or
 * into a hraContentTemplateOutlet
 *
 * @param list Mixed format icon list
 * @returns A list of icon objects
 */
export function coerceIconList(list: IconList = []): Icon[] {
  return coerceArray(list).map((value) => {
    if (typeof value === 'string') {
      return { component: 'Icon', svgIcon: value };
    }

    return { component: 'Icon', ...value };
  });
}
