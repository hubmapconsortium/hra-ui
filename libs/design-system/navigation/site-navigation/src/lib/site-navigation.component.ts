import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { DocsMenuItems } from './types/docs-navigation.schema';
import { NavigationCategoryComponent } from './navigation-category/navigation-category.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NgScrollbar } from 'ngx-scrollbar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { filter } from 'rxjs';

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
  readonly navigationMenu = input.required<DocsMenuItems>();

  /** State for expanded navigation category */
  readonly expandedCategory = signal('');

  readonly router = inject(Router);

  readonly currentPath = signal<string>('');

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentPath.set(event.urlAfterRedirects);
    });
  }

  /** Event handler to change the expanded navigation category */
  changeExpandedCategory(isExpanded: boolean, category: string) {
    if (isExpanded) {
      this.expandedCategory.set(category);
    }
  }
}
