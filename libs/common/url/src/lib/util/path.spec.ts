import { isAbsolute, joinWithSlash, stripLeadingHash, stripTrailingSlash } from './path';

describe('isAbsolute(path)', () => {
  it('returns true for abolute urls', () => {
    expect(isAbsolute('https://example.com')).toBeTruthy();
    expect(isAbsolute('file://a.csv')).toBeTruthy();
  });

  it('returns false for relative urls', () => {
    expect(isAbsolute('test.json')).toBeFalsy();
    expect(isAbsolute('./assets/image.png')).toBeFalsy();
    expect(isAbsolute('/main.js')).toBeFalsy();
  });
});

describe('joinWithSlash(start, end)', () => {
  it('should join to paths', () => {
    expect(joinWithSlash('', '')).toEqual('');
    expect(joinWithSlash('', 'a')).toEqual('a');
    expect(joinWithSlash('b', '')).toEqual('b');
    expect(joinWithSlash('c', 'd')).toEqual('c/d');
    expect(joinWithSlash('e/', 'f')).toEqual('e/f');
    expect(joinWithSlash('g', '/h')).toEqual('g/h');
    expect(joinWithSlash('i/', '/j')).toEqual('i/j');
  });
});

describe('stripTrailingSlash(path)', () => {
  it('should remove the trailing slash while preserving the fragment and query parameters', () => {
    expect(stripTrailingSlash('a')).toEqual('a');
    expect(stripTrailingSlash('b/')).toEqual('b');
    expect(stripTrailingSlash('c/#frag')).toEqual('c#frag');
    expect(stripTrailingSlash('d/?param=value')).toEqual('d?param=value');
    expect(stripTrailingSlash('e/#frag/?param=val')).toEqual('e#frag/?param=val');
  });
});

describe('stripLeadingHash(fragment)', () => {
  it('should remove the leading hash if present', () => {
    expect(stripLeadingHash('')).toEqual('');
    expect(stripLeadingHash('a')).toEqual('a');
    expect(stripLeadingHash('#b')).toEqual('b');
  });
});
