import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavigationEnd, Router, RouterModule, Scroll } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { NgScrollbar } from 'ngx-scrollbar';
import { debounceTime, filter } from 'rxjs';
import { NavigationCategoryComponent } from './navigation-category/navigation-category.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { DOCS_NAVIGATION_MENU } from './static-data/parsed';
import { DocsMenuItems, DocsNavigationCategory } from './types/docs-navigation.schema';
import { ACTIVE_MATCH_OPTIONS } from './utils/match-options';
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

  /** Angular Router */
  private readonly router = inject(Router);

  /** Constructor */
  constructor() {
    this.router?.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || (event instanceof Scroll && event.routerEvent instanceof NavigationEnd),
        ),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.expandedCategory.set(this.findExpandedCategory(this.navigationMenu()));
      });
  }

  /** Event handler to change the expanded navigation category */
  changeExpandedCategory(isExpanded: boolean, category: string) {
    if (isExpanded) {
      this.expandedCategory.set(category);
    }
  }

  /** Finds the expanded category
   * @param menu Docs Menu Items
   */
  private findExpandedCategory(menu: DocsMenuItems): string {
    const categories = menu.filter((val): val is DocsNavigationCategory => val.type === 'category');

    for (const category of categories) {
      for (const item of category.children) {
        const url = resolveUrl(item.url, this.router, this.baseUrl());
        if (!url.isAbsolute && this.router.isActive(url.value, ACTIVE_MATCH_OPTIONS)) {
          return category.label;
        }
      }
    }

    return '';
  }
}
