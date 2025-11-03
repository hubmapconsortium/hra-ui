import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { HraCommonModule } from '@hra-ui/common';
import { BreadcrumbItem, BreadcrumbsComponent } from '@hra-ui/design-system/buttons/breadcrumbs';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { coerceIconList, IconsModule } from '@hra-ui/design-system/icons';

/** Label for a page section. Can also be used standalone */
@Component({
  selector: 'hra-page-label',
  imports: [HraCommonModule, IconsModule, SectionLinkComponent, BreadcrumbsComponent, MatChipsModule],
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

  /** Breadcrumbs to display above the label */
  readonly breadcrumbs = input<BreadcrumbItem[]>();

  /** Date to display below the label */
  readonly date = input<string>();

  /** Tags/labels to display below the date */
  readonly tags = input<string[]>([]);
}
