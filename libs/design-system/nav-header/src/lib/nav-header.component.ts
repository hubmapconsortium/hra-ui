import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { AppNavButtonComponent } from '@hra-ui/design-system/buttons/app-nav-button';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { NavHeaderButtonsComponent, NavHeaderButtonsVariant } from '@hra-ui/design-system/nav-header-buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SoftwareStatus } from '@hra-ui/design-system/software-status-indicator';

/** Sidenav card data */
export interface CardData {
  /** Name of card category */
  category: string;
  /** Info for apps in category */
  cards: {
    /** Name of app */
    name: string;
    /** Icon path */
    icon: string;
    /** App title */
    title: string;
    /** App description */
    description: string;
    /** Link to app */
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
    AppNavButtonComponent,
    ScrollingModule,
    AssetUrlPipe,
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
  readonly tagline = input.required<string>();
  /** Status of the app */
  readonly status = input<SoftwareStatus>();
  /** Data to display in sidenav */
  readonly navigationCategories = input.required<CardData[]>();
}
