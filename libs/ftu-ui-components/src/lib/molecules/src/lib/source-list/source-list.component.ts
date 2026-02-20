import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconButtonModule } from '@hra-ui/design-system/buttons/icon-button';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';
import { TableColumn, TableRow } from '@hra-ui/design-system/table';
import { SourceReference } from '@hra-ui/services';
import { EmptyBiomarkerComponent } from '../../../../atoms/src';
import {
  FtuFullScreenService,
  FullscreenTab,
} from '../../../../behavioral/src/lib/ftu-fullscreen-service/ftu-fullscreen.service';

/** SourceListItem interface contains title and link to the dataset for the SourceList*/
export interface SourceListItem extends TableRow {
  title: string;
  doi: string;
  year: number;
  datasetTitle: string;
  datasetId: string;
  cellType: string;
  healthStatus: string;
  sex: string;
  age: string;
  bmi: string;
  ethnicity: string;
}

/** This component shows list of sources with title and links to the datasets */
@Component({
  selector: 'ftu-source-list',
  imports: [
    ButtonsModule,
    HraCommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    IconButtonModule,
    EmptyBiomarkerComponent,
    MatCheckboxModule,
    ResultsIndicatorComponent,
  ],
  templateUrl: './source-list.component.html',
  styleUrl: './source-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.no-data-full-screen]': 'hideTitle() && sources.length === 0',
  },
})
export class SourceListComponent implements OnChanges {
  /** List of sources with titles and links displayed to the user */
  @Input() sources: SourceReference[] = [];

  datasource = new MatTableDataSource<SourceReference>([]);

  /** Text that appears in the empty biomarker message */
  @Input() message = '';

  /** Whether to hide the title of the source list */
  readonly hideTitle = input<boolean>(false);

  /** Fullscreen service */
  private readonly fullscreenService = inject(FtuFullScreenService);

  /** Whether to show the biomarker table */
  showTable = signal(true);

  /** Number of selected sources */
  selectedCount = signal(0);

  /** Emits when source selection changed */
  @Output() readonly selectionChanged = new EventEmitter<SourceReference[]>();

  numPublications = computed(() => this.sources.filter((source) => source.doi).length);

  readonly selection = new SelectionModel<TableRow>(true, []);

  /** Table columns configuration */
  readonly tableColumns: TableColumn[] = [
    {
      column: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      column: 'doi',
      label: 'DOI',
      type: {
        type: 'link',
        urlColumn: 'doi',
      },
    },
    {
      column: 'year',
      label: 'Year',
      type: 'text',
    },
    {
      column: 'datasetTitle',
      label: 'Title',
      type: 'text',
    },
    {
      column: 'datasetId',
      label: 'ID',
      type: {
        type: 'link',
        urlColumn: 'datasetId',
      },
    },
    {
      column: 'cellType',
      label: 'Cell Type',
      type: 'text',
    },
    {
      column: 'healthStatus',
      label: 'Health Status',
      type: 'text',
    },
    {
      column: 'sex',
      label: 'Sex',
      type: 'text',
    },
    {
      column: 'age',
      label: 'Age',
      type: 'text',
    },
    {
      column: 'bmi',
      label: 'BMI',
      type: 'text',
    },
    {
      column: 'ethnicity',
      label: 'Ethnicity',
      type: 'text',
    },
  ];

  protected readonly columnIds = computed(() => {
    const columns = this.tableColumns.map((col) => col.column);
    return ['select', ...columns];
  });

  /** Mat sort element */
  private readonly sort = viewChild(MatSort);

  /** Sort data on load and set columns */
  constructor() {
    effect(() => {
      this.datasource.sort = this.sort();
    });
  }

  /** Opens the source list in fullscreen mode */
  openSourceListFullscreen(): void {
    this.fullscreenService.fullscreentabIndex.set(FullscreenTab.SourceList);
    this.fullscreenService.isFullscreen.set(true);
  }

  /** On sources change, resets selection and selects all sources */
  ngOnChanges(changes: SimpleChanges) {
    if ('sources' in changes) {
      // Wait for the table to be initialized, then select all

      setTimeout(() => {
        if (this.sources.length > 0) {
          this.datasource.data = this.sources;
          this.selection.clear();
          this.selection.select(...this.sources);
          this.selectedCount.set(this.selection.selected.length);
          this.selectionChanged.emit(this.selection.selected as SourceReference[]);
        }
      });
    }
  }

  /**
   * It changes the value of showTable to false if value it true
   * and vice versa
   */
  toggleTable(): void {
    this.showTable.set(!this.showTable());
  }

  /**
   * Handle selection changes from the table
   */
  onSelectionChange(): void {
    this.selectedCount.set(this.selection.selected.length);
    this.selectionChanged.emit(this.selection.selected as SourceReference[]);
  }

  /**
   * Whether the number of selected elements matches the total number of rows.
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...(this.datasource.data as TableRow[]));
    }
    this.onSelectionChange();
  }

  /**
   * Toggle row selection
   */
  toggleRow(row: TableRow): void {
    this.selection.toggle(row);
    this.onSelectionChange();
  }
}
