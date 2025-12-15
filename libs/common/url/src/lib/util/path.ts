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

/**
 * Remove the trailing slash from a path while preserving the fragment and query parameters (if present)
 *
 * @param path Url to strip
 * @returns New url
 */
export function stripTrailingSlash(path: string): string {
  const index = path.search(/#|\?|$/);
  if (path[index - 1] === '/') {
    return path.slice(0, index - 1) + path.slice(index);
  }

  return path;
}

/**
 * Remove the leading hash symbol from a fragment (if present)
 *
 * @param fragment Fragment to strip
 * @returns New fragment
 */
export function stripLeadingHash(fragment: string): string {
  if (fragment && fragment[0] === '#') {
    return fragment.slice(1);
  }

  return fragment;
}
