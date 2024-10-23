import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppsCardComponent } from '@hra-ui/design-system/apps-card';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { NavHeaderButtonsComponent, NavHeaderButtonsVariant } from '@hra-ui/design-system/nav-header-buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SoftwareStatus } from '@hra-ui/design-system/software-status-indicator';

export interface CardData {
  category: string;
  cards: {
    name: string;
    icon: string;
    title: string;
    description: string;
    link: string;
  }[];
}

/**
 * Navigation Header Component
 */
@Component({
  selector: 'hra-nav-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    NavHeaderButtonsComponent,
    IconButtonSizeDirective,
    MatSidenavModule,
    AppsCardComponent,
    ScrollingModule,
  ],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavHeaderComponent {
  /** Variant of the header */
  readonly variant = input<NavHeaderButtonsVariant>('basic');
  /** Link to the app */
  readonly link = input.required<string>();
  /** Current app */
  readonly app = input.required<string>();
  /** Name of the app */
  readonly title = input.required<string>();
  /** Status of the app */
  readonly status = input<SoftwareStatus>();
  /** Data to display in sidenav */
  readonly navigationCategories = input.required<CardData[]>();
}
