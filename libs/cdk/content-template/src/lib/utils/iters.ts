import { RendererStyleFlags2 } from '@angular/core';
import { Classes, Styles } from '../types/content-template.schema';

/**
 * Iterates over a set of html classes.
 * Classes can be specified using a string, an array of strings, or
 * an object with class names as keys and the class name is only
 * included if its value is truthy.
 *
 * @param classes Set of html classes
 * @yields Each class name
 */
export function* classIter(classes: Classes | undefined): Generator<string> {
  if (!classes) {
    return;
  } else if (typeof classes === 'string') {
    classes = classes.split(/\s+/g);
  }

  if (Array.isArray(classes)) {
    yield* classes.filter((cls) => cls !== '');
    return;
  }

  for (const [cls, value] of Object.entries(classes)) {
    if (value && cls !== '') {
      yield cls;
    }
  }
}

/**
 * Iterates over a set of css styles.
 * Styles can be specified using a string or an object of styles and their values.
 *
 * @param styles Set of css styles
 * @yields Each style along with its value and flags
 */
export function* styleIter(styles: Styles | undefined): Generator<[string, string, RendererStyleFlags2]> {
  if (!styles) {
    return;
  }

  for (const [style, value] of styleEntries(styles)) {
    let val = String(value).trim();
    let flags = RendererStyleFlags2.DashCase;
    if (val.endsWith('!important')) {
      flags &= RendererStyleFlags2.Important;
      val = val.slice(0, -10);
    }

    yield [style, val, flags];
  }
}

/**
 * Iterates over a set of css styles yielding the key and value.
 * Each value can include an `!important` flag.
 *
 * @param styles Set of css styles
 * @yields Each style key/value pair
 */
function* styleEntries(styles: Styles): Generator<[string, unknown]> {
  if (typeof styles !== 'string') {
    yield* Object.entries(styles);
    return;
  }

  for (const item of styles.split(';')) {
    yield item.split(':', 1) as [string, string];
  }
}
