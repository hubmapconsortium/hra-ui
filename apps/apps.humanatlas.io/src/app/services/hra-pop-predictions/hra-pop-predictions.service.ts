import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CellSummaryReport, CellSummaryRow, HraPopService } from '@hra-api/ng-client';
import { from, Observable, switchMap } from 'rxjs';

/** Interface for Cell Population Predictions page input */
export interface CellPopulationPredictionData {
  /** File */
  file: File;
}

/** Interface for Tissue Origin Predictions page input */
export interface TissuePredictionData {
  /** File */
  file: File;
  /** Organ */
  organ?: string;
  /** Tool */
  tool?: string;
  /** Prediction date */
  date?: Date;
}

/**
 * HRA POP shared predictions service
 */
@Injectable({
  providedIn: 'root',
})
export class HraPopPredictionsService {
  /** HRA POP Service */
  private readonly hraPop = inject(HraPopService);

  /**
   * Supported organs of hra pop predictions service
   */
  readonly supportedOrgans = rxResource({
    loader: () => this.hraPop.supportedOrgans(),
    defaultValue: [],
  });

  /**
   * Supported tools of hra pop predictions service
   */
  readonly supportedTools = rxResource({
    loader: () => this.hraPop.supportedTools(),
    defaultValue: [],
  });

  /**
   * Get cell population predictions data
   * @param data - Cell Population Predictions Page input data
   * @returns Observable of type CellSummaryRow array
   */
  getCellPopulationPredictions(data: CellPopulationPredictionData): Observable<CellSummaryRow[]> {
    return from(data.file.text()).pipe(
      switchMap((content) =>
        this.hraPop.ruiLocationCellSummary({
          spatialEntity: JSON.parse(content),
        }),
      ),
    );
  }

  /**
   * Get tissue predictions data
   * @param data Tissue Origin Predictions page input data
   * @returns Observable of type CellSummaryReport
   */
  getTissuePredictions(data: TissuePredictionData): Observable<CellSummaryReport> {
    const { file, organ, tool } = data;
    return from(file.text()).pipe(
      switchMap((content) =>
        this.hraPop.cellSummaryReport({
          cellSummaryReportRequest: {
            csvString: content,
            organ,
            tool,
          },
        }),
      ),
    );
  }
}
