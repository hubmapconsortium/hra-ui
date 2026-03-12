/**
 * Join multiple path segments into a single path with slashes, preserving leading and trailing slashes.
 * Does not resolve relative path segments (e.g. "." or "..").
 *
 * @param segments Path segments to join
 * @returns The concatenated path
 */
export function joinWithSlashes(...segments: string[]): string {
  const parts: string[] = [];
  let previousEndsWithSlash = false;
  for (const segment of segments) {
    if (!segment) {
      continue;
    }

    const hasLeadingSlash = segment.startsWith('/');
    const hasTrailingSlash = segment.endsWith('/');
    if (previousEndsWithSlash && hasLeadingSlash) {
      parts.push(segment.slice(1));
    } else if (!previousEndsWithSlash && !hasLeadingSlash) {
      parts.push('/', segment);
    } else {
      parts.push(segment);
    }

    previousEndsWithSlash = hasTrailingSlash;
  }

  if (parts.length > 1 && parts[0] === '/') {
    parts.shift();
  }

  return parts.join('');
}

/**
 * Strip the trailing slash from a path while preserving the fragment and query parameters (if present).
 *
 * @param path Path to strip
 * @returns New path
 */
export function stripTrailingSlash(path: string): string {
  const index = path.search(/#|\?|$/);
  if (index > 0 && path[index - 1] === '/') {
    return path.slice(0, index - 1) + path.slice(index);
  }

  return path;
}

/**
 * Strip the leading hash symbol from a fragment (if present).
 *
 * @param fragment Fragment to strip
 * @returns New fragment
 */
export function stripLeadingHash(fragment: string): string {
  if (fragment.length > 0 && fragment[0] === '#') {
    return fragment.slice(1);
  }

  return fragment;
}
