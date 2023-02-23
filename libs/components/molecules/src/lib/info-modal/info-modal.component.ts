import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'hra-info-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoModalComponent {
  /**
   * value to display.
   */
  @Input() text = '';

  /** Emitted when the close icon is clicked */
  @Output() readonly closeClick = new EventEmitter<void>();
}
