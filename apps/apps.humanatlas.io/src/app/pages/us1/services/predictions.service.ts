import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import SAMPLE_DATA from './sample-data.json';

const SAMPLE_FILE = new File([JSON.stringify(SAMPLE_DATA)], 'sample.json', { type: 'application/json' });
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

export function resolvePredictions(): Observable<Prediction[]> {
  const service = inject(PredictionsService);
  return service.loadPredictions();
}

@Injectable({ providedIn: 'root' })
export class PredictionsService {
  private file = SAMPLE_FILE;

  private readonly endpoint = inject(PREDICTIONS_ENDPOINT);
  private readonly http = inject(HttpClient);

  setFile(file: File): void {
    this.file = file;
  }

  setSampleFile(): void {
    this.file = SAMPLE_FILE;
  }

  getFile(): File {
    return this.file;
  }

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

  loadSupportedReferenceOrgans(): Observable<string[]> {
    return this.http
      .get<SupportedOrgans[]>(`${this.endpoint}/supported-reference-organs`)
      .pipe(map((organs) => organs.map((organ) => organ.id)));
  }
}
