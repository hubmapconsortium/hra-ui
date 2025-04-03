import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { firstValueFrom, from, Observable, of, switchMap } from 'rxjs';
import { CellSummaryRow, HraPopService, IdLabelPair } from '@hra-api/ng-client';

/** Sample JSON file URL  */
export const SAMPLE_FILE_URL = 'assets/sample-data/cell-population-sample.json';

/** Injection token for cell population predictions API endpoint  */
export const PREDICTIONS_ENDPOINT = new InjectionToken<string>('Cell Predictions Endpoint', {
  providedIn: 'root',
  factory: () => 'https://apps.humanatlas.io/api/hra-pop',
});

/**
 * Predictions resolver
 * @returns Predictions array observable
 */
export function resolvePredictions(): Observable<CellSummaryRow[]> {
  return inject(PredictionsService).loadPredictions();
}

/**
 * Predictions Service
 */
@Injectable({ providedIn: 'root' })
export class PredictionsService {
  /** HRA POP Service */
  private readonly hraPopService = inject(HraPopService);

  /** JSON file */
  private file: File | null = null;

  /** Sample JSON file */
  private sampleFile?: File = undefined;

  /** Predictions API ednpoint */
  private readonly endpoint = inject(PREDICTIONS_ENDPOINT);

  /** http client to make http requests */
  private readonly http = inject(HttpClient);

  /** Updates current file with a new file */
  setFile(file: File): void {
    this.file = file;
  }

  /** Sets current file to the Sample file */
  async setSampleFile(): Promise<void> {
    this.sampleFile ??= await this.loadSampleFile();
    this.setFile(this.sampleFile);
  }

  /**
   * Returns current file
   * @returns File
   */
  getFile(): File | null {
    return this.file;
  }

  /**
   * Gets predictions for the current file
   * @returns Predictions array observable
   */
  loadPredictions(): Observable<CellSummaryRow[]> {
    if (this.file === null) {
      return of([]);
    }

    return from(this.file.text()).pipe(
      switchMap((data) => this.hraPopService.ruiLocationCellSummary({ spatialEntity: JSON.parse(data) })),
    );
  }

  /**
   * Loads sample JSON file
   * @returns File promise
   */
  async loadSampleFile(): Promise<File> {
    const content$ = this.http.get(SAMPLE_FILE_URL, { responseType: 'text' });
    const content = await firstValueFrom(content$);
    return new File([content], 'sample.json', { type: 'application/json' });
  }

  /**
   * Gets supported organs
   * @returns String array observable
   */
  loadSupportedReferenceOrgans(): Observable<IdLabelPair[]> {
    return this.hraPopService.supportedReferenceOrgans();
  }
}
