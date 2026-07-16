import { findOrThrow } from './find-or-throw';

describe('findOrThrow', () => {
  it('should return the first matching item', () => {
    const array = [1, 2, 3, 4, 5];
    const result = findOrThrow(array, (value) => value === 3);
    expect(result).toBe(3);
  });

  it('should return the first matching item in an array of objects', () => {
    const array = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
    ];
    const result = findOrThrow(array, (item) => item.id === 2);
    expect(result).toEqual({ id: 2, name: 'b' });
  });

  it('should use the predicate with index parameter', () => {
    const array = [10, 20, 30, 40];
    const result = findOrThrow(array, (value, index) => index === 2);
    expect(result).toBe(30);
  });

  it('should pass the full array to the predicate', () => {
    const array = [1, 2, 3];
    let passedArray: number[] | undefined;
    findOrThrow(array, (value, index, arr) => {
      passedArray = arr;
      return value === 2;
    });
    expect(passedArray).toEqual([1, 2, 3]);
  });

  it('should throw error with default message when no match is found', () => {
    const array = [1, 2, 3];
    expect(() => findOrThrow(array, (value) => value === 99)).toThrow('Could not find a matching item');
  });

  it('should throw error with custom string message when no match is found', () => {
    const array = [1, 2, 3];
    const customError = 'Item not found in array';
    expect(() => findOrThrow(array, (value) => value === 99, customError)).toThrow(customError);
  });

  it('should throw error with custom function message when no match is found', () => {
    const array = [1, 2, 3];
    const errorMessage = 'No item matching the criteria';
    const errorFn = () => errorMessage;
    expect(() => findOrThrow(array, (value) => value === 99, errorFn)).toThrow(errorMessage);
  });

  it('should not call error function if a match is found', () => {
    const array = [1, 2, 3];
    const errorFn = jest.fn(() => 'error');
    const result = findOrThrow(array, (value) => value === 2, errorFn);
    expect(result).toBe(2);
    expect(errorFn).not.toHaveBeenCalled();
  });

  it('should throw when searching an empty array', () => {
    const array: number[] = [];
    expect(() => findOrThrow(array, () => true)).toThrow('Could not find a matching item');
  });

  it('should work with array of strings', () => {
    const array = ['apple', 'banana', 'cherry'];
    const result = findOrThrow(array, (str) => str.startsWith('b'));
    expect(result).toBe('banana');
  });

  it('should throw for array of strings when no match', () => {
    const array = ['apple', 'banana', 'cherry'];
    expect(() => findOrThrow(array, (str) => str.startsWith('z'))).toThrow('Could not find a matching item');
  });

  it('should find the first match when multiple items match predicate', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const result = findOrThrow(array, (value) => value > 2);
    expect(result).toBe(3);
  });
});
