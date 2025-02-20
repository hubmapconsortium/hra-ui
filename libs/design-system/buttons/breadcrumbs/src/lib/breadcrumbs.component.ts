import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';

/** Breadcrumb item */
export interface BreadcrumbItem {
  /** Name of item */
  name: string;
  /** Route to page */
  route?: string;
}

/**
 * Component used to help the user understand their location within websites
 */
@Component({
  selector: 'hra-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, TextHyperlinkDirective],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  /** Crumbs to display */
  readonly crumbs = input<BreadcrumbItem[]>([]);
}
