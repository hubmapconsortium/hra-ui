import { TestBed } from '@angular/core/testing';
import { Any } from '@hra-ui/utils/types';
import { Store } from '@ngxs/store';
import { mockFn } from 'jest-mock-extended';
import { isObservable, lastValueFrom, of } from 'rxjs';
import { dispatch, dispatch$, dispatchAction, dispatchAction$ } from './dispatch';

const boundArgs = ['q', {}, 'w'];
const dispatchArgs = [1, 'a', true];
const actionInstance = { type: 'test' };
const actionType = mockFn().mockReturnValue(actionInstance);
const storeDispatch = mockFn().mockReturnValue(of(undefined));

beforeEach(() => {
  jest.clearAllMocks();
  TestBed.overrideProvider(Store, { useValue: { dispatch: storeDispatch } });
});

function commonTests<R, InitArgs extends Any[], Args extends Any[]>(
  create: (...args: InitArgs) => (...args: Args) => R,
  initArgs: InitArgs,
  args: Args
): void {
  let fn: (...args: Args) => R;

  beforeEach(() => {
    fn = TestBed.runInInjectionContext(() => create(...initArgs));
  });

  it('should dispatch the action', () => {
    fn(...args);
    expect(storeDispatch).toHaveBeenCalledWith(actionInstance);
  });

  it('should return the dispatched actions', async () => {
    const res = fn(...args);
    const resAction = isObservable(res) ? await lastValueFrom(res) : res;
    expect(resAction).toEqual(actionInstance);
  });
}

function commonActionArgumentTests<R, InitArgs extends Any[], Args extends Any[]>(
  create: (...args: InitArgs) => (...args: Args) => R,
  initArgs: InitArgs,
  args: Args
): void {
  let fn: (...args: Args) => R;

  beforeEach(() => {
    fn = TestBed.runInInjectionContext(() => create(...initArgs));
  });

  it('should create a new action instance on each call', () => {
    fn(...args);
    expect(actionType).toHaveBeenCalledTimes(1);
    fn(...args);
    expect(actionType).toHaveBeenCalledTimes(2);
  });

  it('should forward bound and regular arguments to the action constructor', () => {
    fn(...args);
    expect(actionType).toHaveBeenCalledWith(...initArgs.slice(1), ...args);
  });
}

describe('dispatch(type, ...boundArgs)(...args)', () => {
  commonActionArgumentTests(dispatch, [actionType, ...boundArgs], dispatchArgs);
  commonTests(dispatch, [actionType, ...boundArgs], dispatchArgs);
});

describe('dispatch$(type, ...boundArgs)(...args)', () => {
  commonActionArgumentTests(dispatch$, [actionType, ...boundArgs], dispatchArgs);
  commonTests(dispatch$, [actionType, ...boundArgs], dispatchArgs);
});

describe('dispatchAction(type, ...boundArgs)(...args)', () => {
  commonTests(dispatchAction, [], [actionInstance]);
});

describe('dispatchAction(type, ...boundArgs)(...args)', () => {
  commonTests(dispatchAction$, [], [actionInstance]);
});
