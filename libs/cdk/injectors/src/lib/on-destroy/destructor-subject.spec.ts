import { mock } from 'jest-mock-extended';
import { lastValueFrom } from 'rxjs';
import { DestructorScope, isDestructorScopeLike, ScopedDestructorSubject } from './destructor-subject';

describe('isDestructorScopeLike(obj)', () => {
  const scope: DestructorScope = { onDestroy: () => undefined };

  it('should return true for objects with an onDestroy function', () => {
    expect(isDestructorScopeLike(scope)).toBeTruthy();
  });

  it('should return false for objects where onDestroy is not a function', () => {
    expect(isDestructorScopeLike({ onDestroy: false })).toBeFalsy();
  });

  it('should return false for primitives, arrays, and other objects', () => {
    expect(isDestructorScopeLike(null)).toBeFalsy();
    expect(isDestructorScopeLike(undefined)).toBeFalsy();
    expect(isDestructorScopeLike(0)).toBeFalsy();
    expect(isDestructorScopeLike(true)).toBeFalsy();
    expect(isDestructorScopeLike('value')).toBeFalsy();
    expect(isDestructorScopeLike(Symbol())).toBeFalsy();
    expect(isDestructorScopeLike([1, 2])).toBeFalsy();
    expect(isDestructorScopeLike({ prop: 'str' })).toBeFalsy();
    expect(isDestructorScopeLike(() => undefined)).toBeFalsy();
  });
});

describe('ScopedDestructorSubject', () => {
  const scope = mock<DestructorScope>();

  beforeEach(() => jest.clearAllMocks());

  it('should register cleanup when created', () => {
    new ScopedDestructorSubject(scope);
    expect(scope.onDestroy).toHaveBeenCalled();
  });

  it('should emit a single value and complete during cleanup', async () => {
    const subject = new ScopedDestructorSubject(scope);
    scope.onDestroy.mock.lastCall?.[0]();
    await expect(lastValueFrom(subject)).resolves.toBeUndefined();
  });
});
