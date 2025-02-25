import { Component, Input, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { SheetDetails, VersionDetail } from '../../models/sheet.model';

@Component({
  selector: 'app-table-nested-menu',
  templateUrl: './table-nested-menu.component.html',
  styleUrls: ['./table-nested-menu.component.scss'],
})
export class TableNestedMenuComponent {
  @Input() sheetDetails: SheetDetails[] = [];
  @Input() title = '';
  window = window;
  @ViewChild('childMenu', { static: true }) public childMenu!: MatMenu;
  sheetURL = 'https://docs.google.com/spreadsheets/d/';

  openURL(version: VersionDetail) {
    const url = version.link || version.csvUrl || `${this.sheetURL}${version.sheetId}/edit#gid=${version.gid}`;
    this.window.open(url, '_blank');
  }
}
