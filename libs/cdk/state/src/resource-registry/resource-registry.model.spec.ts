import { BuiltinResourceType, createCustomType, isBuiltinType, isCustomType } from './resource-registry.model';

describe('isBuiltinType(type)', () => {
  it('should return true for all builtin types', () => {
    for (const type of Object.values(BuiltinResourceType)) {
      expect(isBuiltinType(type)).toBeTruthy();
    }
  });

  it('should return false for any other type', () => {
    expect(isBuiltinType(createCustomType('abc'))).toBeFalsy();
    expect(isBuiltinType('abc')).toBeFalsy();
  });
});

describe('isCustomType(type)', () => {
  it('should return true for types created by `createCustomType`', () => {
    expect(isCustomType(createCustomType('abc'))).toBeTruthy();
  });

  it('should return false for builtin types', () => {
    expect(isCustomType(BuiltinResourceType.Markdown)).toBeFalsy();
    expect(isCustomType(createCustomType(BuiltinResourceType.Text))).toBeFalsy();
  });

  it('should return false for unwrapped custom types', () => {
    expect(isCustomType('abc')).toBeFalsy();
  });
});
