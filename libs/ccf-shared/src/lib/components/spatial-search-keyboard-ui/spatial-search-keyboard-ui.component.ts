import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Keyboard control UI for spatial search
 */
@Component({
  selector: 'ccf-spatial-search-keyboard-ui',
  standalone: false,
  templateUrl: './spatial-search-keyboard-ui.component.html',
  styleUrl: './spatial-search-keyboard-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchKeyboardUIComponent {
  /** Current key pressed */
  @Input() currentKey?: string;

  /** True if shift key is pressed */
  @Input() shiftPressed!: boolean;

  /** Emits when a key is clicked */
  @Output() readonly keyClicked = new EventEmitter<string>();

  /** Emits the key value when a key is hovered over */
  @Output() readonly keyHovered = new EventEmitter<string | undefined>();
}
