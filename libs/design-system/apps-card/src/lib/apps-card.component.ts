import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-apps-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apps-card.component.html',
  styleUrl: './apps-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppsCardComponent {
  icon = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
}
