import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SheetDetails, VersionDetail } from '../../models/sheet.model';

@Component({
  selector: 'app-table-nested-menu',
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule, ScrollingModule],
  templateUrl: './table-nested-menu.component.html',
  styleUrls: ['./table-nested-menu.component.scss'],
})
export class TableNestedMenuComponent {
  @Input() sheetDetails: SheetDetails[] = [];
  @Input() title = '';
  window = window;
  @ViewChild('childMenu', { static: true }) childMenu!: MatMenu;
  sheetURL = 'https://docs.google.com/spreadsheets/d/';

  openURL(version: VersionDetail) {
    const url = version.link || version.csvUrl || `${this.sheetURL}${version.sheetId}/edit#gid=${version.gid}`;
    this.window.open(url, '_blank');
  }
}
