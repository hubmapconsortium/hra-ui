import { Injectable, inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin, of } from 'rxjs';
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

/**
 * Interface for extraction site details returned by the API
 */
interface ExtractionSiteDetails {
  /** Unique identifier for the extraction site */
  '@id': string;
  /** Last name of the creator */
  creator_last_name?: string;
  /** Creation date in ISO format */
  creation_date?: string;
  /** Additional properties */
  [key: string]: unknown;
}

/**
 * Configuration interface for API endpoints
 */
export interface ApiEndpointsConfig {
  /** URL for anatomical structure data */
  anatomicalUrl: string;
  /** URL for extraction site data */
  extractionSiteUrl: string;
  /** URL for dataset cell data */
  datasetCellUrl: string;
  /** URL for extraction site details */
  extractionSiteDetailsUrl: string;
}

/**
 * InjectionToken for configurable API endpoints
 */
export const API_ENDPOINTS_CONFIG = new InjectionToken<ApiEndpointsConfig>('api.endpoints.config', {
  providedIn: 'root',
  factory: () => ({
    anatomicalUrl: 'https://apps.humanatlas.io/api/grlc/hra-pop/cell_types_in_anatomical_structurescts_per_as.json',
    extractionSiteUrl: 'https://apps.humanatlas.io/api/grlc/hra-pop/cell-types-per-extraction-site.json',
    datasetCellUrl: 'https://apps.humanatlas.io/api/grlc/hra-pop/cell-types-per-dataset.json',
    extractionSiteDetailsUrl: 'https://apps.humanatlas.io/api/v1/extraction-site',
  }),
});

/**
 * Service for fetching and processing HRApop data from various endpoints
 *
 * Handles data retrieval for anatomical structures, extraction sites, and datasets,
 * with enhanced processing for extraction site labels and caching.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  /** HTTP client for making API requests */
  private readonly http = inject(HttpClient);

  /** API configuration with endpoint URLs */
  private readonly apiConfig = inject(API_ENDPOINTS_CONFIG);

  /** Cache for extraction site details to avoid duplicate API calls */
  private extractionSiteDetailsCache = new Map<string, ExtractionSiteDetails>();

  /**
   * Retrieves and parses anatomical structure data
   * @returns Observable of parsed anatomical data
   */
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

  /**
   * Retrieves and parses extraction site data with enhanced labels
   * @returns Observable of parsed extraction site data
   */
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

  /**
   * Retrieves and parses dataset cell data
   * @returns Observable of parsed dataset cell data
   */
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
   * Fetches extraction site details from the API
   * @param iri - The IRI identifier for the extraction site
   * @returns Observable of extraction site details or null if not found
   * @private
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
   * Formats extraction site label in the format: htan-{organ}-{creator_last_name}-{creation_year}-{id}
   * @param iri - The IRI identifier for the extraction site
   * @param organ - The organ name
   * @returns Formatted extraction site label
   * @private
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
   * Gets the formatted label for an extraction site (for external use)
   * @param iri - The IRI identifier for the extraction site
   * @param organ - The organ name
   * @returns Formatted extraction site label
   */
  getExtractionSiteLabel(iri: string, organ: string): string {
    return this.formatExtractionSiteLabel(iri, organ);
  }
}
