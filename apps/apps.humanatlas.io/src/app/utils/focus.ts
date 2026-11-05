import { afterNextRender, Injector } from '@angular/core';

/**
 * Focuses an element after the next render, so keyboard focus isn't lost
 * when the view replaces the focused element, such as a button swapped for a file chip.
 * Does nothing when focus is outside the container, unless forced.
 *
 * @param container Element that must hold focus for the move to happen
 * @param getTarget Returns the element to focus once the view has updated
 * @param injector Injector used to schedule the render callback
 * @param force Whether to move focus even when it is outside the container
 */
export function focusAfterNextRender(
  container: HTMLElement,
  getTarget: () => HTMLElement | null | undefined,
  injector: Injector,
  force = false,
): void {
  if (!force && !container.contains(container.ownerDocument.activeElement)) {
    return;
  }

  afterNextRender(() => getTarget()?.focus(), { injector });
}
