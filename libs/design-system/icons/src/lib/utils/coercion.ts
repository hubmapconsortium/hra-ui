import { coerceArray } from '@angular/cdk/coercion';
import { Icon, IconList } from '../types/icon.schema';

export function coerceIconList(list: IconList = []): Icon[] {
  return coerceArray(list).map((value) => {
    if (typeof value === 'string') {
      return { component: 'Icon', svgIcon: value };
    }

    return { component: 'Icon', ...value };
  });
}
