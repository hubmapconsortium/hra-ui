import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { Sources, TissueOriginPredictions } from '../services/tissue-origin.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

/**
 * Tissue Origin Predictions result page
 */
@Component({
  selector: 'hra-tissue-origin-predictions',
  standalone: true,
  imports: [CommonModule, WorkflowCardModule, MatIconModule, MatTableModule, MatSortModule],
  templateUrl: './tissue-origin-predictions.component.html',
  styleUrl: './tissue-origin-predictions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueOriginPredictionsComponent {
  /** Predictions */
  readonly predictions = input<TissueOriginPredictions>({ sources: [] });

  /** Data for Anatomical Structures table */
  protected readonly anatomicalDataSource = new MatTableDataSource<Sources>([]);

  /** Data for Datasets table */
  protected readonly datasetDataSource = new MatTableDataSource<Sources>([]);

  /** Sorting on Anatomical Structures table */
  protected readonly sortOnAnatomicalData = viewChild.required<MatSort>('sort1');

  /** Sorting on Datasets table */
  protected readonly sortOnDatasetsData = viewChild.required<MatSort>('sort2');

  /** Columns for anatomical structures table */
  protected readonly anatomicalColumns = ['tool', 'modality', 'similarity', 'cell_source_label', 'cell_source'];

  /** Columns for datasets table */
  protected readonly datasetsColumns = [
    'tool',
    'modality',
    'similarity',
    'cell_source_label',
    'cell_source',
    'cell_source_link',
  ];

  /**
   * Constructor that initializes the component and sets up effects for predictions and sorting
   */
  constructor() {
    effect(() => {
      this.anatomicalDataSource.data = this.predictions().sources.filter(
        (source) => source.cell_source_type === 'http://purl.org/ccf/AnatomicalStructure',
      );
      this.datasetDataSource.data = this.predictions().sources.filter(
        (source) => source.cell_source_type === 'http://purl.org/ccf/Dataset',
      );
    });

    effect(() => {
      this.anatomicalDataSource.sort = this.sortOnAnatomicalData();
      this.datasetDataSource.sort = this.sortOnDatasetsData();
    });
  }
}
