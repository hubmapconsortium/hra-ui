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
  ViewChild,
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
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { Iri, SourceReference } from '@hra-ui/services';
import { EmptyBiomarkerComponent } from '../../../../atoms/src';
import {
  FtuFullScreenService,
  FullscreenTab,
} from '../../../../behavioral/src/lib/ftu-fullscreen-service/ftu-fullscreen.service';

const TEST_SOURCES: SourceReference[] = [
  {
    title: 'Unlocking Functional Tissue Unit Potential with Novel Genes: Implications for Regenerative Medicine',
    link: 'https://doi.org/10.3390/ijms24032423' as Iri,
    year: 2025,
    datasetTitle: 'Dataset Title 1',
    datasetLink: 'https://doi.org/10.1016/j.jhep.2022.12.023' as Iri,
    cellType: 'Annotation tool label',
    healthStatus: 'Healthy',
    sex: 'Female',
    age: '36',
    bmi: '20-25',
    ethnicity: 'Ethnicity',
  },
  {
    title: 'Cellular Dynamics in Functional Tissue Units: A Multiscale Analysis of Tissue Organization and Function',
    link: 'https://doi.org/10.1016/j.jhep.2022.12.023' as Iri,
    year: 2025,
    datasetTitle: 'Dataset Title 2',
    datasetLink: 'https://doi.org/10.1016/j.jhep.2022.12.023' as Iri,
    cellType: 'Annotation tool label',
    healthStatus: 'Diseased',
    sex: 'Male',
    age: '52',
    bmi: '25-30',
    ethnicity: 'Ethnicity',
  },
  {
    title: 'Gene Expression Patterns in Healthy FTUs: A Comprehensive Analysis of Transcriptomic Signatures',
    link: 'https://doi.org/10.1002/advs.202205927' as Iri,
    year: 2025,
    datasetTitle: 'Dataset Title 3',
    datasetLink: 'https://doi.org/10.1016/j.jhep.2022.12.023' as Iri,
    cellType: 'Annotation tool label',
    healthStatus: 'Unknown',
    sex: 'Female',
    age: '24',
    bmi: '20-25',
    ethnicity: 'Ethnicity',
  },
  {
    title: 'Spatial Genomics of Functional Tissue Units: Mapping the Landscape of Gene Expression in Three Dimensions',
    link: 'https://doi.org/10.3389/fimmu.2023.1140795' as Iri,
    year: 2025,
    datasetTitle: 'Dataset Title 4',
    datasetLink: 'https://doi.org/10.1016/j.jhep.2022.12.023' as Iri,
    cellType: 'Annotation tool label',
    healthStatus: 'Unknown',
    sex: 'Male',
    age: '16',
    bmi: '30-35',
    ethnicity: 'Ethnicity',
  },
  {
    title:
      'Single-Cell Analysis of FTU Heterogeneity: Uncovering the Diversity of Cell Types and States within Tissues',
    link: 'https://doi.org/10.1007/s00429-023-02705-8' as Iri,
    year: 2025,
    datasetTitle: 'Dataset Title 5',
    datasetLink: 'https://doi.org/10.1016/j.jhep.2022.12.023' as Iri,
    cellType: 'Annotation tool label',
    healthStatus: 'Unknown',
    sex: 'Female',
    age: '48',
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

  /** Mat sort element */
  private readonly sort = viewChild.required(MatSort);

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
