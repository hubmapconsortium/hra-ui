import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

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
  ],
  templateUrl: './site-navigation.component.html',
  styleUrl: './site-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteNavigationComponent {
  // TODO: Refactor this to a different file
  protected navigationItems = [
    {
      label: 'Getting Started',
      isCategory: true,
      icon: 'info',
      children: [
        { label: 'Introduction to the Human Reference Atlas', link: '' },
        { label: 'About the project', link: '' },
      ],
    },

    {
      label: 'Apps',
      isCategory: true,
      icon: 'apps',
      children: [
        { label: 'Apps overview', link: '' },
        { label: 'API', link: '' },
        { label: 'ASCT+B Reporter', link: '' },
        { label: 'Cell Distance Explorer', link: '' },
        { label: 'Cell Population Graphs', link: '' },
        { label: 'Cell Population Predictor', link: '' },
        { label: 'Dashboard', link: '' },
        { label: 'Exploration User Interface', link: '' },
        { label: 'Functional Tissue Unit Explorer', link: '' },
        { label: 'HRA Organ Gallery', link: '' },
        { label: 'Knowledge Graph', link: '' },
        { label: 'Registration User Interface', link: '' },
        { label: 'Tissue Origin Predictor', link: '' },
        { label: 'Web Components', link: '' },
      ],
    },

    {
      label: 'Data',
      isCategory: true,
      icon: 'database',
      children: [
        { label: 'Data overview', link: '' },
        { label: '3D Organs', link: '' },
        { label: 'ASCT+B Tables', link: '' },
        { label: 'Cell Type Annotations', link: '' },
        { label: 'Collections', link: '' },
        { label: 'Dataset Graphs', link: '' },
        { label: 'Functional Tissue Unit (FTU) Illustrations', link: '' },
        { label: 'Graphs', link: '' },
        { label: 'Landmarks', link: '' },
        { label: 'Millitome', link: '' },
        { label: 'Organ Mapping Antibody Panels', link: '' },
        { label: 'Schema', link: '' },
        { label: 'Vascular Geometry', link: '' },
      ],
    },
    {
      label: 'Development',
      isCategory: true,
      icon: 'code',
      children: [
        { label: 'Introduction', link: '' },
        { label: 'Change Log', link: '' },
        { label: 'API Reference', link: '' },
        { label: 'FAQs', link: '' },
        { label: 'Support', link: '' },
        { label: 'Tutorials', link: '' },
        { label: 'Digital Objects', link: '' },
        { label: 'Knowledge Graph', link: '' },
        { label: 'Apps', link: '' },
        { label: 'Web Components', link: '' },
        { label: 'Design System', link: '' },
      ],
    },
    {
      label: 'Release Notes',
      icon: 'code',
      isCategory: false,
      link: '',
    },
    {
      label: 'Standard Operating Procedures',
      icon: 'checklist',
      isCategory: false,
      link: '',
    },
  ];
}
