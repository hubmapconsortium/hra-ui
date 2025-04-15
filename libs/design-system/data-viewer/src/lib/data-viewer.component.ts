import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { OrganLogoComponent, OrganLogoId } from '@hra-ui/design-system/brand/organ-logo';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';

import { ReleaseVersionData } from './types/data-viewer.schema';
import { ViewerCardComponent } from './viewer-card/viewer-card.component';
import { ViewerMenuComponent } from './viewer-menu/viewer-menu.component';

/**
 * Data viewer component
 */
@Component({
  selector: 'hra-data-viewer',
  imports: [
    HraCommonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    ButtonsModule,
    MatSelectModule,
    ExpansionPanelModule,
    ViewerCardComponent,
    ProductLogoComponent,
    OrganLogoComponent,
    FormsModule,
    ViewerMenuComponent,
  ],
  templateUrl: './data-viewer.component.html',
  styleUrl: './data-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DataViewerComponent {
  /** Release versions to include in the data viewer*/
  readonly organVersionData = input.required<ReleaseVersionData[]>();

  /** Data viewer variant */
  readonly variant = input.required({ transform: toProductLogoId });

  /** Link to the HRA Organ Icons GitHub repository */
  readonly githubIconsUrl = input.required<string>();

  /** Current selected release version */
  readonly currentVersion = linkedSignal(() => this.organVersionData()[0]);

  /** Current organ selected */
  readonly organ = linkedSignal(() => this.currentVersion().organData[0]);

  /** Icon for the currently selected organ */
  readonly organIconId = computed(() => this.organ().icon as OrganLogoId);

  /** Returns available organ options based on current version */
  readonly organOptions = computed(() => {
    const currentVersionData = this.organVersionData().find((data) => data.version === this.currentVersion().version);
    if (currentVersionData) {
      return currentVersionData.organData.map((organ) => organ);
    }
    return [];
  });

  /** Title to display on the data viewer */
  readonly viewerTitle = computed(() => {
    return this.variant() === 'ftu' ? 'Functional Tissue Units' : '3D Organs';
  });
}
