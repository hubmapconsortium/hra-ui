import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { MatIconModule } from '@angular/material/icon';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/delete-file-button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
export class CellPopulationPredictionsComponent implements OnInit, AfterViewInit {
  datasource = new MatTableDataSource<Prediction>([]);
  displayedColumns: string[] = ['tool', 'modality', 'percentage', 'count', 'cell_label', 'cell_id'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const predictions: Prediction[] = this.route.snapshot.data['predictions'] || [];
    this.datasource.data = predictions;
  }

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
  }
}
