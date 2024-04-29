import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

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
  age: number;
  /** Thickness */
  thickness: number;
  /** Pixel size */
  pixelSize: number;
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
  imports: [CommonModule, MatButtonModule, MatIconModule, MatExpansionModule],
  templateUrl: './metadata.component.html',
  styleUrl: './metadata.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataComponent {
  /** Flag to check if panel is open */
  panelOpen = false;
  /** Input for metadata */
  data = input.required<Metadata>();
}
