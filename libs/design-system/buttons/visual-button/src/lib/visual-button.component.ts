import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/** Type for the visual button */
export type VisualButtonVariant = 'bottom' | 'top';

/** Visual Button Component */
@Component({
  selector: 'hra-visual-button',
  imports: [CommonModule, MatIconModule],
  templateUrl: './visual-button.component.html',
  styleUrl: './visual-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"hra-visual-button-" + variant()',
  },
})
export class VisualButtonComponent {
  /** Label for the button */
  readonly label = input.required<string>();
  /** Imgae URL for the button */
  readonly imageUrl = input.required<string>();
  /** Variant (top/bottom) for the button */
  readonly variant = input<VisualButtonVariant>('top');
  /** disabled property of the button */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Output for cardClick */
  readonly cardClick = output<void>();
}
