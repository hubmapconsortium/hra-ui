import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { firstValueFrom, from, Observable, of, switchMap } from 'rxjs';

/** Sample CSV file URL */
const SAMPLE_FILE_URL = 'assets/sample-data/tissue-origin-sample.csv';

/** Injection token for tissue origin predictions API endpoint  */
export const TISSUE_ORIGIN_ENDPOINT = new InjectionToken<string>('Tissue Origin Endpoint', {
  providedIn: 'root',
  factory: () => 'https://apps.humanatlas.io/api/hra-pop',
});

/**
 * Supported Tools Data
 */
export interface SupportedTools {
  /** ID with URL */
  id: string;
  /** Label */
  label: string;
}

/**
 * Injectable
 */
@Injectable({ providedIn: 'root' })
export class TissueOriginService {
  /** CSV file */
  private file: File | null = null;

  /** Sample CSV file */
  private sampleFile?: File = undefined;

  /** Prediction API endpoint */
  private readonly endpoint = inject(TISSUE_ORIGIN_ENDPOINT);

  /** http client to make http requests */
  private readonly http = inject(HttpClient);

  /** Updates current file with a new file  */
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

  // TODO: add return type for this function
  /**
   * Gets Predictions for the current csv file
   * @returns Predictions array observable
   */
  loadTissuePredictions(selectedOrganIri: string, selectedToolIri: string) {
    if (this.file === null) {
      return of({});
    }

    return from(this.file.text()).pipe(
      switchMap((data) =>
        this.http.post(
          `${this.endpoint}/cell-summary-report`,
          {
            tool: selectedToolIri,
            organ: selectedOrganIri,
            csvString: data,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            responseType: 'json',
          },
        ),
      ),
    );
  }

  /**
   * Loads CSV sample file
   * @returns File promise
   */
  async loadSampleFile(): Promise<File> {
    const content$ = this.http.get(SAMPLE_FILE_URL, {
      responseType: 'text',
    });
    const content = await firstValueFrom(content$);
    return new File([content], 'sample.csv', { type: 'text/csv' });
  }

  /**
   * Gets supported tools
   * @returns String array observable
   */
  loadSupportedTools(): Observable<SupportedTools[]> {
    return this.http.get<SupportedTools[]>(`${this.endpoint}/supported-tools`);
  }
}
