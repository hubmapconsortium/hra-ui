import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

/** Displays title card to the user with title and description */
@Component({
  selector: 'hra-title-card',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCardComponent {
  /** Title for the title card shown to the user*/
  @Input() title = '';

  /** Description for the title card shown to the user*/
  @Input() description = '';
}
