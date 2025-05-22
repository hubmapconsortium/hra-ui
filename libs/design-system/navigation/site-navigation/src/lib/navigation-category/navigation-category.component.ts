import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { DocsNavigationCategory } from '../types/docs-navigation.schema';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';

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
}
