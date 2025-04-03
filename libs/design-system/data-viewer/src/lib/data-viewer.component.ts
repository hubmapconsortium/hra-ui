import { ChangeDetectionStrategy, Component, computed, effect, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { ProductLogoComponent } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';

import { ViewerCardComponent } from './viewer-card/viewer-card.component';

/** Viewer variant types */
export type ViewerVariant = 'ftu' | '3d_organ_model';

export interface TissueData {
  name: string;
  metadataUrl: string;
  ai: string;
  png: string;
  svg: string;
  csv: string;
}

export interface OrganData {
  name: string;
  image: string;
  tissueData: TissueData[];
}

export interface OrganVersionData {
  releaseName: string;
  releaseDate: string;
  version: string;
  crosswalk: string;
  organData: OrganData[];
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
    FormsModule,
  ],
  templateUrl: './data-viewer.component.html',
  styleUrl: './data-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DataViewerComponent implements OnInit {
  readonly organVersionData = input.required<OrganVersionData[]>();

  /** Data viewer variant */
  readonly variant = input.required<ViewerVariant>();

  readonly allFtuCsvUrl = input.required<string>();

  readonly githubIconsUrl = input.required<string>();

  readonly currentVersion = signal<OrganVersionData>({
    releaseName: '',
    releaseDate: '',
    version: '',
    crosswalk: '',
    organData: [],
  });

  readonly organ = signal<OrganData>({
    name: '',
    image: '',
    tissueData: [],
  });

  readonly icon = computed(() => this.organ().image);

  readonly organOptions = computed(() => {
    const currentVersionData = this.organVersionData().find((data) => data.version === this.currentVersion().version);
    if (currentVersionData) {
      return currentVersionData.organData.map((organ) => organ);
    }
    return [];
  });

  constructor() {
    effect(() => {
      this.organ.set(this.currentVersion().organData[0]);
    });
  }

  ngOnInit(): void {
    this.currentVersion.set(this.organVersionData()[0]);
  }
}
