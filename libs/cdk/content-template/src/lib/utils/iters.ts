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
    yield* classes.split(/\s+/g);
  } else if (Array.isArray(classes)) {
    yield* classes;
  } else {
    for (const [cls, value] of Object.entries(classes)) {
      if (value) {
        yield cls;
      }
    }
  }
}

/**
 * Iterates over a set of css styles.
 * Styles can be specified using a string or an object of styles and their values.
 *
 * @param styles Set of css styles
 * @yields Each style along with its value
 */
export function* styleIter(styles: Styles | undefined): Generator<[string, unknown]> {
  if (!styles) {
    return;
  } else if (typeof styles === 'string') {
    for (const item of styles.split(';')) {
      const [style, value] = item.split(':', 1);
      yield [style.trim(), value.trim()];
    }
  } else {
    yield* Object.entries(styles);
  }
}
