import { getDefaultAssetsHref } from './tokens';

describe('getDefaultAssetsHref()', () => {
  it('should return the first http[s] candidate path', () => {
    const base = 'https://www.example.com/subdir/';
    const candidates = ['bad/path', base + 'file.js'];
    expect(getDefaultAssetsHref(candidates)).toEqual(base);
  });

  it('returns the empty string if there are no matching candidate paths', () => {
    expect(getDefaultAssetsHref()).toEqual('');
  });
});
