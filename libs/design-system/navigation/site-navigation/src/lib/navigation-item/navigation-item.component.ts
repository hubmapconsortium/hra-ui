import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListItemTitle } from '@angular/material/list';
import { HraCommonModule } from '@hra-ui/common';
import { LinkActiveDirective, LinkDirective } from '@hra-ui/common/router-ext';
import { DocsNavigationItem } from '../types/docs-navigation.schema';
import { ACTIVE_MATCH_OPTIONS } from '../utils/match-options';

/** Navigation Item Component */
@Component({
  selector: 'hra-navigation-item',
  imports: [
    CommonModule,
    MatListItem,
    MatIconModule,
    MatListItemTitle,
    HraCommonModule,
    LinkDirective,
    LinkActiveDirective,
  ],
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationItemComponent {
  /** Navigation Item Data */
  readonly navigationItem = input.required<DocsNavigationItem>();

  /** Link matching options */
  protected readonly matchOptions = ACTIVE_MATCH_OPTIONS;
}
