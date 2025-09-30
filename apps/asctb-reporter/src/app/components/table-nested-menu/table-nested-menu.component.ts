import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SheetDetails, VersionDetail } from '../../models/sheet.model';

@Component({
  selector: 'app-table-nested-menu',
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule, ScrollingModule, HraCommonModule],
  templateUrl: './table-nested-menu.component.html',
  styleUrls: ['./table-nested-menu.component.scss'],
})
export class TableNestedMenuComponent {
  @Input() sheetDetails: SheetDetails[] = [];
  @ViewChild('childMenu', { static: true }) childMenu!: MatMenu;
  sheetURL = 'https://docs.google.com/spreadsheets/d/';

  getUrl(version: VersionDetail): string {
    const { sheetURL } = this;
    const { link, csvUrl, sheetId, gid } = version;
    return link || csvUrl || `${sheetURL}${sheetId}/edit#gid=${gid}`;
  }
}
