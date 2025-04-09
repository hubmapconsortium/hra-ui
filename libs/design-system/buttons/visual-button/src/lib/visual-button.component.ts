import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type VisualButtonVariant = 'bottom' | 'top';

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
  readonly label = input.required<string>();
  readonly imageUrl = input.required<string>();
  readonly variant = input<VisualButtonVariant>('bottom');
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly cardClick = output<void>();
}
