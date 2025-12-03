import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Component displaying a x, y, and z position
 */
@Component({
  selector: 'ccf-xyz-position',
  standalone: false,
  templateUrl: './xyz-position.component.html',
  styleUrl: './xyz-position.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XYZPositionComponent {
  /** X position */
  @Input() x = 0;

  /** Y position */
  @Input() y = 0;

  /** Z position */
  @Input() z = 0;

  /** Number format for position values */
  readonly format = '1.0-2';
}
