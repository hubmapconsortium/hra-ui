/**
 * Serializes complex values into simpler types.
 * Currently handles the following objects:
 * - Errors (and subclasses)
 * - Events (ErrorEvent, KeyboardEvent, and MouseEvent)
 * - Maps
 * - Sets
 *
 * @param value Value to serialize
 * @returns A new value to serialize
 */
export function serialize(value: unknown): unknown {
  // Short circuit for non-objects
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  } else if (value instanceof Error) {
    const obj = pick(value, ['name', 'message', 'stack']);
    return { ...obj, stack: obj.stack && limitStackTrace(obj.stack, 4000) };
  } else if (value instanceof Event) {
    if (value instanceof ErrorEvent) {
      return pick(value, ['message', 'filename', 'lineno', 'colno']);
    } else if (value instanceof KeyboardEvent) {
      const keys: (keyof KeyboardEvent)[] = ['key', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey', 'repeat'];
      return filterFalse(pick(value, keys));
    } else if (value instanceof MouseEvent) {
      const keys: (keyof MouseEvent)[] = ['button', 'buttons', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey'];
      return filterFalse(pick(value, keys));
    }

    return undefined;
  } else if (value instanceof Map) {
    return { map: [...value] };
  } else if (value instanceof Set) {
    return { set: [...value] };
  }

  return value;
}

/**
 * Pick a set of properties from an object
 *
 * @param obj Original object
 * @param keys Keys to pick from the object
 * @returns A subset of the object
 */
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
}

/**
 * Creates a new object where any keys with a value strictly equal to false are removed
 *
 * @param obj Original object
 * @returns Filtered object
 */
function filterFalse<T>(obj: T): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== false) {
      result[key] = obj[key];
    }
  }

  return result;
}

/**
 * Truncates a stack trace to a maximum length
 *
 * @param stack Original stack
 * @param maxLength Maximum stack length
 * @returns A stack with a length no greater than `maxLength`
 */
function limitStackTrace(stack: string, maxLength: number): string {
  if (stack.length <= maxLength) {
    return stack;
  }

  const truncatedMsg = 'Stack truncated...';
  const lines: string[] = [];
  let total = truncatedMsg.length + 1;
  for (const line of stack.split('\n')) {
    const newTotal = total + line.length + 1;
    if (newTotal < maxLength) {
      lines.push(line);
      total = newTotal;
    }
  }

  lines.push(truncatedMsg);
  return lines.join('\n');
}
