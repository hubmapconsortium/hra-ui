import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/delete-file-button';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';

/**
 * Prediction Result
 */
export interface Prediction {
  /**
   * Tool
   */
  tool: string;
  /**
   * Modality
   */
  modality: string;
  /**
   * Cell Type ID in Cell Ontology
   */
  cell_id: string;
  /**
   * Cell Name in Cell Ontology
   */
  cell_label: string;
  /**
   * Count
   */
  count: number;
  /**
   * Percentage
   */
  percentage: number;
}

/**
 * Cell Population Predictions Result Page Component
 */
@Component({
  selector: 'hra-cell-population-predictions',
  standalone: true,
  imports: [CommonModule, WorkflowCardModule, MatIconModule, DeleteFileButtonComponent, MatTableModule, MatSortModule],
  templateUrl: './cell-population-predictions.component.html',
  styleUrl: './cell-population-predictions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPopulationPredictionsComponent {
  /**
   * Predictions
   */
  readonly predictions = input<Prediction[]>([]);

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
}
