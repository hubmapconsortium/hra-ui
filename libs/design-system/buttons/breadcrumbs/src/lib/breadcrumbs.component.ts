import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/** Breadcrumb item */
export interface BreadcrumbItem {
  /** Name of item */
  name: string;
  /** Route to page */
  route?: string;
  /** Icon shown in place of the name on a linked crumb. The name still labels the link and shows as its tooltip. */
  icon?: string;
}

/**
 * Component used to help the user understand their location within websites
 */
@Component({
  selector: 'hra-breadcrumbs',
  imports: [CommonModule, LinkDirective, MatIconButton, MatIconModule, PlainTooltipDirective, TextHyperlinkDirective],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  /** Crumbs to display */
  readonly crumbs = input<BreadcrumbItem[]>([]);
}
