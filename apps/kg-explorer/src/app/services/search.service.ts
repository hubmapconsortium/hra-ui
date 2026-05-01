import { Injectable } from '@angular/core';
import { TableRow } from '@hra-ui/design-system/table';
import { Observable, of } from 'rxjs';
import { TermsIndex } from '../digital-objects-metadata.schema';
import { coerceArray } from '../utils/utils';

/**
 * Service for searching digital objects by filters
 */
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  /**
   * Searches digital objects by the provided filters
   * @param rows The rows to search
   * @param termsIndex The terms index
   * @param options The search options
   * @returns The search results
   */
  search(
    rows: TableRow[],
    termsIndex: TermsIndex,
    options: {
      searchTerm: string | null;
      digitalObjects: string[];
      versions: string[];
      organs: string[];
      ontologyTerms: string[];
      cellTypeTerms: string[];
      biomarkerTerms: string[];
    },
  ): Observable<string[]> {
    const { organs, versions, ontologyTerms, cellTypeTerms, biomarkerTerms, searchTerm, digitalObjects } = options;
    const filters = [
      this.createSearchFilter(searchTerm),
      this.createDigitalObjectFilter(digitalObjects),
      this.createVersionFilter(versions),
    ];
    const asctbFilters = [
      this.createAsctbFilter(organs, termsIndex),
      this.createAsctbFilter(ontologyTerms, termsIndex),
      this.createAsctbFilter(cellTypeTerms, termsIndex),
      this.createAsctbFilter(biomarkerTerms, termsIndex),
    ];

    const filteredRows = rows.filter((item) => filters.every((fn) => fn(item)));
    const filteredPurls = filteredRows.map((item) => item['purl'] as string);
    const result = filteredPurls.filter((purl) => asctbFilters.every((fn) => fn(purl)));
    return of(result);
  }

  /**
   * Gets related purl ids from terms
   * @param terms The terms to get purls for
   * @param termsIndex The terms index
   * @returns The related purl ids
   */
  private getPurlsFromTerms(terms: string[], termsIndex: TermsIndex): Set<string> {
    const purls = new Set<string>();
    terms.forEach((term) => {
      const purlIndexes = termsIndex.term_to_purls[termsIndex.terms.indexOf(term)];
      if (purlIndexes) {
        purlIndexes.forEach((purlIndex) => purls.add(termsIndex.purls[purlIndex]));
      }
    });
    return purls;
  }

  /**
   * Returns a function for filtering table rows by search term
   * @param searchTerm The search term
   * @returns The search filter
   */
  private createSearchFilter(searchTerm: string | null): (item: TableRow) => boolean {
    if (!searchTerm || searchTerm === '') {
      return () => true;
    }
    return (item) => {
      const title = (item['title'] as string).toLowerCase();
      return title.includes(searchTerm.toLowerCase());
    };
  }

  /**
   * Returns a function for filtering table rows by digital object types
   * @param options The digital object options
   * @returns The digital object filter
   */
  private createDigitalObjectFilter(options: string[]): (item: TableRow) => boolean {
    const ids = new Set(options);
    if (ids.size === 0) {
      return () => true;
    }
    return (item) => ids.has(item['doType'] as string);
  }

  /**
   * Returns a function for filtering table rows by HRA versions
   * @param options The version options
   * @returns The HRA version filter
   */
  private createVersionFilter(options: string[]): (item: TableRow) => boolean {
    const ids = new Set(options);
    if (ids.size === 0) {
      return () => true;
    }
    return (item) => {
      const rowVersions = coerceArray(item['hraVersions'] as string[] | string | undefined);
      if (rowVersions.length > 0) {
        return rowVersions?.some((version) => ids.has(version));
      }
      return false;
    };
  }

  /**
   * Returns a function for filtering table rows by ASCTB terms
   * @param options The ASCTB term options
   * @param termsIndex The terms index
   * @returns The ASCTB filter
   */
  private createAsctbFilter(options: string[], termsIndex: TermsIndex): (item: string) => boolean {
    const ids = new Set(options);
    if (ids.size === 0) {
      return () => true;
    }
    const purls = this.getPurlsFromTerms(coerceArray(options), termsIndex);
    return (item) => {
      return purls.has(item);
    };
  }
}
