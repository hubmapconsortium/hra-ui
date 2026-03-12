import { joinWithSlashes, stripLeadingHash, stripTrailingSlash } from './path';

describe('Path utilities', () => {
  describe('joinWithSlashes', () => {
    it('should join multiple path segments with slashes', () => {
      expect(joinWithSlashes('a', 'b', 'c')).toEqual('a/b/c');
      expect(joinWithSlashes('/a/', '/b/', '/c/')).toEqual('/a/b/c/');
      expect(joinWithSlashes('a/', '/b', 'c/')).toEqual('a/b/c/');
    });

    it('should preserve leading and trailing slashes', () => {
      expect(joinWithSlashes('/a', 'b', 'c/')).toEqual('/a/b/c/');
      expect(joinWithSlashes('/a/', 'b', 'c')).toEqual('/a/b/c');
    });

    it('should skip empty segments', () => {
      expect(joinWithSlashes('', 'a', '', 'b', '', 'c', '')).toEqual('a/b/c');
    });

    it('should not resolve relative path segments', () => {
      expect(joinWithSlashes('a', '.', 'b', '..', 'c')).toEqual('a/./b/../c');
    });
  });

  describe('stripTrailingSlash', () => {
    it('should remove the trailing slash from a path', () => {
      expect(stripTrailingSlash('/path/')).toEqual('/path');
      expect(stripTrailingSlash('/path/to/resource/')).toEqual('/path/to/resource');
    });

    it('should preserve the fragment and query parameters', () => {
      expect(stripTrailingSlash('/path/?query=string#fragment')).toEqual('/path?query=string#fragment');
      expect(stripTrailingSlash('/path/#fragment')).toEqual('/path#fragment');
    });

    it('should not modify paths without a trailing slash', () => {
      expect(stripTrailingSlash('/path')).toEqual('/path');
      expect(stripTrailingSlash('/path?query=string#fragment')).toEqual('/path?query=string#fragment');
    });
  });

  describe('stripLeadingHash', () => {
    it('should remove the leading hash from a fragment', () => {
      expect(stripLeadingHash('#fragment')).toEqual('fragment');
    });

    it('should not modify fragments without a leading hash', () => {
      expect(stripLeadingHash('')).toEqual('');
      expect(stripLeadingHash('fragment')).toEqual('fragment');
    });
  });
});
