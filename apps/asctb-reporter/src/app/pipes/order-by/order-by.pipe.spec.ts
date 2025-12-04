import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should sort array by property', () => {
    const data = [
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
    ];

    const result = pipe.transform(data, 'name');

    expect(result).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
      { name: 'Charlie', age: 30 },
    ]);
  });

  it('should not modify original array', () => {
    const data = [{ name: 'B' }, { name: 'A' }];
    const original = [...data];

    pipe.transform(data, 'name');

    expect(data).toEqual(original);
  });

  it('should handle equal values', () => {
    const data = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 25 },
    ];

    const result = pipe.transform(data, 'age');

    expect(result).toHaveLength(3);
    expect(result.every((item) => item.age === 25)).toBe(true);
  });
});
