import { ChangeDetectionStrategy, Component, effect, inject, input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { CellSummaryReport, SourceSimilarityRow } from '@hra-api/ng-client';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import saveAs from 'file-saver';

/** Tooltip content */
const TOOLTIP_CONTENT = `Cell Population: Number of cells per cell type in a tissue block, anatomical structure,
or extraction site. Cell summaries are computed from cell type counts in experimental datasets, obtained either via
cell type annotations in the HRA Workflows Runner (for sc-transcriptomics datasets), or via expert/author-provided annotations (sc-proteomics datasets).`;

/**
 * Similar Anatomical Structures Table Component
 */
@Component({
  selector: 'hra-similar-anatomical-structures-table',
  imports: [
    CommonModule,
    WorkflowCardModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    ScrollingModule,
    TooltipCardComponent,
  ],
  templateUrl: './similar-anatomical-structures-table.component.html',
  styleUrl: './similar-anatomical-structures-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarAnatomicalStructuresTableComponent {
  /** Predictions */
  readonly predictions = input.required<CellSummaryReport>();

  /** Data for Similar Anatomical Structures table */
  protected readonly dataSource = new MatTableDataSource<SourceSimilarityRow>([]);

  /** For sorting all columns */
  private readonly sort = viewChild.required(MatSort);

  /** Columns for table */
  protected readonly displayedColumns: string[] = [
    'tool',
    'modality',
    'similarity',
    'cell_source_label',
    'cell_source',
  ];

  /**
   * Column headers of similar anatomical structures table component
   */
  protected readonly columnHeaders: { [key: string]: string } = {
    tool: 'Tool',
    modality: 'Modality',
    similarity: 'Similarity',
    cell_source_label: 'Anatomical Structure Label',
    cell_source: 'Anatomical Structure ID',
  };

  /** Tooltip content */
  protected readonly tooltip: TooltipContent[] = [
    {
      description: TOOLTIP_CONTENT,
    },
  ];

  /** Snackbar service */
  protected readonly snackbar = inject(SnackbarService);

  /**
   * Constructor that initializes the component and sets up effects for predictions and sorting
   */
  constructor() {
    effect(() => {
      this.dataSource.data = this.predictions().sources.filter(
        (source) => source.cell_source_type === 'http://purl.org/ccf/AnatomicalStructure',
      );
    });

    effect(() => {
      this.dataSource.sort = this.sort();
    });
  }

  /** Triggered when clicked on download CSV button  */
  onDownloadCSVButtonClicked() {
    const csvString = this.convertToCSV();
    const fileToSave = new Blob([csvString], { type: 'text/csv' });
    saveAs(fileToSave, 'similar-anatomical-structures.csv');
    this.snackbar.open('File downloaded', '', false, 'start', { duration: 6000 });
  }

  /** Utility function to convert table data to CSV string */
  convertToCSV(): string {
    const fields = this.displayedColumns as (keyof SourceSimilarityRow)[];
    const headers = Object.values(this.columnHeaders).join(',') + '\n';
    const data = this.dataSource.data;
    const rows = data
      .map((row) =>
        fields
          .map((field) => {
            if (field === 'similarity') {
              return row.similarity.toFixed(2);
            }
            return row[field];
          })
          .join(','),
      )
      .join('\n');
    return headers + rows;
  }
}
