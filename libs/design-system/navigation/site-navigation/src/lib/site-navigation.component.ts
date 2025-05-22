import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { DocsNavigationMenu } from './types/docs-navigation.schema';
import { NavigationCategoryComponent } from './navigation-category/navigation-category.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';

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
    NavigationCategoryComponent,
    NavigationItemComponent,
  ],
  templateUrl: './site-navigation.component.html',
  styleUrl: './site-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteNavigationComponent {
  /**
   * Navigation menu of site navigation component
   * TODO: move data to static json
   */
  protected readonly navigationMenu: DocsNavigationMenu = {
    $schema: '',
    menuItems: [
      {
        type: 'category',
        label: 'Getting Started',
        icon: 'info',
        children: [
          { type: 'item', label: 'Introduction to the Human Reference Atlas', url: '' },
          { type: 'item', label: 'About the project', url: '' },
        ],
      },
      {
        type: 'category',
        label: 'Apps',
        icon: 'apps',
        children: [
          { type: 'item', label: 'Apps overview', url: '' },
          { type: 'item', label: 'API', url: '' },
          { type: 'item', label: 'ASCT+B Reporter', url: '' },
          { type: 'item', label: 'Cell Distance Explorer', url: '' },
          { type: 'item', label: 'Cell Population Graphs', url: '' },
          { type: 'item', label: 'Cell Population Predictor', url: '' },
          { type: 'item', label: 'Dashboard', url: '' },
          { type: 'item', label: 'Exploration User Interface', url: '' },
          { type: 'item', label: 'Functional Tissue Unit Explorer', url: '' },
          { type: 'item', label: 'HRA Organ Gallery', url: '' },
          { type: 'item', label: 'Knowledge Graph', url: '' },
          { type: 'item', label: 'Registration User Interface', url: '' },
          { type: 'item', label: 'Tissue Origin Predictor', url: '' },
          { type: 'item', label: 'Web Components', url: '' },
        ],
      },

      {
        type: 'category',
        label: 'Data',
        icon: 'database',
        children: [
          { type: 'item', label: 'Data overview', url: '' },
          { type: 'item', label: '3D Organs', url: '' },
          { type: 'item', label: 'ASCT+B Tables', url: '' },
          { type: 'item', label: 'Cell Type Annotations', url: '' },
          { type: 'item', label: 'Collections', url: '' },
          { type: 'item', label: 'Dataset Graphs', url: '' },
          { type: 'item', label: 'Functional Tissue Unit (FTU) Illustrations', url: '' },
          { type: 'item', label: 'Graphs', url: '' },
          { type: 'item', label: 'Landmarks', url: '' },
          { type: 'item', label: 'Millitome', url: '' },
          { type: 'item', label: 'Organ Mapping Antibody Panels', url: '' },
          { type: 'item', label: 'Schema', url: '' },
          { type: 'item', label: 'Vascular Geometry', url: '' },
        ],
      },
      {
        type: 'category',
        label: 'Development',
        icon: 'code',
        children: [
          { type: 'item', label: 'Introduction', url: '' },
          { type: 'item', label: 'Change Log', url: '' },
          { type: 'item', label: 'API Reference', url: '' },
          { type: 'item', label: 'FAQs', url: '' },
          { type: 'item', label: 'Support', url: '' },
          { type: 'item', label: 'Tutorials', url: '' },
          { type: 'item', label: 'Digital Objects', url: '' },
          { type: 'item', label: 'Knowledge Graph', url: '' },
          { type: 'item', label: 'Apps', url: '' },
          { type: 'item', label: 'Web Components', url: '' },
          { type: 'item', label: 'Design System', url: '' },
        ],
      },
      {
        type: 'item',
        label: 'Release Notes',
        icon: 'news',
        url: '/news',
      },
      {
        type: 'item',
        label: 'Standard Operating Procedures',
        icon: 'checklist',
        url: '',
      },
    ],
  };
}
