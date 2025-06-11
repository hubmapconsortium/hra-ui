import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { IsActiveMatchOptions, NavigationEnd, Router, RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { NgScrollbar } from 'ngx-scrollbar';
import { filter } from 'rxjs';
import { NavigationCategoryComponent } from './navigation-category/navigation-category.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { DocsMenuItems, DocsNavigationCategory } from './types/docs-navigation.schema';
import { DOCS_NAVIGATION_MENU } from './static-data/parsed';
import { resolveUrl } from './utils/resolve-url';

/** Site Navigation Component for HRA Docs */
@Component({
  selector: 'hra-site-navigation',
  imports: [
    HraCommonModule,
    MatIconModule,
    ButtonsModule,
    MatDivider,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    RouterModule,
    NavigationCategoryComponent,
    NavigationItemComponent,
    NgScrollbar,
    ScrollingModule,
  ],
  templateUrl: './site-navigation.component.html',
  styleUrl: './site-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteNavigationComponent {
  /** Navigation Menu Items */
  readonly navigationMenu = input(DOCS_NAVIGATION_MENU);

  /** Base URL for the appliation */
  readonly baseUrl = input.required<string>();

  /** State for expanded navigation category */
  readonly expandedCategory = signal('');

  private readonly router = inject(Router);

  constructor() {
    const ref = effect(() => {
      this.expandedCategory.set(this.findExpandedCategory(this.navigationMenu()));
      ref.destroy();
    });
  }

  /** Event handler to change the expanded navigation category */
  changeExpandedCategory(isExpanded: boolean, category: string) {
    if (isExpanded) {
      this.expandedCategory.set(category);
    }
  }

  private findExpandedCategory(menu: DocsMenuItems): string {
    const categories = menu.filter((val): val is DocsNavigationCategory => val.type === 'category');
    const matchOptions: IsActiveMatchOptions = {
      paths: 'exact',
      matrixParams: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
    };

    for (const category of categories) {
      for (const item of category.children) {
        const url = resolveUrl(item.url, this.router, this.baseUrl());
        if (!url.isAbsolute && this.router.isActive(url.value, matchOptions)) {
          return category.label;
        }
      }
    }

    return '';
  }
}
