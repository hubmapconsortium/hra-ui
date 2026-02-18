import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal, viewChild } from '@angular/core';
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
  styleUrl: './source-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.full-screen]': 'hideTitle()',
    '[class.no-data-full-screen]': 'hideTitle() && sources().length === 0',
  },
})
export class SourceListComponent {
  /** List of sources with titles and links displayed to the user */
  readonly sources = input<SourceListItem[]>([]);

  /** Text that appears in the empty biomarker message */
  readonly message = input<string>('');

  /** Whether to hide the title of the source list */
  readonly hideTitle = input<boolean>(false);

  /** Fullscreen service */
  private readonly fullscreenService = inject(FtuFullScreenService);

  /** Whether to show the biomarker table */
  readonly showTable = signal(true);

  /** Number of selected sources */
  readonly selectedCount = signal(0);

  /** Emits when source selection changed */
  readonly selectionChanged = output<SourceListItem[]>();

  /** Reference to the table component */
  readonly sourceTable = viewChild<TableComponent<TableRow>>('sourceTable');

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

  /** Initialize source list */
  constructor() {
    effect(() => {
      const sources = this.sources();
      const table = this.sourceTable();

      if (table && sources.length > 0) {
        table.selection.clear();
        table.selection.select(...sources);
        this.selectedCount.set(table.selection.selected.length);
        this.selectionChanged.emit(table.selection.selected as SourceListItem[]);
      }
    });
  }

  /** Opens the source list in fullscreen mode */
  openSourceListFullscreen(): void {
    this.fullscreenService.fullscreentabIndex.set(FullscreenTab.SourceList);
    this.fullscreenService.isFullscreen.set(true);
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
    const table = this.sourceTable();
    if (table) {
      this.selectedCount.set(table.selection.selected.length);
      this.selectionChanged.emit(table.selection.selected as SourceListItem[]);
    }
  }
}
