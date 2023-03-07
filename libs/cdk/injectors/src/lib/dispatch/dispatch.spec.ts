import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { mock, mockClear, mockFn } from 'jest-mock-extended';
import { dispatch } from './dispatch';

jest.mock('@angular/core');

describe(dispatch, () => {
  const actionInstance = { type: 'test' };
  const actionType = mockFn().mockReturnValue(actionInstance);
  const store = mock<Store>();
  jest.mocked(inject).mockReturnValue(store);

  it('should create a new action instance on each call', () => {
    const fn = dispatch(actionType);
    actionType.mockClear();
    fn();
    fn();
    expect(actionType).toHaveBeenCalledTimes(2);
  });

  it('should forward arguments to the action constructor', () => {
    const args = [1, 'a', true];
    const fn = dispatch(actionType);
    fn(...args);
    expect(actionType).toHaveBeenCalledWith(...args);
  });

  it('should dispatch the action', () => {
    const fn = dispatch(actionType);
    mockClear(store);
    fn();
    expect(store.dispatch).toHaveBeenCalledWith(actionInstance);
  });

  it('should return the action instance', () => {
    const fn = dispatch(actionType);
    expect(fn()).toBe(actionInstance);
  });
});
