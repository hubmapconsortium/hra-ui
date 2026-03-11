import { HttpErrorResponse } from '@angular/common/http';
import { serialize } from './serialize';

function createAnchorElement(attrs: Record<string, string>): HTMLAnchorElement {
  const el = document.createElement('a');
  for (const [attr, value] of Object.entries(attrs)) {
    el.setAttribute(attr, value);
  }

  return el;
}

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
  });

  it('should serialize events into plain objects', () => {
    const msg = 'unexpected error';
    const file = 'test.ts';
    const event = new ErrorEvent('error', { message: msg, filename: file, lineno: 5, colno: 10 });
    expect(serialize(event)).toEqual({ message: msg, filename: file, lineno: 5, colno: 10 });

    const event2 = new KeyboardEvent('pressed', { key: 'q', shiftKey: true });
    expect(serialize(event2)).toEqual({ key: 'q', shiftKey: true });

    const event3 = new MouseEvent('click', { button: 0, buttons: 2, ctrlKey: true });
    expect(serialize(event3)).toEqual({ button: 0, buttons: 2, ctrlKey: true });

    const href = 'https://example.com';
    const anchorEl4 = createAnchorElement({ href, target: '_blank' });
    const event4 = Object.defineProperty(new MouseEvent('click'), 'currentTarget', { value: anchorEl4 });
    expect(serialize(event4)).toMatchObject({ href, target: '_blank' });

    const anchorEl5 = createAnchorElement({ href, download: 'file.csv', type: 'text/csv' });
    const event5 = Object.defineProperty(new MouseEvent('click'), 'currentTarget', { value: anchorEl5 });
    const result5 = serialize(event5);
    expect(result5).toMatchObject({ href, download: 'file.csv', type: 'text/csv' });
    expect(result5).not.toMatchObject({ target: expect.anything() });

    const event6 = new CustomEvent('custom');
    expect(serialize(event6)).toEqual({ type: 'custom' });
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

  it('should serialize HttpErrorResponse into plain objects', () => {
    const response = new HttpErrorResponse({
      status: 404,
      url: 'https://example.com/resource',
      statusText: 'Not Found',
      error: 'Resource not found',
    });

    expect(serialize(response)).toEqual({
      status: 404,
      url: 'https://example.com/resource',
      message: 'Http failure response for https://example.com/resource: 404 Not Found',
      error: 'Resource not found',
    });
  });

  it('should return other objects unchanged', () => {
    const obj = { a: 1, b: 'two', c: true };
    expect(serialize(obj)).toBe(obj);
  });
});
