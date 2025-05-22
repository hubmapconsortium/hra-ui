import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { NavigationPageComponent } from '../navigation-page/navigation-page.component';
import { DocsNavigationCategory } from '../types/docs-navigation.schema';
import { MatNavList } from '@angular/material/list';

@Component({
  selector: 'hra-navigation-category',
  imports: [CommonModule, MatExpansionModule, MatIconModule, NavigationPageComponent, MatNavList],
  templateUrl: './navigation-category.component.html',
  styleUrl: './navigation-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationCategoryComponent {
  readonly navigationCategory = input.required<DocsNavigationCategory>();
}
