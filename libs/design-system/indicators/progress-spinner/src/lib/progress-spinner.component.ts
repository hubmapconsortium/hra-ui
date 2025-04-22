import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/** Alignment options */
export type SpinnerSize = 'small' | 'large';

/** Color options */
export type SpinnerColor = 'dark' | 'light' | 'color';

/**
 * HRA Progress Spinner Component
 */
@Component({
  selector: 'hra-progress-spinner',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"hra-spinner-color-" + color()',
  },
})
export class ProgressSpinnerComponent {
  /**
   * Field for variant option
   */
  readonly size = input<SpinnerSize>('large');

  /**
   * Field for color option
   */
  readonly color = input.required<SpinnerColor>();

  /**
   * Computed field for the diameter of the spinner.
   */
  readonly diameter = computed(() => {
    return this.size() === 'small' ? 24 : 48;
  });
}
