import { actionTypeRegistry, assertUniqueActionType, registerActionType } from './action-type-registry';

const type = 'Test Action Type';
afterEach(() => actionTypeRegistry.clear());

describe(assertUniqueActionType, () => {
  it('does nothing if the type is unique', () => {
    expect(() => assertUniqueActionType(type)).not.toThrow();
  });

  it('throws if the type is already registered', () => {
    actionTypeRegistry.add(type);
    expect(() => assertUniqueActionType(type)).toThrow();
  });
});

describe(registerActionType, () => {
  it('registers the type if it is unique', () => {
    registerActionType(type);
    expect(actionTypeRegistry.has(type)).toBeTruthy();
  });

  it('throws if the type is already registered', () => {
    registerActionType(type);
    expect(() => registerActionType(type)).toThrow();
  });
});
