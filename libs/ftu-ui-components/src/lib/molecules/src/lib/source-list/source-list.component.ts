import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconButtonModule } from '@hra-ui/design-system/buttons/icon-button';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { Iri, SourceReference } from '@hra-ui/services';
import { EmptyBiomarkerComponent } from '../../../../atoms/src';
import {
  FtuFullScreenService,
  FullscreenTab,
} from '../../../../behavioral/src/lib/ftu-fullscreen-service/ftu-fullscreen.service';

const TEST_SOURCES: SourceReference[] = [
  {
    title:
      'Single cell transcriptional and chromatin accessibility profiling redefine cellular heterogeneity in the adult human kidney',
    link: 'https://doi.org/10.1038/s41467-021-22368-w#CellSummary_kidney-nephron' as Iri,
    year: 2021,
    datasetTitle: 'snRNA-seq of Three Healthy Human Kidney Tissue',
    datasetLink: 'https://doi.org/10.1038/s41467-021-22368-w' as Iri,
    cellType: 'Cell type text',
    healthStatus: 'Healthy',
    sex: 'Male',
    age: '30',
    bmi: '20-25',
    ethnicity: 'Ethnicity',
  },
  {
    title: 'Single-cell transcriptomics of the human kidney reveals the cellular identity of renal tumors',
    link: 'https://doi.org/10.1016/j.ccell.2022.01.010#CellSummary_kidney-tumor' as Iri,
    year: 2022,
    datasetTitle: 'scRNA-seq of Healthy and Tumor Kidney Tissue',
    datasetLink: 'https://doi.org/10.1016/j.ccell.2022.01.010' as Iri,
    cellType: 'Cell type text',
    healthStatus: 'Tumor',
    sex: 'Female',
    age: '50',
    bmi: '25-30',
    ethnicity: 'Ethnicity',
  },
  {
    title: 'Single-cell transcriptomics of the human kidney reveals the cellular identity of renal tumors',
    link: 'https://doi.org/10.1016/j.ccell.2022.01.010#CellSummary_kidney-tumor' as Iri,
    year: 2022,
    datasetTitle: 'scRNA-seq of Healthy and Tumor Kidney Tissue',
    datasetLink: 'https://doi.org/10.1016/j.ccell.2022.01.010' as Iri,
    cellType: 'Cell type text',
    healthStatus: 'Tumor',
    sex: 'Male',
    age: '40',
    bmi: '20-25',
    ethnicity: 'Ethnicity',
  },
  {
    title: 'Single-cell transcriptomics of the human kidney reveals the cellular identity of renal tumors',
    link: 'https://doi.org/10.1016/j.ccell.2022.01.010#CellSummary_kidney-tumor' as Iri,
    year: 2022,
    datasetTitle: 'scRNA-seq of Healthy and Tumor Kidney Tissue',
    datasetLink: 'https://doi.org/10.1016/j.ccell.2022.01.010' as Iri,
    cellType: 'Cell type text',
    healthStatus: 'Tumor',
    sex: 'Female',
    age: '60',
    bmi: '30-35',
    ethnicity: 'Ethnicity',
  },
  {
    title: 'Single-cell transcriptomics of the human kidney reveals the cellular identity of renal tumors',
    link: 'https://doi.org/10.1016/j.ccell.2022.01.010#CellSummary_kidney-tumor' as Iri,
    year: 2022,
    datasetTitle: 'scRNA-seq of Healthy and Tumor Kidney Tissue',
    datasetLink: 'https://doi.org/10.1016/j.ccell.2022.01.010' as Iri,
    cellType: 'Cell type text',
    healthStatus: 'Tumor',
    sex: 'Male',
    age: '70',
    bmi: '25-30',
    ethnicity: 'Ethnicity',
  },
];

/** SourceListItem interface contains title and link to the dataset for the SourceList*/
export interface SourceListItem extends TableRow {
  title: string;
  link: string;
  year: number;
  datasetTitle: string;
  datasetLink: Iri;
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
    '[class.full-screen]': 'hideTitle()',
    '[class.no-data-full-screen]': 'hideTitle() && sources.length === 0',
  },
})
export class SourceListComponent implements OnChanges {
  /** List of sources with titles and links displayed to the user */
  @Input() sources: SourceReference[] = TEST_SOURCES;

  datasource = new MatTableDataSource<SourceReference>(TEST_SOURCES);

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

  /** Reference to the table component */
  @ViewChild('sourceTable') sourceTable!: TableComponent<TableRow>;

  /** Table columns configuration */
  readonly tableColumns: TableColumn[] = [
    {
      column: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      column: 'link',
      label: 'DOI',
      type: {
        type: 'link',
        urlColumn: 'link',
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
      column: 'datasetLink',
      label: 'ID',
      type: {
        type: 'link',
        urlColumn: 'datasetLink',
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
        if (this.sourceTable && this.sources.length > 0) {
          this.sourceTable.selection.clear();
          this.sourceTable.selection.select(...this.sources);
          this.selectedCount.set(this.sourceTable.selection.selected.length);
          this.selectionChanged.emit(this.sourceTable.selection.selected as SourceReference[]);
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
    if (this.sourceTable) {
      this.selectedCount.set(this.sourceTable.selection.selected.length);
      this.selectionChanged.emit(this.sourceTable.selection.selected as SourceReference[]);
    }
  }
}
