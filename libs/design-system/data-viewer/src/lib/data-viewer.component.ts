import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { OrganLogoComponent, OrganLogoId } from '@hra-ui/design-system/brand/organ-logo';
import { ProductLogoComponent, ProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';

import { ViewerCardComponent } from './viewer-card/viewer-card.component';

/** Viewer variant types */
export type ViewerVariant = 'ftu' | '3d-organ';

/** Interface that contains info for a item displayed in the data viewer */
export interface ViewerCardData {
  /** Name of the tissue */
  name: string;
  /** URL of the metadata of the tissue */
  metadata: string;
  /** URL of the AI file of the tissue */
  ai?: string;
  /** URL of the PNG file of the tissue */
  png?: string;
  /** URL of the SVG file of the tissue */
  svg?: string;
  /** URL of the Crosswalk CSV file of the tissue */
  crosswalk?: string;
  /** URL of the 3D object (for 3D organ viewer) */
  threeDimImage?: string;
  /** Alternate text for the tissue image */
  alt?: string;
}

/** Interface containing info for an organ with tissue data */
export interface OrganData {
  /** Name of organ */
  name: string;
  /** Path to the organ icon */
  icon: string;
  /** Viewer item data for the organ */
  viewerCardData: ViewerCardData[];
}

/** Interface representing version and organ data for an organ */
export interface OrganVersionData {
  /** Name of release to display */
  releaseName: string;
  /** Release date */
  releaseDate: string;
  /** Version of release */
  version: string;
  /** Link to download all Crosswalk data for the release */
  crosswalk: string;
  /** Organ data for the release */
  organData: OrganData[];
  /** URL for extraction site file downloads */
  extractionCsvUrl?: string;
  /** URL for reference organ file downloads */
  referenceCsvUrl?: string;
}

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
  ],
  templateUrl: './data-viewer.component.html',
  styleUrl: './data-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DataViewerComponent {
  /** Release versions to include in the data viewer*/
  readonly organVersionData = input.required<OrganVersionData[]>();

  /** Data viewer variant */
  readonly variant = input.required<ViewerVariant>();

  /** Link to the HRA Organ Icons GitHub repository */
  readonly githubIconsUrl = input.required<string>();

  /** Current selected release version */
  readonly currentVersion = linkedSignal(() => this.organVersionData()[0]);

  /** Current organ selected */
  readonly organ = linkedSignal(() => this.currentVersion().organData[0]);

  /** Icon for the data viewer variant */
  readonly variantIconId = computed(() => this.variant() as ProductLogoId);

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
