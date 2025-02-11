import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import SAMPLE_DATA from './sample-data.json';

/** Tissue extraction sample JSON file  */
const SAMPLE_FILE = new File([JSON.stringify(SAMPLE_DATA)], 'sample.json', { type: 'application/json' });

/** Injection token for predictions API endpoint  */
export const PREDICTIONS_ENDPOINT = new InjectionToken<string>('Cell Predictions Endpoint', {
  providedIn: 'root',
  factory: () => 'https://apps.humanatlas.io/api/hra-pop',
});

/**
 * Prediction Result
 */
export interface Prediction {
  /** Tool */
  tool: string;
  /** Modality */
  modality: string;
  /** Cell Type ID in Cell Ontology */
  cell_id: string;
  /** Cell Name in Cell Ontology */
  cell_label: string;
  /** Count */
  count: number;
  /** Percentage */
  percentage: number;
}

/**
 * Supported Organs Data
 */
export interface SupportedOrgans {
  /** ID with URL */
  id: string;
  /** Label */
  label: string;
}

/**
 * Predictions resolver
 * @returns Predictions array observable
 */
export function resolvePredictions(): Observable<Prediction[]> {
  return inject(PredictionsService).loadPredictions();
}

/**
 * Predictions Service
 */
@Injectable({ providedIn: 'root' })
export class PredictionsService {
  /** Sample JSON file */
  private file = SAMPLE_FILE;
  /** Predictions API ednpoint */
  private readonly endpoint = inject(PREDICTIONS_ENDPOINT);
  /** http client to make http requests */
  private readonly http = inject(HttpClient);

  /** Updates current file with a new file */
  setFile(file: File): void {
    this.file = file;
  }

  /** Sets current file to the Sample file */
  setSampleFile(): void {
    this.file = SAMPLE_FILE;
  }

  /**
   * Returns current file
   * @returns File
   */
  getFile(): File {
    return this.file;
  }

  /**
   * Gets predictions for the current file
   * @returns Predictions array observable
   */
  loadPredictions(): Observable<Prediction[]> {
    return from(this.file.text()).pipe(
      switchMap((data) =>
        this.http.post<Prediction[]>(`${this.endpoint}/rui-location-cell-summary`, JSON.parse(data), {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'json',
        }),
      ),
    );
  }

  /**
   * Gets supported organs
   * @returns String array observable
   */
  loadSupportedReferenceOrgans(): Observable<string[]> {
    return this.http
      .get<SupportedOrgans[]>(`${this.endpoint}/supported-reference-organs`)
      .pipe(map((organs) => organs.map((organ) => organ.id)));
  }
}
