import { isAbsolute, joinWithSlash } from './path';

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
