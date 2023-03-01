import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';

/** Displays an information modal to the user with the product title and logo and description */
@Component({
  selector: 'hra-info-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MarkdownModule],
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoModalComponent {
  /** Product title shown to the user */
  @Input() productTitle = '';

  /** Product logo shown to the user */
  @Input() productLogoUrl = '';

  /** Information modal message to the user */
  @Input() description = '';

  /** Emits when the close icon is clicked */
  @Output() readonly closeClick = new EventEmitter<void>();
}
