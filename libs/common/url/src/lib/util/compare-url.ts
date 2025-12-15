import { IsActiveMatchOptions } from '@angular/router';
import { stripLeadingHash } from './path';

/** List of matrix parameter key/value pairs */
type MatrixParams = [string, string][];

/** A path segment with matrix parameters */
interface SegmentWithMatrixParams {
  /** Segment name */
  segment: string;
  /** Matrix parameters */
  matrix: MatrixParams;
}

/**
 * Test whether a set could possibly be a subset of another set purely based on their sizes.
 *
 * @param size1 Size of the first set
 * @param size2 Size of the second set
 * @param exact Whether the sizes should match exactly
 * @returns true if the `size1` is less or equal to `size2`, false otherwise
 */
function checkSubsetSize(size1: number, size2: number, exact: boolean): boolean {
  return exact ? size1 === size2 : size1 <= size2;
}

/**
 * Test whether a set is a subset of another set.
 * Keys are compared case insensitively.
 *
 * @param iterable1 First set of key/value pairs
 * @param iterable2 Second set of key/value pairs
 * @returns true if the first set is a subset of the second one, false otherwise
 */
function checkSubset(iterable1: Iterable<[string, string]>, iterable2: Iterable<[string, string]>): boolean {
  const entries1 = Array.from(iterable1);
  const entries2 = Array.from(iterable2);
  while (entries1.length > 0) {
    const [key1, value1] = entries1.pop() as [string, string];
    const index = entries2.findIndex(
      ([key2, value2]) => key1.toLowerCase() === key2.toLowerCase() && value1 === value2,
    );
    if (index < 0) {
      return false;
    }

    entries2.splice(index, 1);
  }

  return true;
}

/**
 * Parse a path segment that may contain matrix parameters.
 *
 * @param segment Raw segment string
 * @returns A parsed segment object
 */
function parseSegment(segment: string): SegmentWithMatrixParams {
  const parts = segment.split(';');
  const name = parts.shift() as string;
  const matrix: MatrixParams = [];

  for (const param of parts) {
    const [key, ...values] = param.split('=');
    matrix.push([key, values.join('=')]);
  }

  return { segment: name, matrix };
}

/**
 * Parse a path that may contain matrix parameters in one or more segments.
 *
 * @param path Raw path
 * @returns Array of path segments
 */
function parsePathSegments(path: string): SegmentWithMatrixParams[] {
  path = path.replace(/^\/+|\/+$/g, '');
  if (!path) {
    return [];
  }

  return path.split('/').map(parseSegment);
}

/**
 * Check whether two sets of matrix parameters match.
 *
 * @param params1 First set of matrix parameters
 * @param params2 Second set of matrix parameters
 * @param options Comparison options
 * @returns true if the first set matches the second set, false otherwise
 */
function compareMatrixParams(params1: MatrixParams, params2: MatrixParams, options: IsActiveMatchOptions): boolean {
  if (options.matrixParams === 'ignored') {
    return true;
  } else if (!checkSubsetSize(params1.length, params2.length, options.matrixParams === 'exact')) {
    return false;
  }

  return checkSubset(params1, params2);
}

/**
 * Check whether two url paths match.
 *
 * @param path1 First raw path
 * @param path2 Second raw path
 * @param options Comparison options
 * @returns true if the two paths matches, false otherwise
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
 * Check whether two sets of query parameters match.
 *
 * @param params1 First set of query parameters
 * @param params2 Second set of query parameters
 * @param options Comparison options
 * @returns true if the query parameters match, false otherwise
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
 * Check whether two url fragments match.
 *
 * @param fragment1 First fragment
 * @param fragment2 Second fragment
 * @param options Comparison options
 * @returns true if the fragments match, false otherwise
 */
function compareFragments(fragment1: string, fragment2: string, options: IsActiveMatchOptions): boolean {
  return options.fragment === 'ignored' || stripLeadingHash(fragment1) === stripLeadingHash(fragment2);
}

/**
 * Check whether a target url matches the current url based on the match options.
 *
 * @param targetUrl Url to test
 * @param currentUrl Current/active url to test against
 * @param options Comparison options
 * @returns true if `targetUrl` matches `currentUrl`, false otherwise
 */
export function isUrlActive(targetUrl: string, currentUrl: string, options: IsActiveMatchOptions): boolean {
  const base = 'http://localhost';
  const target = new URL(targetUrl, base);
  const current = new URL(currentUrl, base);
  const sameOrigin = target.origin === current.origin || target.origin === base;

  return (
    sameOrigin &&
    comparePathsWithMatrixParams(target.pathname, current.pathname, options) &&
    compareQueryParams(target.searchParams, current.searchParams, options) &&
    compareFragments(target.hash, current.hash, options)
  );
}
