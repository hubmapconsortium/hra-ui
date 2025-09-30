import { Component, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { MenuOptionsType, TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { saveAs } from 'file-saver';

import { VersionSelectorComponent } from '../version-selector/version-selector.component';

/**
 * Component on metadata page containing version selector, download button, view app button and metadata table
 */
@Component({
  selector: 'hra-provenance-menu',
  imports: [
    HraCommonModule,
    MatIconModule,
    MatMenuModule,
    VersionSelectorComponent,
    ButtonsModule,
    TableComponent,
    PlainTooltipDirective,
  ],
  templateUrl: './provenance-menu.component.html',
  styleUrl: './provenance-menu.component.scss',
})
export class ProvenanceMenuComponent {
  /** Snackbar service for download notification */
  readonly snackbar = inject(SnackbarService);

  /** Row data for the metadata table */
  readonly rows = input.required<TableRow[]>();
  /** Column data for the metadata table */
  readonly columns = input.required<TableColumn[]>();
  /** Current data version */
  readonly version = input.required<string>();
  /** All available data versions */
  readonly availableVersions = input.required<string[]>();
  /** Options for distribution downloads */
  readonly downloadOptions = input.required<MenuOptionsType[]>();

  /** Emits on version change */
  readonly versionChange = output<string>();

  /**
   * Downloads a file from the url
   * @param url File url
   */
  download(url: string): void {
    saveAs(url, url.split('/').pop());
  }
}
