import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageState } from './storage.state';
import { StorageContext, StorageId } from './storage.model';
import { mock } from 'jest-mock-extended';
import { Set, Delete, Clear } from './storage.actions';
describe('StorageState', () => {
  const ctx = mock<StorageContext>();
  let state: StorageState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StorageState],
    });

    state = TestBed.inject(StorageState);
  });

  afterEach(() => jest.clearAllMocks());

  describe('set(ctx, action)', () => {
    it('should should set hello to world in local storage', () => {
      state.set(ctx, new Set(StorageId.Local, 'hello', 'world'));
      expect(StorageState.getStorage(StorageId.Local).getItem('hello')).toBe('world');
    });
  });

  describe('set(ctx, action)', () => {
    it('should should set hello to world in session storage', () => {
      state.set(ctx, new Set(StorageId.Session, 'helloSession', 'worldSession'));
      expect(StorageState.getStorage(StorageId.Session).getItem('helloSession')).toBe('worldSession');
    });
  });

  describe('delete(action)', () => {
    it('should should delete hello in local storage', () => {
      state.delete(ctx, new Delete(StorageId.Local, 'hello'));
      expect(StorageState.getStorage(StorageId.Local).getItem('hello')).toBe(null);
    });
  });

  describe('delete(action)', () => {
    it('should should delete hello in session storage', () => {
      state.delete(ctx, new Delete(StorageId.Session, 'helloSession'));
      expect(StorageState.getStorage(StorageId.Session).getItem('helloSession')).toBe(null);
    });
  });

  describe('clear(action)', () => {
    it('should should clear local storage', () => {
      state.clear(ctx, new Clear(StorageId.Local));
      expect(StorageState.getStorage(StorageId.Local).length).toBe(0);
    });
  });

  describe('clear(action)', () => {
    it('should should clear session storage', () => {
      state.clear(ctx, new Clear(StorageId.Session));
      expect(StorageState.getStorage(StorageId.Session).length).toBe(0);
    });
  });
});
