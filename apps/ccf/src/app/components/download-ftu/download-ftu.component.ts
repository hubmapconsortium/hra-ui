import { Component, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChooseVersion } from '../choose-version/choose-version';
import { FtuData, FtuVersionData } from './download-ftu';

/** Displays a table of FTU illustrations */
@Component({
  selector: 'ccf-download-ftu',
  templateUrl: './download-ftu.component.html',
  styleUrls: ['./download-ftu.component.scss'],
})
export class DownloadFtuComponent {
  /** Sorts the current selected data */
  @ViewChild(MatSort, { static: true })
  set sort(value: MatSort) {
    this.selectedData.sort = value;
  }

  /** Sets the version and updates selection */
  @Input() set versions(versions: ChooseVersion[]) {
    this._versions = versions;
    this.updateSelection();
  }

  /** Gets the version data */
  get versions(): ChooseVersion[] {
    return this._versions;
  }

  /** Sets the ftu version data and updates selection */
  @Input() set data(data: FtuVersionData[]) {
    this._data = data;
    this.updateSelection();
  }

  /** Gets the Ftu version data */
  get data(): FtuVersionData[] {
    return this._data;
  }

  /** Labels of the columns to be displayed */
  @Input() columnLabels = {
    type: 'Type',
    download: 'Download',
    releaseVersion: 'Release Version',
    digitalObjectType: 'Digital Object Type',
  };

  /** Icon name for the icon to be displayed on download column */
  @Input() downloadIcon: string;

  /** Flag to show/hide releaseVersion and digitalObjectType column */
  @Input() displayMetadata: boolean = false;

  /** Gets the column definitions of columns to be displayed */
  get displayedColumns(): string[] {
    return ['label', 'links'].concat(
      this.displayMetadata ? ['releaseVersion', 'digitalObjectType'] : []
    );
  }

  /** Current selected version */
  selectedVersion?: ChooseVersion;

  /** Current selected data to display in the table */
  readonly selectedData = new MatTableDataSource<FtuData>([]);

  /** Stores version data */
  private _versions: ChooseVersion[] = [];

  /** Stores ftu version data */
  private _data: FtuVersionData[] = [];

  /** Sets the table data according to the selected version */
  updateSelection(selectedVersion?: ChooseVersion): void {
    if (this.versions.length === 0 || this.data.length === 0) {
      return;
    }

    const { version } = (this.selectedVersion =
      selectedVersion ?? this.versions[0]);
    const data = this.data.find((item) => `${item.version}` === `${version}`);
    this.selectedData.data = data?.rows ?? [];
  }
}
