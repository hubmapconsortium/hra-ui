import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/delete-file-button';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';

export interface Prediction {
  tool: string;
  modality: string;
  cell_id: string;
  cell_label: string;
  count: number;
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
  readonly predictions = input<Prediction[]>([]);

  private readonly sort = viewChild.required(MatSort);

  protected readonly dataSource = new MatTableDataSource<Prediction>([]);
  protected readonly displayedColumns: string[] = ['tool', 'modality', 'percentage', 'count', 'cell_label', 'cell_id'];

  constructor() {
    effect(() => {
      this.dataSource.data = this.predictions();
    });

    effect(() => {
      this.dataSource.sort = this.sort();
    });
  }
}
