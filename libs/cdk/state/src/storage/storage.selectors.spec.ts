import { StorageId } from './storage.model';
import { StorageSelectors } from './storage.selectors';

describe('StorageSelectors', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();

    localStorage.setItem('hello', 'world');
    sessionStorage.setItem('session1', 'value1');
  });

  describe('get()', () => {
    it('returns the item', () => {
      const selector = StorageSelectors.get();
      expect(selector(StorageId.Local, 'hello')).toEqual('world');
      expect(selector(StorageId.Session, 'session1')).toEqual('value1');
      expect(selector(StorageId.Local, 'hello2')).toEqual(undefined);
    });
  });

  describe('length()', () => {
    it('returns the length item', () => {
      const selector = StorageSelectors.length();
      expect(selector(StorageId.Local)).toEqual(1);
      expect(selector(StorageId.Session)).toEqual(1);
    });
  });
});
