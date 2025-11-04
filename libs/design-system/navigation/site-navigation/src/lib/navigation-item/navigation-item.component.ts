import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListItemTitle } from '@angular/material/list';
import { HraCommonModule } from '@hra-ui/common';
import { injectRouter, RouterExtModule } from '@hra-ui/common/router-ext';
import { DocsNavigationItem } from '../types/docs-navigation.schema';

/** Navigation Item Component */
@Component({
  selector: 'hra-navigation-item',
  imports: [HraCommonModule, RouterExtModule, MatListItem, MatIconModule, MatListItemTitle],
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationItemComponent {
  /** Navigation Item Data */
  readonly navigationItem = input.required<DocsNavigationItem>();

  private readonly router = injectRouter({ optional: true });
}
