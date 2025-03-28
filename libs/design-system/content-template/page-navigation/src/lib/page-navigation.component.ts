import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { NavigationItemComponent } from './navigation-item.component';

/** Nested section item */
export interface Section {
  /** Name of section */
  name: string;
  /** List of child sections */
  children?: Section[];
}

/**
 * Page navigation component for navigating between different sections on a page
 */
@Component({
  selector: 'hra-page-navigation',
  imports: [CommonModule, NavigationItemComponent],
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavigationComponent {
  /** Text for the header portion */
  readonly tagline = input<string>('On this page');
  /** Section list */
  readonly sections = input<Section[]>([]);
  /** Current selected section */
  readonly currentItem = signal<string>('');
}
