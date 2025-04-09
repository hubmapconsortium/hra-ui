import { ChangeDetectionStrategy, Component, inject, input, viewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { FileDownloadService } from '@hra-ui/common/fs';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

import { ViewerVariant } from '../data-viewer.component';
import { ViewerCardData } from '../types/data-viewer.schema';

/**
 * Menu to be used to download images and data in an individual viewer card
 */
@Component({
  selector: 'hra-card-menu',
  imports: [HraCommonModule, MatMenuModule, MatIconModule, ButtonsModule, MatDividerModule],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMenuComponent {
  /** File download service */
  private readonly downloader = inject(FileDownloadService);

  /** Reference to menu component */
  readonly menu = viewChild.required('menu', { read: MatMenu });

  /** Data viewer variant the card belongs to */
  readonly variant = input.required<ViewerVariant>();

  /** Viewer card data */
  readonly viewerCardData = input.required<ViewerCardData>();

  /** Downloads PNG and SVG files */
  downloadClick(url: string): void {
    this.downloader.download(url);
  }
}

// /** Interface that contains info for a item displayed in the data viewer */
// export interface ViewerCardData {
//   /** Name of the tissue */
//   name: string;
//   /** URL of the metadata of the tissue */
//   metadata: string;
//   /** URL of the AI file of the tissue */
//   ai?: string;
//   /** URL of the PNG file of the tissue */
//   png?: string;
//   /** URL of the SVG file of the tissue */
//   svg?: string;
//   /** URL of the Crosswalk CSV file of the tissue */
//   crosswalk?: string;
//   /** URL of the 3D object (for 3D organ viewer) */
//   threeDimImage?: string;
//   /** Alternate text for the tissue image */
//   alt?: string;
// }

// /** Interface containing info for an organ with tissue data */
// export interface OrganData {
//   /** Name of organ */
//   name: string;
//   /** Path to the organ icon */
//   icon: string;
//   /** Viewer item data for the organ */
//   viewerCardData: ViewerCardData[];
// }

// /** Interface representing version and organ data for an organ */
// export interface OrganVersionData {
//   /** Name of release to display */
//   releaseName: string;
//   /** Release date */
//   releaseDate: string;
//   /** Version of release */
//   version: string;
//   /** Link to download all Crosswalk data for the release */
//   crosswalk: string;
//   /** Organ data for the release */
//   organData: OrganData[];
//   /** URL for extraction site file downloads */
//   extractionCsvUrl?: string;
//   /** URL for reference organ file downloads */
//   referenceCsvUrl?: string;
// }
