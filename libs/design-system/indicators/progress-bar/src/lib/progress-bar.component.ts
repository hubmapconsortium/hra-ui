import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/** Color options */
export type ProgressBarColor = 'dark' | 'light' | 'color';

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
   * Field for color option
   */
  readonly color = input.required<ProgressBarColor>();
}
