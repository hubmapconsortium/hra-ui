import { getHistoryShortcut, getHistoryShortcutLabels } from './history-shortcuts';

describe('getHistoryShortcut', () => {
  function press(key: string, modifiers: KeyboardEventInit = {}): KeyboardEvent {
    return new KeyboardEvent('keydown', { key, ...modifiers });
  }

  it('undoes on Ctrl or ⌘ with Z', () => {
    expect(getHistoryShortcut(press('z', { ctrlKey: true }))).toBe('undo');
    expect(getHistoryShortcut(press('Z', { metaKey: true }))).toBe('undo');
  });

  it('redoes on Ctrl+Y, and on Shift with Ctrl or ⌘ and Z', () => {
    expect(getHistoryShortcut(press('y', { ctrlKey: true }))).toBe('redo');
    expect(getHistoryShortcut(press('Z', { ctrlKey: true, shiftKey: true }))).toBe('redo');
    expect(getHistoryShortcut(press('z', { metaKey: true, shiftKey: true }))).toBe('redo');
  });

  it('leaves other keys alone, including ⌘+Y and Alt combinations', () => {
    expect(getHistoryShortcut(press('z'))).toBeUndefined();
    expect(getHistoryShortcut(press('y', { metaKey: true }))).toBeUndefined();
    expect(getHistoryShortcut(press('z', { ctrlKey: true, altKey: true }))).toBeUndefined();
    expect(getHistoryShortcut(press('x', { ctrlKey: true }))).toBeUndefined();
  });
});

describe('getHistoryShortcutLabels', () => {
  it('shows ⌘ on Apple devices and Ctrl elsewhere', () => {
    expect(getHistoryShortcutLabels('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')).toEqual({
      undo: '⌘Z',
      redo: '⇧⌘Z',
    });
    expect(getHistoryShortcutLabels('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toEqual({
      undo: 'Ctrl+Z',
      redo: 'Ctrl+Y',
    });
  });
});
