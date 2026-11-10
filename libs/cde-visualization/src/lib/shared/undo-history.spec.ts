import { UndoHistory } from './undo-history';

describe('UndoHistory', () => {
  it('starts with nothing to undo or redo', () => {
    const history = new UndoHistory('a');

    expect(history.value).toBe('a');
    expect(history.canUndo()).toBe(false);
    expect(history.canRedo()).toBe(false);
    expect(history.undo()).toBe(false);
    expect(history.redo()).toBe(false);
  });

  it('undoes and redoes recorded values in order', () => {
    const history = new UndoHistory('a');
    history.record('b');
    history.record('c');

    expect(history.undo()).toBe(true);
    expect(history.value).toBe('b');
    expect(history.undo()).toBe(true);
    expect(history.value).toBe('a');
    expect(history.canUndo()).toBe(false);
    expect(history.canRedo()).toBe(true);

    expect(history.redo()).toBe(true);
    expect(history.value).toBe('b');
    expect(history.canUndo()).toBe(true);
  });

  it('ignores the current value, such as the one undo just went to', () => {
    const history = new UndoHistory('a');
    history.record('b');
    history.undo();
    history.record('a');

    expect(history.canRedo()).toBe(true);
  });

  it('clears the redo steps when a new value is recorded', () => {
    const history = new UndoHistory('a');
    history.record('b');
    history.undo();
    history.record('c');

    expect(history.canRedo()).toBe(false);
    expect(history.undo()).toBe(true);
    expect(history.value).toBe('a');
  });

  it('starts again from a value on reset', () => {
    const history = new UndoHistory<string | undefined>(undefined);
    history.record('b');
    history.reset('c');

    expect(history.value).toBe('c');
    expect(history.canUndo()).toBe(false);
    expect(history.canRedo()).toBe(false);
  });
});
