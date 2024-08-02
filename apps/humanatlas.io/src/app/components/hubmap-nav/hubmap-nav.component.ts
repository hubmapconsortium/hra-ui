import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HubmapNavItems } from './hubmap-nav';

/**
 * Hubmap Navigation Component
 */
@Component({
  selector: 'hubmap-nav',
  templateUrl: './hubmap-nav.component.html',
  styleUrl: './hubmap-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubmapNavComponent {
  /** Navigation Menu Items */
  navItems = input<HubmapNavItems[]>();

  data = [
    {
      menuName: 'HuBMAP Tools & Applications',
    },
    {
      menuName: 'About',
      card: [
        {
          icon: 'assets/images/hubmap-consortium.svg',
          title: 'HuBMAP Consortium',
          description:
            'HuBMAP all access: Learn about us, our policies, data, and tools. Explore our publications and how to work with us.',
        },
      ],
    },
    {
      menuName: 'Data',
      card: [
        {
          icon: 'assets/images/hubmap-portal.svg',
          title: 'HuBMAP Data Portal',
          description:
            'Explore, visualize and download consortium-generated spatial and single cell data for the human body.',
        },
        {
          icon: 'assets/images/hubmap-portal.svg',
          title: 'Data Portal Workspaces',
          description:
            'Access HuBMAP data in a lightweight exploration platform and perform analyses directly within the portal.',
        },
      ],
    },
    {
      menuName: 'Atlas',
      card: [
        {
          icon: 'assets/images/hra.svg',
          title: 'Human Reference Atlas',
          description:
            'Use the HRA Portal to access atlas data, explore atlas functionality, and contribute to the Human Reference Atlas.',
        },
        {
          icon: 'assets/images/hubmap-eui.svg',
          title: 'Exploration User Interface',
          description:
            'Explore and validate spatially registered single-cell datasets in three-dimensions across organs.',
        },
        {
          icon: 'assets/images/reporter.svg',
          title: 'ASCT+B Reporter',
          description:
            'Explore and compare ASCT+B tables and construct validated panels for multiplexed antibody-based imaging (OMAPs) tables.',
        },
      ],
    },
    {
      menuName: 'Analytics Tools',
      card: [
        {
          icon: 'assets/images/azimuth.svg',
          title: 'Azimuth',
          description:
            'Azimuth uses a reference dataset to process, analyze, and interpret single-cell RNA-seq or ATAC-seq experiments.',
        },
        {
          icon: 'assets/images/fusion.svg',
          title: 'FUSION',
          description: 'Functional Unit State Identification and Navigation with WSI.',
        },
        {
          icon: 'assets/images/antibody.svg',
          title: 'Antibody Validation Reports',
          description:
            'Provide antibody details for multiplex imaging assays and capture data requested by journals for manuscript submission.',
        },
      ],
    },
  ];
}
