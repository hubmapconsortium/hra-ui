import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListItemTitle } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { DocsNavigationItem } from '../types/docs-navigation.schema';
import { resolveUrl } from '../utils/resolve-url';
import { ACTIVE_MATCH_OPTIONS } from '../utils/match-options';

/** Navigation Item Component */
@Component({
  selector: 'hra-navigation-item',
  imports: [CommonModule, MatListItem, RouterModule, MatIconModule, MatListItemTitle],
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationItemComponent {
  /** Navigation Item Data */
  readonly navigationItem = input.required<DocsNavigationItem>();

  /** Base URL for the appliation */
  readonly baseUrl = input.required<string>();

  /** Resolved URL for the navigation item */
  protected readonly url = computed(() => resolveUrl(this.navigationItem().url, this.router, this.baseUrl()));

  /** Options for router link active */
  protected routerLinkActiveOptions = ACTIVE_MATCH_OPTIONS;

  /** Angular Router */
  private readonly router = inject(Router);
}
