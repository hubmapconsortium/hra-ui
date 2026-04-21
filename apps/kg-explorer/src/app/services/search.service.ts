import { Injectable } from '@angular/core';
import { TableRow } from '@hra-ui/design-system/table';
import { from, Observable } from 'rxjs';
import { TermsIndex } from '../digital-objects-metadata.schema';
import { handleValue } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  doSearch(
    rows: TableRow[],
    termsIndex: TermsIndex,
    options: {
      organs: string[];
      versions: string[];
      ontologyTerms: string[];
      cellTypeTerms: string[];
      biomarkerTerms: string[];
      searchTerm: string | undefined;
      digitalObjects: string[];
    },
  ): Observable<string[]> {
    const { organs, versions, ontologyTerms, cellTypeTerms, biomarkerTerms, searchTerm, digitalObjects } = options;

    const filteredByDigitalObjects = rows.filter((row) => {
      const type = row['doType'] as string;
      if (digitalObjects.length === 0) {
        return true;
      }
      return digitalObjects.includes(type);
    });

    const filteredByVersions = filteredByDigitalObjects
      .filter((row) => {
        const rowVersions = handleValue(row['hraVersions'] as string[] | string | undefined);
        if (versions.length === 0) {
          return true;
        }
        if (rowVersions) {
          return rowVersions?.some((version) => versions.includes(version));
        }
        return false;
      })
      .map((row) => row['purl'] as string);

    const filteredBySearchTerm = filteredByVersions.filter((entry) => {
      return entry.toLowerCase().includes((searchTerm || '').toLowerCase());
    });

    const filteredByOrgans = filteredBySearchTerm.filter((term) => {
      if (organs.length === 0) {
        return true;
      }
      return this.getPurlsFromTerms(organs, termsIndex).has(term);
    });

    const filteredByOntologyTerms = filteredByOrgans.filter((term) => {
      if (ontologyTerms.length === 0) {
        return true;
      }
      return this.getPurlsFromTerms(ontologyTerms, termsIndex).has(term);
    });
    const filteredByCellTypeTerms = filteredByOntologyTerms.filter((term) => {
      if (cellTypeTerms.length === 0) {
        return true;
      }
      return this.getPurlsFromTerms(cellTypeTerms, termsIndex).has(term);
    });

    const filteredByBiomarkerTerms = filteredByCellTypeTerms.filter((term) => {
      if (biomarkerTerms.length === 0) {
        return true;
      }
      return this.getPurlsFromTerms(biomarkerTerms, termsIndex).has(term);
    });

    return from([filteredByBiomarkerTerms]);
  }

  getPurlsFromTerms(terms: string[], termsIndex: TermsIndex): Set<string> {
    const purls = new Set<string>();
    terms.forEach((term) => {
      const purlIndexes = termsIndex.term_to_purls[termsIndex.terms.indexOf(term)];
      if (purlIndexes) {
        purlIndexes.forEach((purlIndex) => purls.add(termsIndex.purls[purlIndex]));
      }
    });
    return purls;
  }
}
