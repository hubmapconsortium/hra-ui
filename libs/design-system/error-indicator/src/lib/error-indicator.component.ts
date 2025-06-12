import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/** Error Indicator component */
@Component({
  selector: 'hra-error-indicator',
  imports: [CommonModule, MatIconModule],
  templateUrl: './error-indicator.component.html',
  styleUrl: './error-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorIndicatorComponent {
  /** List of errors to be shown in the indicator */
  readonly errors = input<string[]>();
}
