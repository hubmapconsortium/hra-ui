import { computed, Pipe, PipeTransform, Signal } from '@angular/core';

/**
 * Wrap an URL in CSS url() function
 *
 * @param value URL string or function returning URL string
 * @returns Signal with CSS url() wrapped URL
 */
export function cssUrl(value: string | (() => string)): Signal<string> {
  const source = typeof value === 'string' ? () => value : value;
  return computed(() => `url("${source()}")`);
}

/**
 * Pipe for wrapping an URL in CSS url() function
 */
@Pipe({
  name: 'cssUrl',
})
export class CssUrlPipe implements PipeTransform {
  /**
   * Transform URL to CSS url() format
   *
   * @param url URL to transform
   * @returns CSS url() wrapped URL
   */
  transform(value: string): string {
    return `url("${value}")`;
  }
}
