import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Title card component */
@Component({
  selector: 'hra-title-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCardComponent {
  /** Title for title card */
  @Input() title = '';

  /** Description for title card */
  @Input() description = '';
}
