import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { DocsNavigationItem } from '../types/docs-navigation.schema';

/** Navigation Item Component */
@Component({
  selector: 'hra-navigation-item',
  imports: [CommonModule, MatListItem, RouterLink, MatIconModule, MatListItemTitle],
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationItemComponent {
  /** Navigation Item Data */
  readonly navigationItem = input.required<DocsNavigationItem>();

  /**
   * Boolean flag to indicate whether the
   * navigation item is present in a category or not.
   */
  readonly isInCategory = input<boolean>(false);
}
