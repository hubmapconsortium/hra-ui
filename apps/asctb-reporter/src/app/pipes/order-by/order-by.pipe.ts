import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: true,
})
export class OrderByPipe implements PipeTransform {
  transform<T>(array: T[] | null | undefined, key: keyof T): T[] {
    if (!array) {
      return [];
    }
    return array.slice().sort((a, b) => {
      const aProp = a[key];
      const bProp = b[key];
      return aProp === bProp ? 0 : aProp > bProp ? 1 : -1;
    });
  }
}
