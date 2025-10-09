import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/** Alignment options */
export type SpinnerSize = 'small' | 'large';

/** Color options */
export type SpinnerColor = 'dark' | 'light' | 'color';

/**
 * HRA Progress Bar Component
 */
@Component({
  selector: 'hra-progress-bar',
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"hra-progress-bar-color-" + color()',
  },
})
export class ProgressBarComponent {
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
