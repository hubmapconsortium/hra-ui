import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

export interface Position {
  x: number;
  y: number;
  z: number;
}

const DIRECTION_FACTORS: Record<string, number[]> = {
  q: [0, 0, 1],
  e: [0, 0, -1],
  w: [0, 1, 0],
  s: [0, -1, 0],
  a: [-1, 0, 0],
  d: [1, 0, 0],
};

/**
 * Behavioral component for spatial search keyboard UI
 */
@Component({
  selector: 'ccf-spatial-search-keyboard-ui-behavior',
  templateUrl: './spatial-search-keyboard-ui-behavior.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'handleKey($event)',
    '(document:keyup)': 'keyUp($event)',
  },
})
export class SpatialSearchKeyboardUIBehaviorComponent {
  /** HTML class */
  @HostBinding('class') readonly className = 'ccf-spatial-search-keyboard-ui-behavior';

  /** Amount the position shifts for each key press */
  @Input() delta = 1;

  /** Input of spatial search keyboard uibehavior component */
  @Input() shiftDelta = 2;

  /** Current position of spatial search */
  @Input() position!: Position;

  @Input() disablePositionChange = false;

  /** Emits when position changes */
  @Output() readonly changePosition = new EventEmitter<Position>();

  /** Current key being pressed/clicked */
  currentKey?: string;

  /** Current delta */
  currentDelta!: number;

  /** True while shift key is pressed */
  shiftPressed = false;

  /**
   * Shifts position based on key
   * @param key Key value
   */
  updatePosition(key: string): void {
    this.currentDelta = this.shiftPressed ? this.shiftDelta : this.delta;
    this.currentKey = key.toLowerCase();
    const factors = DIRECTION_FACTORS[this.currentKey];
    if (factors !== undefined) {
      const { x, y, z } = this.position;
      const delta = this.currentDelta;
      this.position = {
        x: x + factors[0] * delta,
        y: y + factors[1] * delta,
        z: z + factors[2] * delta,
      };

      this.changePosition.emit(this.position);
    }
  }

  /**
   * Listens for keydown keyboard event and updates the position
   * @param target Keyboard event
   */
  handleKey(target: KeyboardEvent): void {
    if (target.shiftKey) {
      this.shiftPressed = true;
    }
    if (this.disablePositionChange) {
      return;
    }
    target.preventDefault();
    this.updatePosition(target.key);
  }

  /**
   * Listens for keyup keyboard event and updates currentKey / shiftPressed
   * @param target Keyboard event
   */
  keyUp(target: KeyboardEvent): void {
    if (target.key === 'Shift') {
      this.shiftPressed = false;
    } else {
      this.currentKey = undefined;
    }
  }

  /**
   * Updates the position when a key is clicked
   * @param key Key value
   */
  keyClick(key: string): void {
    this.updatePosition(key);
  }

  /**
   * Updates current key when a key is hovered over
   * @param key Key value
   */
  keyHover(key?: string): void {
    this.currentKey = key;
  }
}
