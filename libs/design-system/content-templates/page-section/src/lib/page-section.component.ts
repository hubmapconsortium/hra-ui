import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';

/**
 * Section of page containing content and a section header withlink for navigation
 */
@Component({
  selector: 'hra-page-section',
  imports: [CommonModule, MatDividerModule, SectionLinkComponent],
  templateUrl: './page-section.component.html',
  styleUrl: './page-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionComponent {
  /** Size of tagline font (1 -> 6, 1 = largest) */
  readonly size = input<number>(1);

  /** Whether to display the divider under the tagline */
  readonly showDivider = input<boolean>(false);

  /** Tagline text */
  readonly tagline = input.required<string>();
}
