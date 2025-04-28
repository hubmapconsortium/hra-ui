import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Section link for navigation
 */
@Component({
  selector:
    // eslint-disable-next-line @angular-eslint/component-selector
    `h1[hra-section-link], h2[hra-section-link], h3[hra-section-link],
    h4[hra-section-link], h5[hra-section-link], h6[hra-section-link]`,
  imports: [CommonModule, RouterModule, MatDividerModule, MatIconModule, ButtonsModule],
  templateUrl: './section-link.component.html',
  styleUrl: './section-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionLinkComponent {
  /** Anchor for href */
  readonly anchor = input<string>();

  /** Whether to display the underline */
  readonly underlined = input(false, { transform: booleanAttribute });
}
