import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

import { SectionLinkComponent } from '../../../section-link/src/lib/section-link.component';

@Component({
  selector: 'hra-page-section',
  imports: [CommonModule, MatDividerModule, SectionLinkComponent],
  templateUrl: './page-section.component.html',
  styleUrl: './page-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionComponent {
  readonly size = input<number>(1);
  readonly tagline = input.required<string>();
}
