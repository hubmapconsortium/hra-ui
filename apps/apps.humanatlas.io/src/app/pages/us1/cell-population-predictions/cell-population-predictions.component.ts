import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, HostListener, inject, input, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/buttons/delete-file-button';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { Prediction, PredictionsService } from '../services/predictions.service';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';

/** Tooltip Content */
const TOOLTIP_CONTENT = `Cell Population: Number of cells per cell type in a tissue block, anatomical structure, or extraction site. Cell
summaries are computed from cell type counts in experimental datasets, obtained either via cell type annotations in
the HRA Workflows Runner (for sc-transcriptomics datasets), or via expert/author-provided annotations(sc-proteomics datasets)`;

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
  ],
  templateUrl: './cell-population-predictions.component.html',
  styleUrl: './cell-population-predictions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPopulationPredictionsComponent {
  /**
   * Predictions
   */
  protected readonly predictions = input<Prediction[]>([]);

  /** Router service */
  private readonly router = inject(Router);

  /** State for accessing the file */
  protected readonly predictionService = inject(PredictionsService);

  /**
   * For sorting Tools column
   */
  private readonly sort = viewChild.required(MatSort);

  /**
   * Data for predictions table
   */
  protected readonly dataSource = new MatTableDataSource<Prediction>([]);

  /**
   * Columns for prediction table
   */
  protected readonly displayedColumns: string[] = ['tool', 'modality', 'percentage', 'count', 'cell_label', 'cell_id'];

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

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = true; // For older verions
  }

  onDeleteButtonClick(): void {
    const confirmation = window.confirm('Changes you made might not be saved. Do you really want to leave?');
    if (confirmation) {
      this.router.navigate(['/us1']);
    }
  }
}
