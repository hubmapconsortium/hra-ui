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
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';

/** Tooltip content */
const TOOLTIP_CONTENT = `Cell Population: Number of cells per cell type in a tissue block, anatomical structure,
or extraction site. Cell summaries are computed from cell type counts in experimental datasets, obtained either via
cell type annotations in the HRA Workflows Runner (for sc-transcriptomics datasets), or via expert/author-provided annotations (sc-proteomics datasets).`;

/**
 * Similar Dataset Table Component
 */
@Component({
  selector: 'hra-similar-datasets-table',
  imports: [
    CommonModule,
    WorkflowCardModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    ScrollingModule,
    TooltipCardComponent,
    TextHyperlinkDirective,
  ],
  templateUrl: './similar-datasets-table.component.html',
  styleUrl: './similar-datasets-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarDatasetsTableComponent {
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
    'cell_source_link',
  ];

  /** Column headers for table */
  protected readonly columnHeaders: { [key: string]: string } = {
    tool: 'Tool',
    modality: 'Modality',
    similarity: 'Similarity',
    cell_source_label: 'Dataset Label',
    cell_source: 'Dataset ID',
    cell_source_link: 'Dataset Link',
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
        (source) => source.cell_source_type === 'http://purl.org/ccf/Dataset',
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
    saveAs(fileToSave, 'similar-datasets.csv');
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
