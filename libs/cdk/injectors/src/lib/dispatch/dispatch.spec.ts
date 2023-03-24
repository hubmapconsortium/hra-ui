import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { mock, mockFn } from 'jest-mock-extended';
import { lastValueFrom, of } from 'rxjs';
import { dispatch, dispatch$ } from './dispatch';

jest.mock('@angular/core');

const boundArgs = ['q', {}, 'w'];
const args = [1, 'a', true];
const actionInstance = { type: 'test' };
const actionType = mockFn().mockReturnValue(actionInstance);
const store = mock<Store>();
jest.mocked(inject).mockReturnValue(store);
store.dispatch.mockReturnValue(of(undefined));

afterEach(() => jest.clearAllMocks());

describe(dispatch, () => {
  const fn = dispatch(actionType);

  it('should create a new action instance on each call', () => {
    fn();
    expect(actionType).toHaveBeenCalledTimes(1);
    fn();
    expect(actionType).toHaveBeenCalledTimes(2);
  });

  it('should forward arguments to the action constructor', () => {
    fn(...args);
    expect(actionType).toHaveBeenCalledWith(...args);
  });

  it('should forward bound arguments to the action constructor', () => {
    const fn2 = dispatch(actionType, ...boundArgs);
    fn2(...args);
    expect(actionType).toHaveBeenCalledWith(...boundArgs, ...args);
  });

  it('should dispatch the action', () => {
    fn();
    expect(store.dispatch).toHaveBeenCalledWith(actionInstance);
  });

  it('should return the action instance', () => {
    expect(fn()).toBe(actionInstance);
  });
});

describe(dispatch$, () => {
  const fn = dispatch$(actionType);

  it('should create a new action instance on each call', () => {
    fn();
    expect(actionType).toHaveBeenCalledTimes(1);
    fn();
    expect(actionType).toHaveBeenCalledTimes(2);
  });

  it('should forward arguments to the action constructor', () => {
    fn(...args);
    expect(actionType).toHaveBeenCalledWith(...args);
  });

  it('should forward bound arguments to the action constructor', () => {
    const fn2 = dispatch$(actionType, ...boundArgs);
    fn2(...args);
    expect(actionType).toHaveBeenCalledWith(...boundArgs, ...args);
  });

  it('should dispatch the action', () => {
    fn();
    expect(store.dispatch).toHaveBeenCalledWith(actionInstance);
  });

  it('should return the action instance', async () => {
    await expect(lastValueFrom(fn())).resolves.toBe(actionInstance);
  });
});
