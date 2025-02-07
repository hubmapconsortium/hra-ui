import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Component representing a flat card component.
 * Displays an header including component title, optional help icon, clsoing icon, placeholder for content, and an optional footer.
 */

@Component({
  selector: 'hra-flat-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatDividerModule, ButtonsModule],
  templateUrl: './flat-card.component.html',
  styleUrl: './flat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlatCardComponent {
  /** Title of the card */
  readonly title = input.required<string>();

  /** Optional help icon */
  readonly showHelpButton = input<boolean>();

  /** Optional divider */
  readonly showDivider = input.required<boolean>();

  /** Optional footer content */
  readonly showButtonsFooter = input.required<boolean>();

  /** Optional footer content */
  readonly leftButtonText = input<string>();
  readonly rightButtonText = input<string>();
  readonly isButtonDisabled = input<boolean>();
}
