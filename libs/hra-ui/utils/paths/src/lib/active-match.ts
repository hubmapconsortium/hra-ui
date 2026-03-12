// TODO move into router-ext?
import { IsActiveMatchOptions } from '@angular/router';
import { stripLeadingHash } from './path';
import { parseUrl } from './url';

// Reexport options interface
export { IsActiveMatchOptions };

/** A key-value pair */
type Param = [key: string, value: string];

/** A path segment with matrix parameters */
interface SegmentWithMatrixParams {
  /** Path segment */
  segment: string;
  /** Path matrix parameters */
  matrix: Param[];
}

/**
 * Check whether a set could be a subset of another set based on their sizes.
 *
 * @param size1 Size of the first set
 * @param size2 Size of the second set
 * @param exact Whether the sizes should match exactly
 * @returns true if the `size1` is less than or equal to `size2`, false otherwise
 */
function checkSubsetSize(size1: number, size2: number, exact: boolean): boolean {
  return exact ? size1 === size2 : size1 <= size2;
}

/**
 * Check whether a set is a subset of another set. Keys are compared case insensitively and values are compared case sensitively.
 * This function assumes that the first set is smaller than or equal to the second set.
 *
 * @param iterable1 The first set
 * @param iterable2 The second set
 * @returns true if the first set is a subset of the second set, false otherwise
 */
function checkSubset(iterable1: Iterable<Param>, iterable2: Iterable<Param>): boolean {
  const set: (Param | undefined)[] = Array.from(iterable2).map(([key, value]): Param => [key.toLowerCase(), value]);

  for (const [key, value] of iterable1) {
    const icaseKey = key.toLowerCase();
    const index = set.findIndex((entry) => entry && entry[0] === icaseKey && entry[1] === value);

    if (index < 0) {
      return false;
    }

    set[index] = undefined;
  }

  return true;
}

/**
 * Parse a path segment with matrix parameters into an object containing the segment and its matrix parameters.
 *
 * @param segment The path segment to parse
 * @returns An object containing the segment and its matrix parameters
 */
function parseSegment(segment: string): SegmentWithMatrixParams {
  const parts = segment.split(';');
  const name = parts.shift() as string;
  const matrix: Param[] = [];

  for (const param of parts) {
    const [key, ...values] = param.split('=');
    matrix.push([key, values.join('=')]);
  }

  return { segment: name, matrix };
}

/**
 * Parse a path into an array of segments with their matrix parameters.
 * The path is normalized by removing leading and trailing slashes before parsing.
 *
 * @param path The path to parse
 * @returns An array of segments with their matrix parameters
 */
function parsePathSegments(path: string): SegmentWithMatrixParams[] {
  path = path.replace(/^\/+|\/+$/g, '');
  if (!path) {
    return [];
  }

  return path.split('/').map(parseSegment);
}

/**
 * Compare two sets of matrix parameters based on the provided options.
 *
 * @param params1 The first set of matrix parameters
 * @param params2 The second set of matrix parameters
 * @param options The options to determine how the comparison should be performed
 * @returns true if the sets of matrix parameters match based on the options, false otherwise
 */
function compareMatrixParams(params1: Param[], params2: Param[], options: IsActiveMatchOptions): boolean {
  if (options.matrixParams === 'ignored') {
    return true;
  } else if (!checkSubsetSize(params1.length, params2.length, options.matrixParams === 'exact')) {
    return false;
  }

  return checkSubset(params1, params2);
}

/**
 * Compare two paths that may contain matrix parameters based on the provided options.
 *
 * @param path1 The first path to compare
 * @param path2 The second path to compare
 * @param options The options to determine how the comparison should be performed
 * @returns true if the paths match based on the options, false otherwise
 */
function comparePathsWithMatrixParams(path1: string, path2: string, options: IsActiveMatchOptions): boolean {
  if (path1 === path2) {
    return true;
  }

  const parsed1 = parsePathSegments(path1);
  const parsed2 = parsePathSegments(path2);
  if (!checkSubsetSize(parsed1.length, parsed2.length, options.paths === 'exact')) {
    return false;
  }

  for (let index = 0; index < parsed1.length; index++) {
    const segment1 = parsed1[index];
    const segment2 = parsed2[index];
    if (segment1.segment !== segment2.segment || !compareMatrixParams(segment1.matrix, segment2.matrix, options)) {
      return false;
    }
  }

  return true;
}

/**
 * Compare two sets of query parameters based on the provided options.
 *
 * @param params1 The first set of query parameters
 * @param params2 The second set of query parameters
 * @param options The options to determine how the comparison should be performed
 * @returns true if the sets of query parameters match based on the options, false otherwise
 */
function compareQueryParams(
  params1: URLSearchParams,
  params2: URLSearchParams,
  options: IsActiveMatchOptions,
): boolean {
  if (options.queryParams === 'ignored') {
    return true;
  } else if (!checkSubsetSize(params1.size, params2.size, options.queryParams === 'exact')) {
    return false;
  }

  return checkSubset(params1, params2);
}

/**
 * Compare two fragments based on the provided options.
 *
 * @param fragment1 The first fragment to compare
 * @param fragment2 The second fragment to compare
 * @param options The options to determine how the comparison should be performed
 * @returns true if the fragments match based on the options, false otherwise
 */
function compareFragments(fragment1: string, fragment2: string, options: IsActiveMatchOptions): boolean {
  return options.fragment === 'ignored' || stripLeadingHash(fragment1) === stripLeadingHash(fragment2);
}

/**
 * Compare two urls similar to how `Router.isActive` compares url trees.
 * The urls are parsed and compared based on the provided options.
 *
 * @param targetUrl The target url to compare
 * @param currentUrl The current url to compare
 * @param options The options to determine how the comparison should be performed
 * @returns true if the urls match based on the options, false otherwise
 */
export function isUrlActive(targetUrl: string, currentUrl: string, options?: Partial<IsActiveMatchOptions>): boolean {
  const optionsWithDefaults: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'subset',
    matrixParams: 'ignored',
    fragment: 'ignored',
    ...options,
  };
  const base = 'http://example.com';
  const url1 = parseUrl(targetUrl, base);
  const url2 = parseUrl(currentUrl, base);
  if (!url1 || !url2) {
    return false;
  }

  const sameOrigin = url1.origin === url2.origin || url1.origin === base;
  return (
    sameOrigin &&
    comparePathsWithMatrixParams(url1.pathname, url2.pathname, optionsWithDefaults) &&
    compareQueryParams(url1.searchParams, url2.searchParams, optionsWithDefaults) &&
    compareFragments(url1.hash, url2.hash, optionsWithDefaults)
  );
}
