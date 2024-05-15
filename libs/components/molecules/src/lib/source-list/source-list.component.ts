import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HoverDirective } from '@hra-ui/cdk';
import { EmptyBiomarkerComponent, LabelBoxComponent } from '@hra-ui/components/atoms';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/** SourceListItem interface contains title and link to the dataset for the SourceList*/
export interface SourceListItem {
  /** List of authors for the source */
  authors: string[];
  /** Year dataset was released */
  year: number;
  /** Title of the dataset in the SourceList */
  title: string;
  /** DOI of dataset */
  doi: string;
  /** Label of the dataset in the SourceList */
  label: string;
  /** Link to the dataset in the SourceList */
  link: string;
}

/** This component shows list of sources with title and links to the datasets */
@Component({
  selector: 'hra-source-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    LabelBoxComponent,
    EmptyBiomarkerComponent,
    MatCheckboxModule,
    HoverDirective,
  ],
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceListComponent<T extends SourceListItem> implements OnChanges {
  /** List of sources with titles and links displayed to the user */
  @Input() sources: T[] = [];

  /** Text that appears in the empty biomarker collaborate button */
  @Input() collaborateText = '';

  /** Text that appears in the empty biomarker message */
  @Input() message = '';

  /** Whether to show the biomarker table */
  showTable = true;

  /** Current source selection */
  selection = new SelectionModel<T>(true, []);

  /** Data source for table */
  dataSource = new MatTableDataSource<T>();

  /** Columns to display in the sources list */
  displayedColumns: string[] = ['select', 'authors', 'year', 'title', 'doi', 'link'];

  /** Emits when the contact button is clicked */
  @Output() readonly collaborateClick = new EventEmitter<void>();

  /** Emits when source selection changed */
  @Output() readonly selectionChanged = new EventEmitter<T[]>();

  /** Sorter for sources list */
  @ViewChild(MatSort) set sort(sorter: MatSort) {
    this.dataSource.sort = sorter || null;
  }

  /** Google analytics tracking service */
  private readonly ga = inject(GoogleAnalyticsService);

  /** On sources change, resets selection and selects all sources */
  ngOnChanges(changes: SimpleChanges) {
    if ('sources' in changes) {
      this.selection.clear();
      this.dataSource.data = this.sources;
      this.toggleAllRows();
    }
  }

  /**
   * It changes the value of showTable to false if value it true
   * and vice versa
   */
  toggleTable(): void {
    this.showTable = !this.showTable;
    this.ga.event('source_table_toggle', this.showTable.toString());
  }

  /**
   * Logs source link click
   * @param item Source list item
   */
  sourceLinkClicked(item: SourceListItem): void {
    this.ga.event('source_link_clicked', 'link_click', item.link);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectionChanged.emit(this.selection.selected);
      return;
    }

    this.dataSource.data.forEach((row) => this.selection.select(row));
    this.selectionChanged.emit(this.selection.selected);
  }

  /** Toggles selection status of a row */
  toggleRow(row: T) {
    this.selection.toggle(row);
    this.selectionChanged.emit(this.selection.selected);
  }
}
