import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Danger Message Indicator Component
 */
@Component({
  selector: 'hra-danger-message-indicator',
  imports: [CommonModule, MatIconModule],
  templateUrl: './danger-message-indicator.component.html',
  styleUrl: './danger-message-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DangerMessageIndicatorComponent {}
