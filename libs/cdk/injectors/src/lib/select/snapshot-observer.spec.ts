import { SnapshotObserver } from './snapshot-observer';

describe('SnapshotObserver', () => {
  let observer: SnapshotObserver<unknown>;

  beforeEach(() => {
    observer = new SnapshotObserver();
  });

  describe('get()', () => {
    it('should return the latest value', () => {
      const value = { prop: 1 };
      observer.next(value);
      expect(observer.get()).toBe(value);
    });

    it('should throw the error if an error has been emitted', () => {
      const error = new Error('test');
      observer.error(error);
      expect(() => observer.get()).toThrowError(error);
    });
  });

  describe('next(value)', () => {
    it('should set the current value', () => {
      const value = 'abc';
      expect(observer.get()).toBeUndefined();
      observer.next(value);
      expect(observer.get()).toEqual(value);
    });
  });

  describe('error(err)', () => {
    it('should set an error value', () => {
      const error = new Error('test');
      expect(observer.get()).toBeUndefined();
      observer.error(error);
      expect(() => observer.get()).toThrowError(error);
    });
  });
});
