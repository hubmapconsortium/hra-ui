import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { monitorHeight, monitorWidth } from './monitor-height';

describe('monitorHeight and monitorWidth', () => {
  let resizeCallback: ResizeObserverCallback;
  const observe = jest.fn();

  beforeEach(() => {
    globalThis.ResizeObserver = jest.fn((callback: ResizeObserverCallback) => {
      resizeCallback = callback;
      return { observe, unobserve: jest.fn(), disconnect: jest.fn() };
    }) as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    Reflect.deleteProperty(globalThis, 'ResizeObserver');
    observe.mockClear();
  });

  function createElement(width: number, height: number): HTMLElement {
    const element = document.createElement('div');
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({ width, height } as DOMRect);
    return element;
  }

  function resize(width: number, height: number): void {
    resizeCallback([{ contentRect: { width, height } } as ResizeObserverEntry], {} as ResizeObserver);
  }

  it('starts from the element height and follows resizes', () => {
    const element = createElement(100, 200);
    const height = TestBed.runInInjectionContext(() => monitorHeight(() => new ElementRef(element)));
    TestBed.tick();
    expect(height()).toBe(200);
    expect(observe).toHaveBeenCalledWith(element);

    resize(300, 400);
    expect(height()).toBe(400);
  });

  it('starts from the element width and follows resizes', () => {
    const element = createElement(100, 200);
    const width = TestBed.runInInjectionContext(() => monitorWidth(() => element));
    TestBed.tick();
    expect(width()).toBe(100);
    expect(observe).toHaveBeenCalledWith(element);

    resize(300, 400);
    expect(width()).toBe(300);
  });
});
