import { Signal, signal } from '@angular/core';

/**
 * Undo and redo history of a value. Each recorded value becomes a step that undo goes back from,
 * and recording a new value clears the steps that redo would go forward to.
 */
export class UndoHistory<T> {
  /** Values to go back to, the most recent last */
  private readonly undoStack: T[] = [];

  /** Values to go forward to, the next one last */
  private redoStack: T[] = [];

  /** Whether there is a step to undo */
  private readonly undoAvailable = signal(false);

  /** Whether there is a step to redo */
  private readonly redoAvailable = signal(false);

  /** Whether there is a step to undo */
  readonly canUndo: Signal<boolean> = this.undoAvailable.asReadonly();

  /** Whether there is a step to redo */
  readonly canRedo: Signal<boolean> = this.redoAvailable.asReadonly();

  /**
   * Creates a history that starts at a value
   *
   * @param current Starting value
   */
  constructor(private current: T) {}

  /** Current value */
  get value(): T {
    return this.current;
  }

  /**
   * Records a new value as a step. The current value is ignored, such as the one undo or redo just went to.
   *
   * @param value New value
   */
  record(value: T): void {
    if (value === this.current) {
      return;
    }

    this.undoStack.push(this.current);
    this.redoStack = [];
    this.current = value;
    this.updateAvailability();
  }

  /**
   * Goes back one step
   *
   * @returns Whether there was a step to undo
   */
  undo(): boolean {
    return this.move(this.undoStack, this.redoStack);
  }

  /**
   * Goes forward one step
   *
   * @returns Whether there was a step to redo
   */
  redo(): boolean {
    return this.move(this.redoStack, this.undoStack);
  }

  /**
   * Clears every step and starts again from a value
   *
   * @param value Starting value
   */
  reset(value: T): void {
    this.undoStack.length = 0;
    this.redoStack = [];
    this.current = value;
    this.updateAvailability();
  }

  /** Moves the current value to one stack and takes the next value from the other */
  private move(from: T[], to: T[]): boolean {
    if (from.length === 0) {
      return false;
    }

    to.push(this.current);
    this.current = from.pop() as T;
    this.updateAvailability();
    return true;
  }

  /** Updates whether undo and redo are available */
  private updateAvailability(): void {
    this.undoAvailable.set(this.undoStack.length > 0);
    this.redoAvailable.set(this.redoStack.length > 0);
  }
}
