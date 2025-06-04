import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { coerceIconList, IconsModule } from '@hra-ui/design-system/icons';

/** Label for a page section. Can also be used standalone */
@Component({
  selector: 'hra-page-label',
  imports: [CommonModule, IconsModule, SectionLinkComponent],
  templateUrl: './page-label.component.html',
  styleUrl: './page-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLabelComponent {
  /** Label */
  readonly tagline = input.required<string>();

  /** Which level of <hx> to use */
  readonly level = input(1, { transform: numberAttribute });

  /** Icons to display as part of the label */
  readonly icons = input([], { transform: coerceIconList });

  /** Anchor id of this label */
  readonly anchor = input<string>();
}
