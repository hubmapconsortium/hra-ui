import { serialize } from './serialize';

describe('serialize(value)', () => {
  it('should return primitive (including null) values unchanged', () => {
    expect(serialize('a')).toEqual('a');
    expect(serialize(1)).toEqual(1);
    expect(serialize(false)).toEqual(false);
    expect(serialize(-1n)).toEqual(-1n);
    expect(serialize(undefined)).toEqual(undefined);
    expect(serialize(null)).toEqual(null);
  });

  it('should serialize dates into ISO strings', () => {
    const date = new Date(0);
    expect(serialize(date)).toEqual(date.toISOString());
  });

  it('should serialize errors into plain objects', () => {
    const msg = 'my error message';
    const error = new Error(msg);
    expect(serialize(error)).toEqual({ message: msg, name: error.name, stack: expect.any(String) });

    const error2 = new TypeError(msg);
    expect(serialize(error2)).toEqual({ message: msg, name: error2.name, stack: expect.any(String) });

    const stack = 'a line of a long stack trace\n'.repeat(1000);
    const error3 = Object.defineProperty(new Error(msg), 'stack', { value: stack });
    const result = serialize(error3) as { stack: string };
    expect(result.stack.length).toBeLessThanOrEqual(4000);
  });

  it('should serialize events into plain objects or undefined', () => {
    const msg = 'unexpected error';
    const file = 'test.ts';
    const event = new ErrorEvent('error', { message: msg, filename: file, lineno: 5, colno: 10 });
    expect(serialize(event)).toEqual({ message: msg, filename: file, lineno: 5, colno: 10 });

    const event2 = new KeyboardEvent('pressed', { key: 'q', shiftKey: true });
    expect(serialize(event2)).toEqual({ key: 'q', shiftKey: true });

    const event3 = new MouseEvent('click', { button: 0, buttons: 2, ctrlKey: true });
    expect(serialize(event3)).toEqual({ button: 0, buttons: 2, ctrlKey: true });

    const event4 = new CustomEvent('custom');
    expect(serialize(event4)).toEqual(undefined);
  });

  it('should serialize maps into an object containing an array of entries', () => {
    const entries = [
      [1, 2],
      [3, 4],
    ] as const;
    expect(serialize(new Map(entries))).toEqual({ map: entries });
  });

  it('should serialize sets into an object containing an array of values', () => {
    const values = [1, 'a', true] as const;
    expect(serialize(new Set(values))).toEqual({ set: values });
  });
});
