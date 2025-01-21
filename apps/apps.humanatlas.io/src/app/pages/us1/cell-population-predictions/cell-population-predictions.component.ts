import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { MatIconModule } from '@angular/material/icon';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/delete-file-button';
import { MatTableModule } from '@angular/material/table';

export interface Prediction {
  tool: string;
  modality: string;
  cell_id: string;
  cell_label: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'hra-cell-population-predictions',
  standalone: true,
  imports: [CommonModule, WorkflowCardModule, MatIconModule, DeleteFileButtonComponent, MatTableModule],
  templateUrl: './cell-population-predictions.component.html',
  styleUrl: './cell-population-predictions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPopulationPredictionsComponent implements OnInit {
  predictions: Prediction[] = [];
  displayedColumns: string[] = ['tool', 'modality', 'percentage', 'count', 'cell_label', 'cell_id'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.predictions = this.route.snapshot.data['predictions'] || [];
  }
}
