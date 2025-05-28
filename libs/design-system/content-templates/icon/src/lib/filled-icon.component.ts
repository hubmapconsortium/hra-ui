import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/**
 * Filled Icon Component
 *
 * This component allows the user to display an icon.
 * The icon is passed as a string, which can be either a font icon or an SVG icon.
 */
@Component({
  selector: 'hra-filled-icon',
  imports: [CommonModule, MatIconModule],
  templateUrl: './filled-icon.component.html',
  styleUrl: './filled-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilledIconComponent {
  /**This is the font icon */
  readonly fontIcon = input<string>();
  /**This is the SVG icon */
  readonly svgIcon = input<string>();
  /** This is the HRA filled icon */
  readonly hraFilledIcon = input<string>();
}
