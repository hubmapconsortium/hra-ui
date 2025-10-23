/**
 * Test whether a mouse event is an auxiliary click
 *
 * @param event Click event
 * @returns true if the event is an auxiliary click, false otherwise
 */
export function isAuxClick(event: MouseEvent): boolean {
  const { button, ctrlKey, shiftKey, altKey, metaKey } = event;
  return button !== 0 || ctrlKey || shiftKey || altKey || metaKey;
}
