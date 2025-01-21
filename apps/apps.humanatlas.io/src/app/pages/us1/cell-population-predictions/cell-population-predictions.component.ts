import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-cell-population-predictions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell-population-predictions.component.html',
  styleUrl: './cell-population-predictions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPopulationPredictionsComponent {}
