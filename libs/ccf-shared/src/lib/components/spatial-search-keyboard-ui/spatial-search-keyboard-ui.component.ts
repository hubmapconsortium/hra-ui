import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

/**
 * Keyboard control UI for spatial search
 */
@Component({
  selector: 'ccf-spatial-search-keyboard-ui',
  templateUrl: './spatial-search-keyboard-ui.component.html',
  styleUrls: ['./spatial-search-keyboard-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SpatialSearchKeyboardUIComponent {
  /** HTML class */
  @HostBinding('class') readonly className = 'ccf-spatial-search-keyboard-ui';

  /** Current key pressed */
  @Input() currentKey?: string;

  /** True if shift key is pressed */
  @Input() shiftPressed!: boolean;

  /** Emits when a key is clicked */
  @Output() readonly keyClicked = new EventEmitter<string>();

  /** Emits the key value when a key is hovered over */
  @Output() readonly keyHovered = new EventEmitter<string | undefined>();
}
