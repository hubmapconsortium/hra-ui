import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppsCardComponent } from '@hra-ui/design-system/apps-card';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { NavHeaderButtonsComponent, NavHeaderButtonsVariant } from '@hra-ui/design-system/nav-header-buttons';
import { ProductName } from '@hra-ui/design-system/product-logo';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SoftwareStatus } from '@hra-ui/design-system/software-status-indicator';

/** HuBMAP cards data */
export const HUBMAP_CARDS_DATA = [
  {
    category: 'About',
    cards: [
      {
        name: 'HuBMAP Consortium',
        icon: 'assets/logo/hubmap.svg',
        title: 'HuBMAP Consortium',
        description:
          'HuBMAP all access: Learn about us, our policies, data, and tools. Explore our publications and how to work with us.',
        link: 'https://hubmapconsortium.org/',
      },
    ],
  },
  {
    category: 'Data',
    cards: [
      {
        name: 'HubMAP Data Portal',
        icon: 'assets/logo/data_portal.svg',
        title: 'HuBMAP Data Portal',
        description:
          'Explore, visualize and download consortium-generated spatial and single cell data for the human body.',
        link: 'https://portal.hubmapconsortium.org/',
      },
      {
        name: 'Data Portal Workspaces',
        icon: 'assets/logo/data_portal.svg',
        title: 'Data Portal Workspaces',
        description:
          'Access HuBMAP data in a lightweight exploration platform and perform analyses directly within the portal.',
        link: 'https://portal.hubmapconsortium.org/workspaces',
      },
    ],
  },
  {
    category: 'Atlas',
    cards: [
      {
        name: 'Human Reference Atlas',
        icon: 'assets/logo/hra_small.svg',
        title: 'Human Reference Atlas',
        description:
          'Use the HRA Portal to access atlas data, explore atlas functionality, and contribute to the Human Reference Atlas.',
        link: 'https://humanatlas.io/',
      },
      {
        name: 'Exploration User Interface',
        icon: 'assets/logo/eui.svg',
        title: 'Exploration User Interface',
        description:
          'Explore and validate spatially registered single-cell datasets in three-dimensions across organs.',
        link: 'https://apps.humanatlas.io/eui/',
      },
      {
        name: 'ASCT+B Reporter',
        icon: 'assets/logo/asctb-reporter.svg',
        title: 'ASCT+B Reporter',
        description:
          'Explore and compare ASCT+B tables and construct validated panels for multiplexed antibody-based imaging (OMAPs) tables.',
        link: 'https://hubmapconsortium.github.io/ccf-asct-reporter/',
      },
    ],
  },
  {
    category: 'Analytics Tools',
    cards: [
      {
        name: 'Azimuth',
        icon: 'assets/logo/azimuth.svg',
        title: 'Azimuth',
        description:
          'Azimuth uses a reference dataset to process, analyze, and interpret single-cell RNA-seq or ATAC-seq experiments.',
        link: 'https://azimuth.hubmapconsortium.org/',
      },
      {
        name: 'FUSION',
        icon: 'assets/logo/fusion.svg',
        title: 'FUSION',
        description: 'Functional Unit State Identification and Navigation with WSI.',
        link: 'http://fusion.hubmapconsortium.org/?utm_source=hubmap',
      },
      {
        name: 'Antibody Validation Reports',
        icon: 'assets/logo/antibody-validation-reports.svg',
        title: 'Antibody Validation Reports',
        description:
          'Provide antibody details for multiplex imaging assays and capture data requested by journals for manuscript submission.',
        link: 'https://avr.hubmapconsortium.org/',
      },
    ],
  },
];

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
  readonly app = input.required<ProductName>();
  /** Name of the app */
  readonly title = input.required<string>();
  /** Status of the app */
  readonly status = input<SoftwareStatus>();
  /** Data to display in sidenav */
  readonly data = HUBMAP_CARDS_DATA;
}
