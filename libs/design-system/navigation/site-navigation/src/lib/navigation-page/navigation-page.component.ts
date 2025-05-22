import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { DocsNavigationItem } from '../types/docs-navigation.schema';

@Component({
  selector: 'hra-navigation-page',
  imports: [CommonModule, MatListItem, RouterLink, MatIconModule, MatListItemTitle],
  templateUrl: './navigation-page.component.html',
  styleUrl: './navigation-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationPageComponent {
  readonly navigationItem = input.required<DocsNavigationItem>();
  readonly isInCategory = input<boolean>(false);
}
