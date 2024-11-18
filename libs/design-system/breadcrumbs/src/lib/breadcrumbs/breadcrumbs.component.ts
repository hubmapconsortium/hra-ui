import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@hra-ui/design-system/button';

/** Breadcrumb item */
interface BreadcrumbItem {
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
  imports: [CommonModule, MatIconModule, ButtonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  /** Crumbs to display */
  readonly crumbs = input<BreadcrumbItem[]>([]);
}
