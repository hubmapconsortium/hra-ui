import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { DocsNavigationCategory } from '../types/docs-navigation.schema';

/** Navigation Category Component */
@Component({
  selector: 'hra-navigation-category',
  imports: [CommonModule, MatExpansionModule, MatIconModule, NavigationItemComponent],
  templateUrl: './navigation-category.component.html',
  styleUrl: './navigation-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationCategoryComponent {
  /** Navigation category data */
  readonly navigationCategory = input.required<DocsNavigationCategory>();

  /** Navigation category expanded state */
  readonly expanded = input<boolean>(false);

  /** Base URL for the appliation */
  readonly baseUrl = input.required<string>();

  /** Navigation category expanded state change event */
  readonly expandedChange = output<boolean>();
}
