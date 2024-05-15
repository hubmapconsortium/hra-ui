import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay';

/**
 * Interface for metadata
 */
export interface Metadata {
  /** Title of the visualization */
  title: string;
  /** Name of the source file */
  sourceData: string;
  /** Name of the colormap file */
  colorMap: string;
  /** Name of the organ */
  organ: string;
  /** Technology */
  technology: string;
  /** Sex */
  sex: string;
  /** Age */
  age: number | string;
  /** Thickness */
  thickness: number | string;
  /** Pixel size */
  pixelSize: number | string;
  /** Creation date */
  creationDate: string;
  /** Creation time */
  creationTime: string;
}

/**
 * Metadata Component
 */
@Component({
  selector: 'cde-metadata',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatExpansionModule, OverlayModule],
  templateUrl: './metadata.component.html',
  styleUrl: './metadata.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataComponent {
  /** Flag to check if panel is open */
  panelOpen = true;
  /** Input for metadata */
  data = input.required<Metadata>();
  /** Flag to check if info tooltip is open */
  metadataInfoOpen = false;
  /** Tooltip overlay position */
  overlayPositions: ConnectionPositionPair[] = [
    {
      originX: 'end',
      overlayX: 'start',
      originY: 'top',
      overlayY: 'top',
    },
  ];
}
