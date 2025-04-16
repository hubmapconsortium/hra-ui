import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CellSummaryRow } from '@hra-api/ng-client';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/buttons/delete-file-button';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import { TissuePredictionData } from '../../../services/hra-pop-predictions/hra-pop-predictions.service';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

/** Tooltip Content */
const TOOLTIP_CONTENT = `Cell Population: Number of cells per cell type in a tissue block, anatomical structure, or extraction site. Cell
summaries are computed from cell type counts in experimental datasets, obtained either via cell type annotations in
the HRA Workflows Runner (for sc-transcriptomics datasets), or via expert/author-provided annotations(sc-proteomics datasets)`;

/** Empty Inputs for Predictions page */
const EMPTY_DATA: TissuePredictionData = {
  file: new File([], ''),
};

/**
 * Cell Population Predictions Result Page Component
 */
@Component({
  selector: 'hra-cell-population-predictions',
  standalone: true,
  imports: [
    CommonModule,
    WorkflowCardModule,
    MatIconModule,
    DeleteFileButtonComponent,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    OverlayModule,
    TooltipCardComponent,
    ScrollingModule,
  ],
  templateUrl: './cell-population-predictions.component.html',
  styleUrl: './cell-population-predictions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:beforeunload)': 'handleBeforeUnload($event)',
  },
})
export class CellPopulationPredictionsComponent {
  /** Predictions data */
  readonly predictions = input<CellSummaryRow[]>([]);

  /** Input data for predictions page */
  readonly data = input<TissuePredictionData>(EMPTY_DATA);

  /** Router service */
  private readonly router = inject(Router);

  /** Snackbar service */
  private readonly snackbar = inject(SnackbarService);

  /** For sorting Tools column */
  private readonly sort = viewChild.required(MatSort);

  /** Data for predictions table */
  protected readonly dataSource = new MatTableDataSource<CellSummaryRow>([]);

  /** Column headers for prediction table */
  private readonly columnHeaders: { [key: string]: string } = {
    tool: 'Tool',
    modality: 'Modality',
    percentage: '% Of Total',
    count: '# Count',
    cell_label: 'Cell Name in Cell Ontology (CL)',
    cell_id: 'Cell Type ID in Cell Ontology (CL)',
  };

  /** Columns for prediction table */
  protected readonly displayedColumns: string[] = Object.keys(this.columnHeaders);

  /** Tooltip content */
  protected readonly tooltip: TooltipContent[] = [
    {
      description: TOOLTIP_CONTENT,
    },
  ];

  /**
   * Constructor that initializes the component and sets up effects for predictions and sorting
   */
  constructor() {
    effect(() => {
      this.dataSource.data = this.predictions();
    });

    effect(() => {
      this.dataSource.sort = this.sort();
    });
  }

  /** Triggered when users tries to close or reload the page */
  handleBeforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = true; // For older verions
  }

  /** Triggered when users clicks delete icon on file */
  onDeleteButtonClick(): void {
    const confirmation = window.confirm('Changes you made might not be saved. Do you really want to leave?');
    if (confirmation) {
      this.router.navigate(['/us1']);
    }
  }

  /** Triggered when clicked on download CSV button  */
  onDownloadCSVButtonClicked() {
    const csvData = unparse(this.predictions(), { columns: this.displayedColumns });
    const fileToSave = new Blob([csvData], { type: 'text/csv' });
    saveAs(fileToSave, 'predictions.csv');
    this.snackbar.open('File downloaded', '', false, 'start', { duration: 6000 });
  }
}
