import { IsActiveMatchOptions } from '@angular/router';
import { isUrlActive } from './compare-url';

describe('isUrlActive(targetUrl, currentUrl, options)', () => {
  const targetEmpty = '';
  const targetSlashOnly = '/';
  const targetWithOrigin = 'https://example.com';
  const targetWithOrigin2 = 'https://other.example.com';
  const targetWithPath = '/foo/bar';
  const targetWithMatrixParams = '/foo;a=1;b=2/bar';
  const targetWithQuery = '/foo/bar?a=1';
  const targetWithFragment = '/foo/bar#abc';
  const targetWithEverything = '/foo;a=1;b=2/bar?a=1&b=2#abc';
  const currentEmpty = '';
  const currentWithOrigin = 'https://example.com';
  const currentWithPath = `${currentWithOrigin}/foo/bar`;
  const currentWithPath2 = `${currentWithOrigin}/foo/bar/baz`;
  const currentWithPath3 = `${currentWithOrigin}/abc/def`;
  const currentWithMatrixParams = `${currentWithOrigin}/foo;a=1;b=2/bar`;
  const currentWithMatrixParams2 = `${currentWithOrigin}/foo;b=2;a=1/bar`;
  const currentWithMatrixParams3 = `${currentWithOrigin}/foo;a=1;b=2;c=3/bar`;
  const currentWithMatrixParams4 = `${currentWithOrigin}/foo;a=3;b=2/bar`;
  const currentWithQuery = `${currentWithOrigin}/foo/bar?a=1`;
  const currentWithQuery2 = `${currentWithOrigin}/foo/bar?a=1&b=2`;
  const currentWithQuery3 = `${currentWithOrigin}/foo/bar?b=2&a=1`;
  const currentWithQuery4 = `${currentWithOrigin}/foo/bar?a=3`;
  const currentWithFragment = `${currentWithOrigin}/foo/bar#abc`;
  const currentWithFragment2 = `${currentWithOrigin}/foo/bar#def`;
  const currentWithEverything = `${currentWithOrigin}/foo;a=1;b=2/bar?a=1&b=2#abc`;

  const defaultMatchOptions: IsActiveMatchOptions = {
    fragment: 'ignored',
    matrixParams: 'ignored',
    paths: 'subset',
    queryParams: 'ignored',
  };

  const testCases: [string, string, Partial<IsActiveMatchOptions>, boolean][] = [
    // Origin checks
    [targetEmpty, currentEmpty, {}, true],
    [targetEmpty, currentWithOrigin, {}, true],
    [targetSlashOnly, currentWithOrigin, {}, true],
    [targetWithOrigin, currentWithOrigin, {}, true],
    [targetWithOrigin, currentEmpty, {}, false],
    [targetWithOrigin2, currentWithOrigin, {}, false],

    // Path checks
    [targetWithPath, currentWithPath, {}, true],
    [targetWithPath, currentWithPath2, {}, true],
    [targetWithPath, currentWithPath, { paths: 'exact' }, true],
    [targetWithPath, currentWithPath2, { paths: 'exact' }, false],
    [targetWithPath, currentWithPath3, {}, false],

    // Matrix parameter checks
    [targetWithMatrixParams, currentWithPath, {}, true],
    [targetWithMatrixParams, currentWithMatrixParams, { matrixParams: 'exact' }, true],
    [targetWithMatrixParams, currentWithMatrixParams2, { matrixParams: 'exact' }, true],
    [targetWithMatrixParams, currentWithMatrixParams3, { matrixParams: 'subset' }, true],
    [targetWithMatrixParams, currentWithMatrixParams3, { matrixParams: 'exact' }, false],
    [targetWithMatrixParams, currentWithMatrixParams4, { matrixParams: 'subset' }, false],
    [targetWithMatrixParams, currentWithMatrixParams4, { matrixParams: 'exact' }, false],

    // Query checks
    [targetWithQuery, currentWithPath, {}, true],
    [targetWithQuery, currentWithQuery, { queryParams: 'subset' }, true],
    [targetWithQuery, currentWithQuery, { queryParams: 'exact' }, true],
    [targetWithQuery, currentWithQuery2, { queryParams: 'subset' }, true],
    [targetWithQuery, currentWithQuery3, { queryParams: 'subset' }, true],
    [targetWithQuery, currentWithQuery2, { queryParams: 'exact' }, false],
    [targetWithQuery, currentWithQuery4, { queryParams: 'subset' }, false],
    [targetWithQuery, currentWithQuery4, { queryParams: 'exact' }, false],

    // Fragment checks
    [targetWithFragment, currentWithPath, {}, true],
    [targetWithFragment, currentWithFragment, { fragment: 'exact' }, true],
    [targetWithFragment, currentWithPath, { fragment: 'exact' }, false],
    [targetWithFragment, currentWithFragment2, { fragment: 'exact' }, false],

    // Everything check
    [
      targetWithEverything,
      currentWithEverything,
      { paths: 'exact', matrixParams: 'exact', queryParams: 'exact', fragment: 'exact' },
      true,
    ],
  ];

  for (const [targetUrl, currentUrl, options, result] of testCases) {
    const prettyOptions = Object.entries(options)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    it(`should return ${result} when matching '${targetUrl}' against '${currentUrl}' with options '{${prettyOptions}}'`, () => {
      expect(isUrlActive(targetUrl, currentUrl, { ...defaultMatchOptions, ...options })).toEqual(result);
    });
  }
});
