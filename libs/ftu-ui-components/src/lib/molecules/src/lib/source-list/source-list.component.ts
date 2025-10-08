import {
  ChangeDetectionStrategy,
  Component,
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
import { MatTableModule } from '@angular/material/table';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconButtonModule } from '@hra-ui/design-system/buttons/icon-button';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';
import { Iri } from '@hra-ui/services';
import { EmptyBiomarkerComponent } from '../../../../atoms/src';
import {
  FtuFullScreenService,
  FullscreenTab,
} from '../../../../behavioral/src/lib/ftu-fullscreen-service/ftu-fullscreen.service';

/** SourceListItem interface contains title and link to the dataset for the SourceList*/
export interface SourceListItem extends TableRow {
  /** Unique identifier for the source */
  id: Iri;
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
    TableComponent,
    ResultsIndicatorComponent,
  ],
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.full-screen]': 'hideTitle()',
    '[class.no-data-full-screen]': 'hideTitle() && sources.length === 0',
  },
})
export class SourceListComponent implements OnChanges {
  /** List of sources with titles and links displayed to the user */
  @Input() sources: SourceListItem[] = [];

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
  @Output() readonly selectionChanged = new EventEmitter<SourceListItem[]>();

  /** Reference to the table component */
  @ViewChild('sourceTable') sourceTable!: TableComponent<TableRow>;

  /** Table columns configuration */
  readonly tableColumns: TableColumn[] = [
    {
      column: 'authors',
      label: 'Authors',
      type: 'text',
    },
    {
      column: 'year',
      label: 'Year',
      type: 'text',
    },
    {
      column: 'title',
      label: 'Paper Title',
      type: 'text',
    },
    {
      column: 'link',
      label: 'Paper DOI',
      type: {
        type: 'link',
        urlColumn: 'link',
      },
    },
  ];

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
          this.selectionChanged.emit(this.sourceTable.selection.selected as SourceListItem[]);
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
      this.selectionChanged.emit(this.sourceTable.selection.selected as SourceListItem[]);
    }
  }
}
