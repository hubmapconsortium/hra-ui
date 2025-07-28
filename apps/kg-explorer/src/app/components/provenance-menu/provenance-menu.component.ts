import { Component, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MenuOptionsType, TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';

import { DownloadService } from '../../services/download.service';
import { VersionSelectorComponent } from '../version-selector/version-selector.component';

@Component({
  selector: 'hra-provenance-menu',
  imports: [MatIconModule, MatMenuModule, VersionSelectorComponent, ButtonsModule, TableComponent],
  templateUrl: './provenance-menu.component.html',
  styleUrl: './provenance-menu.component.scss',
})
export class ProvenanceMenuComponent {
  readonly download = inject(DownloadService);

  readonly rows = input.required<TableRow[]>();
  readonly columns = input.required<TableColumn[]>();
  readonly version = input.required<string>();
  readonly availableVersions = input.required<string[]>();
  readonly downloadOptions = input.required<MenuOptionsType[]>();
  readonly versionChange = output<string>();
}
