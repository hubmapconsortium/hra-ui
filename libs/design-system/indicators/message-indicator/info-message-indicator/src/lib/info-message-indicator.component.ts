import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Info Message Indicator Component
 */
@Component({
  selector: 'hra-info-message-indicator',
  imports: [CommonModule, MatIconModule],
  templateUrl: './info-message-indicator.component.html',
  styleUrl: './info-message-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoMessageIndicatorComponent {}
