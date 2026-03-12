import { IsActiveMatchOptions } from '@angular/router';
import { isUrlActive } from './active-match';

describe('isUrlActive', () => {
  const TARGET_EMPTY = '';
  const TARGET_SLASH_ONLY = '/';
  const TARGET_WITH_ORIGIN = 'https://example.com';
  const TARGET_WITH_ORIGIN_2 = 'https://other.example.com';
  const TARGET_WITH_PATH = '/foo/bar';
  const TARGET_WITH_MATRIX_PARAMS = '/foo;a=1;b=2/bar';
  const TARGET_WITH_QUERY = '/foo/bar?a=1';
  const TARGET_WITH_FRAGMENT = '/foo/bar#abc';
  const TARGET_WITH_EVERYTHING = '/foo;a=1;b=2/bar?a=1&b=2#abc';
  const CURRENT_EMPTY = '';
  const CURRENT_WITH_ORIGIN = 'https://example.com';
  const CURRENT_WITH_PATH = `${CURRENT_WITH_ORIGIN}/foo/bar`;
  const CURRENT_WITH_PATH_2 = `${CURRENT_WITH_ORIGIN}/foo/bar/baz`;
  const CURRENT_WITH_PATH_3 = `${CURRENT_WITH_ORIGIN}/abc/def`;
  const CURRENT_WITH_MATRIX_PARAMS = `${CURRENT_WITH_ORIGIN}/foo;a=1;b=2/bar`;
  const CURRENT_WITH_MATRIX_PARAMS_2 = `${CURRENT_WITH_ORIGIN}/foo;b=2;a=1/bar`;
  const CURRENT_WITH_MATRIX_PARAMS_3 = `${CURRENT_WITH_ORIGIN}/foo;a=1;b=2;c=3/bar`;
  const CURRENT_WITH_MATRIX_PARAMS_4 = `${CURRENT_WITH_ORIGIN}/foo;a=3;b=2/bar`;
  const CURRENT_WITH_QUERY = `${CURRENT_WITH_ORIGIN}/foo/bar?a=1`;
  const CURRENT_WITH_QUERY_2 = `${CURRENT_WITH_ORIGIN}/foo/bar?a=1&b=2`;
  const CURRENT_WITH_QUERY_3 = `${CURRENT_WITH_ORIGIN}/foo/bar?b=2&a=1`;
  const CURRENT_WITH_QUERY_4 = `${CURRENT_WITH_ORIGIN}/foo/bar?a=3`;
  const CURRENT_WITH_FRAGMENT = `${CURRENT_WITH_ORIGIN}/foo/bar#abc`;
  const CURRENT_WITH_FRAGMENT_2 = `${CURRENT_WITH_ORIGIN}/foo/bar#def`;
  const CURRENT_WITH_EVERYTHING = `${CURRENT_WITH_ORIGIN}/foo;a=1;b=2/bar?a=1&b=2#abc`;

  const DEFAULT_MATCH_OPTIONS: IsActiveMatchOptions = {
    fragment: 'ignored',
    matrixParams: 'ignored',
    paths: 'subset',
    queryParams: 'ignored',
  };

  type TestCase = [targetUrl: string, currentUrl: string, options: Partial<IsActiveMatchOptions>, result: boolean];
  const TEST_CASES: TestCase[] = [
    // Origin checks
    [TARGET_EMPTY, CURRENT_EMPTY, {}, true],
    [TARGET_EMPTY, CURRENT_WITH_ORIGIN, {}, true],
    [TARGET_SLASH_ONLY, CURRENT_WITH_ORIGIN, {}, true],
    [TARGET_WITH_ORIGIN, CURRENT_WITH_ORIGIN, {}, true],
    [TARGET_WITH_ORIGIN, CURRENT_EMPTY, {}, false],
    [TARGET_WITH_ORIGIN_2, CURRENT_WITH_ORIGIN, {}, false],

    // Path checks
    [TARGET_WITH_PATH, CURRENT_WITH_PATH, {}, true],
    [TARGET_WITH_PATH, CURRENT_WITH_PATH_2, {}, true],
    [TARGET_WITH_PATH, CURRENT_WITH_PATH, { paths: 'exact' }, true],
    [TARGET_WITH_PATH, CURRENT_WITH_PATH_2, { paths: 'exact' }, false],
    [TARGET_WITH_PATH, CURRENT_WITH_PATH_3, {}, false],

    // Matrix parameter checks
    [TARGET_WITH_MATRIX_PARAMS, CURRENT_WITH_PATH, {}, true],
    [TARGET_WITH_MATRIX_PARAMS, CURRENT_WITH_MATRIX_PARAMS, { matrixParams: 'exact' }, true],
    [TARGET_WITH_MATRIX_PARAMS, CURRENT_WITH_MATRIX_PARAMS_2, { matrixParams: 'exact' }, true],
    [TARGET_WITH_MATRIX_PARAMS, CURRENT_WITH_MATRIX_PARAMS_3, { matrixParams: 'subset' }, true],
    [TARGET_WITH_MATRIX_PARAMS, CURRENT_WITH_MATRIX_PARAMS_3, { matrixParams: 'exact' }, false],
    [TARGET_WITH_MATRIX_PARAMS, CURRENT_WITH_MATRIX_PARAMS_4, { matrixParams: 'subset' }, false],
    [TARGET_WITH_MATRIX_PARAMS, CURRENT_WITH_MATRIX_PARAMS_4, { matrixParams: 'exact' }, false],

    // Query checks
    [TARGET_WITH_QUERY, CURRENT_WITH_PATH, {}, true],
    [TARGET_WITH_QUERY, CURRENT_WITH_QUERY, { queryParams: 'subset' }, true],
    [TARGET_WITH_QUERY, CURRENT_WITH_QUERY, { queryParams: 'exact' }, true],
    [TARGET_WITH_QUERY, CURRENT_WITH_QUERY_2, { queryParams: 'subset' }, true],
    [TARGET_WITH_QUERY, CURRENT_WITH_QUERY_3, { queryParams: 'subset' }, true],
    [TARGET_WITH_QUERY, CURRENT_WITH_QUERY_2, { queryParams: 'exact' }, false],
    [TARGET_WITH_QUERY, CURRENT_WITH_QUERY_4, { queryParams: 'subset' }, false],
    [TARGET_WITH_QUERY, CURRENT_WITH_QUERY_4, { queryParams: 'exact' }, false],

    // Fragment checks
    [TARGET_WITH_FRAGMENT, CURRENT_WITH_PATH, {}, true],
    [TARGET_WITH_FRAGMENT, CURRENT_WITH_FRAGMENT, { fragment: 'exact' }, true],
    [TARGET_WITH_FRAGMENT, CURRENT_WITH_PATH, { fragment: 'exact' }, false],
    [TARGET_WITH_FRAGMENT, CURRENT_WITH_FRAGMENT_2, { fragment: 'exact' }, false],

    // Everything check
    [
      TARGET_WITH_EVERYTHING,
      CURRENT_WITH_EVERYTHING,
      { paths: 'exact', matrixParams: 'exact', queryParams: 'exact', fragment: 'exact' },
      true,
    ],
  ];

  it.each(TEST_CASES)(
    "should match '%s' against '%s' with options %j with a result of %p",
    (targetUrl, currentUrl, options, expected) => {
      expect(isUrlActive(targetUrl, currentUrl, { ...DEFAULT_MATCH_OPTIONS, ...options })).toEqual(expected);
    },
  );
});
