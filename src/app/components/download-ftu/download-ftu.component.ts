import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChooseVersion } from '../choose-version/choose-version'
import { FtuData, FtuVersionData } from './download-ftu';

@Component({
  selector: 'ccf-download-ftu',
  templateUrl: './download-ftu.component.html',
  styleUrls: ['./download-ftu.component.scss']
})
export class DownloadFtuComponent {
  @ViewChild(MatSort, {static: true})
  set sort(value: MatSort) {
    this.selectedData.sort = value;
  }

  @Input() set versions(versions: ChooseVersion[]) {
    this._versions = versions;
    this.updateSelection();
  }
  get versions(): ChooseVersion[] {
    return this._versions;
  }

  @Input() set data(data: FtuVersionData[]) {
    this._data = data;
    this.updateSelection();
  }
  get data(): FtuVersionData[] {
    return this._data;
  }

  selectedVersion?: ChooseVersion;
  readonly selectedData = new MatTableDataSource<FtuData>([]);

  private _versions: ChooseVersion[] = [];
  private _data: FtuVersionData[] = [];

  updateSelection(selectedVersion?: ChooseVersion): void {
    if (this.versions.length === 0 || this.data.length === 0) {
      return;
    }

    const { version } = this.selectedVersion = selectedVersion ?? this.versions[0];
    const data = this.data.find(item => `${item.version}` === `${version}`);
    this.selectedData.data = data?.rows ?? [];
  }
}