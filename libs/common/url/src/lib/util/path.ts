/**
 * Test whether a path is an absolute url
 *
 * @param path Path to test
 * @returns true if the path is absolute, false otherwise
 */
export function isAbsolute(path: string): boolean {
  try {
    new URL(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Joins two paths with a signle slash between them
 *
 * @param start First path
 * @param end Second path
 * @returns The concatenated path
 */
export function joinWithSlash(start: string, end: string): string {
  if (!start) {
    return end;
  } else if (!end) {
    return start;
  }

  start = start.replace(/\/+$/, '');
  end = end.replace(/^\/+/, '');
  return `${start}/${end}`;
}
