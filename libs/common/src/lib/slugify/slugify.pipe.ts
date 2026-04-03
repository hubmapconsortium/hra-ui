import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats a value into a string containing only word characters and hyphens
 */
@Pipe({
  name: 'slugify',
})
export class SlugifyPipe implements PipeTransform {
  /**
   * Slugify the value
   *
   * @param value Input to slugify
   * @returns Slugified value
   */
  transform(value: string): string {
    if (!value) {
      return '';
    }

    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }
}
