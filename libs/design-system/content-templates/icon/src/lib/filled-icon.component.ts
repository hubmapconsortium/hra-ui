import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FilledIconDirective } from '@hra-ui/design-system/icons';

/**
 * Filled Icon Component
 *
 * This component allows the user to display an icon.
 * The icon is passed as a string, which can be either a font icon or an SVG icon.
 */
@Component({
  selector: 'hra-filled-icon',
  imports: [CommonModule, MatIconModule, FilledIconDirective],
  templateUrl: './filled-icon.component.html',
  styleUrl: './filled-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilledIconComponent {
  /** Font icon */
  readonly fontIcon = input<string>('');
  /** SVG icon */
  readonly svgIcon = input<string>('');
  /** Icon color */
  readonly iconColor = input<string>();
  /** Fill color */
  readonly fillColor = input<string>();
}
