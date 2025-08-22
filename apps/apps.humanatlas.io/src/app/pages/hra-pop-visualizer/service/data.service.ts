// data.service.ts
import { Injectable, inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import {
  parseAnatomical,
  ParsedAnatomicalData,
  AnatomicalSparqlBindingSchema,
} from '../utils/models/anatomical-data.model';
import {
  parseExtractionSite,
  ParsedExtractionSiteData,
  ExtractionSiteSparqlBindingSchema,
} from '../utils/models/extraction-site-data.model';
import {
  parseDatasetCell,
  ParsedDatasetCellData,
  DatasetCellSparqlBindingSchema,
} from '../utils/models/dataset-cell-data.model';
import { z } from 'zod';

// Interface for extraction site details API response
interface ExtractionSiteDetails {
  '@id': string;
  creator_last_name?: string;
  creation_date?: string;
  [key: string]: unknown;
}

// Configuration interface for API endpoints
export interface ApiEndpointsConfig {
  anatomicalUrl: string;
  extractionSiteUrl: string;
  datasetCellUrl: string;
  extractionSiteDetailsUrl: string;
}

// InjectionToken for configurable API endpoints
export const API_ENDPOINTS_CONFIG = new InjectionToken<ApiEndpointsConfig>('api.endpoints.config', {
  providedIn: 'root',
  factory: () => ({
    anatomicalUrl: 'https://apps.humanatlas.io/api/grlc/hra-pop/cell_types_in_anatomical_structurescts_per_as.json',
    extractionSiteUrl: 'https://apps.humanatlas.io/api/grlc/hra-pop/cell-types-per-extraction-site.json',
    datasetCellUrl: 'https://apps.humanatlas.io/api/grlc/hra-pop/cell-types-per-dataset.json',
    extractionSiteDetailsUrl: 'https://apps.humanatlas.io/api/v1/extraction-site',
  }),
});

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(API_ENDPOINTS_CONFIG);

  // Cache for extraction site details to avoid duplicate API calls
  private extractionSiteDetailsCache = new Map<string, ExtractionSiteDetails>();

  getAnatomicalData(): Observable<ParsedAnatomicalData[]> {
    return this.http.get<{ results: { bindings: unknown[] } }>(this.apiConfig.anatomicalUrl).pipe(
      map((response) => {
        // Validate the response structure
        const bindingsArray = z.array(AnatomicalSparqlBindingSchema);

        try {
          const validatedBindings = bindingsArray.parse(response.results.bindings);
          return validatedBindings.map(parseAnatomical);
        } catch (error) {
          throw new Error(
            `Invalid anatomical data format: ${error instanceof Error ? error.message : 'Unknown error'}`,
          );
        }
      }),
    );
  }

  getExtractionSiteData(): Observable<ParsedExtractionSiteData[]> {
    return this.http.get<{ results: { bindings: unknown[] } }>(this.apiConfig.extractionSiteUrl).pipe(
      map((response) => {
        // Validate the response structure
        const bindingsArray = z.array(ExtractionSiteSparqlBindingSchema);

        try {
          const validatedBindings = bindingsArray.parse(response.results.bindings);
          return validatedBindings.map(parseExtractionSite);
        } catch (error) {
          throw new Error(
            `Invalid extraction site data format: ${error instanceof Error ? error.message : 'Unknown error'}`,
          );
        }
      }),
      // Use mergeMap to handle the enhancement process
      mergeMap((parsedData) => {
        // Get unique extraction site IDs for enhancement
        const uniqueExtractionSites = [...new Set(parsedData.map((d) => d.extractionSiteId))];

        // If no extraction sites to enhance, return original data
        if (uniqueExtractionSites.length === 0) {
          return of(parsedData);
        }

        // Fetch details for all unique extraction sites
        const detailRequests = uniqueExtractionSites.map((iri) => this.getExtractionSiteDetails(iri));

        // Wait for all detail requests to complete
        return forkJoin(detailRequests).pipe(
          map(() => {
            // Enhance the data with formatted labels
            return parsedData.map((item) => ({
              ...item,
              extractionSiteLabel: this.formatExtractionSiteLabel(item.extractionSiteId, item.organ),
            }));
          }),
          catchError(() => {
            // If enhancement fails, return original data
            return of(parsedData);
          }),
        );
      }),
    );
  }

  getDatasetCellData(): Observable<ParsedDatasetCellData[]> {
    return this.http.get<{ results: { bindings: unknown[] } }>(this.apiConfig.datasetCellUrl).pipe(
      map((response) => {
        // Validate the response structure
        const bindingsArray = z.array(DatasetCellSparqlBindingSchema);

        try {
          const validatedBindings = bindingsArray.parse(response.results.bindings);
          return validatedBindings.map(parseDatasetCell);
        } catch (error) {
          throw new Error(
            `Invalid dataset cell data format: ${error instanceof Error ? error.message : 'Unknown error'}`,
          );
        }
      }),
    );
  }

  /**
   * Fetch extraction site details from the API
   */
  private getExtractionSiteDetails(iri: string): Observable<ExtractionSiteDetails | null> {
    // Check cache first
    if (this.extractionSiteDetailsCache.has(iri)) {
      return of(this.extractionSiteDetailsCache.get(iri) as ExtractionSiteDetails);
    }

    // Fetch from API using HttpClient params option
    return this.http
      .get<ExtractionSiteDetails>(this.apiConfig.extractionSiteDetailsUrl, {
        params: { iri },
      })
      .pipe(
        map((details) => {
          // Cache the result
          this.extractionSiteDetailsCache.set(iri, details);
          return details;
        }),
        catchError(() => {
          // Cache a null result to avoid repeated failed requests
          this.extractionSiteDetailsCache.set(iri, {} as ExtractionSiteDetails);
          return of(null);
        }),
      );
  }

  /**
   * Format extraction site label in the format: htan-{organ}-{creator_last_name}-{creation_year}-{id}
   */
  private formatExtractionSiteLabel(iri: string, organ: string): string {
    const details = this.extractionSiteDetailsCache.get(iri);

    // Extract ID from IRI (whatever comes after the last slash)
    const idMatch = iri.split('/').pop();
    const extractedId = idMatch || 'unknown';

    if (!details || !details.creator_last_name || !details.creation_date) {
      // Fallback: use a shortened version of the ID if no details available
      const shortId = extractedId !== 'unknown' ? extractedId.substring(0, 8) : 'unknown';
      return `htan-${organ.toLowerCase()}-${shortId}-${extractedId}`;
    }

    const creatorLastName = details.creator_last_name as string;
    const creationDate = details.creation_date as string;
    const creationYear = creationDate.split('-')[0]; // Extract year from YYYY-MM-DD
    const organFormatted = organ.toLowerCase().replace(/\s+/g, '-');

    return `htan-${organFormatted}-${creatorLastName.toLowerCase()}-${creationYear}-${extractedId}`;
  }

  /**
   * Get the formatted label for an extraction site (for external use)
   */
  getExtractionSiteLabel(iri: string, organ: string): string {
    return this.formatExtractionSiteLabel(iri, organ);
  }
}
