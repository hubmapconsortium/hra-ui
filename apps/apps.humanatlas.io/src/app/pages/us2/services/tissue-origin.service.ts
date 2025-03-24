import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { firstValueFrom, from, Observable, of, switchMap } from 'rxjs';

/** Sample CSV file URL */
export const SAMPLE_FILE_URL = 'assets/sample-data/tissue-origin-sample.csv';

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
 * User Selection Data
 */
export interface UserSelection {
  /** Organ */
  selectedOrganIri?: string;
  /** Tool */
  selectedToolIri?: string;
}

/**
 * Sources Data
 */
export interface Sources {
  /** Cell source */
  cell_source: string;
  /** Cell source type */
  cell_source_type: string;
  /** Cell source label */
  cell_source_label: string | null;
  /** Cell source link */
  cell_source_link: string | null;
  /** Tool */
  tool: string;
  /** Modality */
  modality: string;
  /** Similarity */
  similarity: number;
}

/** Tissue Origin Predictions */
export interface TissueOriginPredictions {
  /** Sources array */
  sources: Sources[];
  /** RUI locations object */
  rui_locations: object;
}

/** User Selection Service */
@Injectable({ providedIn: 'root' })
export class UserSelectionService {
  /** holds user selection for organ and tool */
  private selections: UserSelection = {};

  /**
   * Updates user selection for organ and tool
   * @param selectedOrganIri user selected organ
   * @param selectedToolIri user selected tool
   */
  updateSelection(selectedOrganIri?: string, selectedToolIri?: string): void {
    this.selections = { selectedOrganIri, selectedToolIri };
  }

  /**
   * Returns user selection for organ and tool
   * @returns UserSelection Object
   */
  getSelections(): UserSelection {
    return this.selections;
  }
}

/**
 * Resolver for Tissue Origin Predictions page
 * @returns Tissue origin predictions result observable
 */
export function resolveTissueOriginPredictions(): Observable<TissueOriginPredictions> {
  /** User selection service */
  const userSelectionService = inject(UserSelectionService).getSelections();

  return inject(TissueOriginService).loadTissuePredictions(
    userSelectionService.selectedOrganIri,
    userSelectionService.selectedToolIri,
  );
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

  /**
   * Gets Predictions for the current csv file
   * @returns Predictions array observable
   */
  loadTissuePredictions(selectedOrganIri?: string, selectedToolIri?: string): Observable<TissueOriginPredictions> {
    if (this.file === null) {
      return of({ sources: [], rui_locations: {} });
    }

    const body = {
      ...(selectedOrganIri && { organ: selectedOrganIri }),
      ...(selectedToolIri && { tool: selectedToolIri }),
    };

    return from(this.file.text()).pipe(
      switchMap((data) =>
        this.http.post<TissueOriginPredictions>(
          `${this.endpoint}/cell-summary-report`,
          {
            ...body,
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
