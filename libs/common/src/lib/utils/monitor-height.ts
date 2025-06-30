import { coerceElement } from '@angular/cdk/coercion';
import { ElementRef, Signal, signal, effect } from '@angular/core';

/**
 * Monitors the height of a given element.
 * @param elementFn The element function that fetches the element to monitor.
 * @returns Height as a signal.
 */
export function monitorHeight(elementFn: () => Element | ElementRef<Element>): Signal<number> {
  const height = signal(0);
  const observer = new ResizeObserver((entries) => {
    const value = entries[0].contentRect.height;
    height.set(value);
  });

  effect((onCleanup) => {
    const element = coerceElement(elementFn());
    height.set(element.getBoundingClientRect().height);
    observer.observe(element);
    onCleanup(() => observer.unobserve(element));
  });

  return height;
}
