import { Injectable, signal } from '@angular/core';
import { TableRow } from '@hra-ui/design-system/table';
import { Observable } from 'rxjs';
import { AsctbTerms, DigitalObjectInfo, DigitalObjectsJsonLd, TermsIndex } from '../digital-objects-metadata.schema';
import {
  FilterOption,
  getProductLabel,
  getProductTooltip,
  handleValue,
  HRA_VERSION_DATA,
  sentenceCase,
} from '../utils/utils';

/** Digital object info interface with hraVersions */
export interface DigitalObjectInfoWithHraVersions extends DigitalObjectInfo {
  /** List of HRA versions for the object */
  hraVersions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  readonly data = signal<DigitalObjectsJsonLd>({ '@context': {}, '@graph': [] });
  readonly allRows = signal<TableRow[]>([]);
  readonly asctbTerms = signal<AsctbTerms>([]);
  readonly termsIndex = signal<TermsIndex>({ terms: [], purls: [], term_to_purls: [], purl_to_terms: [] });
  /** Records HRA version counts for the version filter */
  readonly versionCounts = signal<Record<string, number>>({});

  /**
   * Sets the version filter counts from the data
   * @param data Digital object data
   */
  setVersionCounts(data: DigitalObjectInfoWithHraVersions[]) {
    const result: Record<string, number> = {};
    const allVersions = data.map((object) => object.hraVersions);
    const flatVersions = allVersions.flat();
    for (const version of flatVersions) {
      if (result[version]) {
        result[version] += 1;
      } else {
        result[version] = 1;
      }
    }
    this.versionCounts.set(result);
  }

  /**
   * Returns unique filter options for digital objects, versions, and organs from KG API data
   */
  kgFilterOptions() {
    const objectFilterOptions = new Set<string>();
    const organFilterOptions = new Set<string>();
    this.allRows().forEach((row) => {
      const type = row['doType'];
      objectFilterOptions.add(type as string);
      const organs = handleValue(row['organIds'] as string[] | string | undefined);
      if (organs) {
        for (const organ of organs) {
          organFilterOptions.add(organ);
        }
      }
    });
    return {
      doOptions: objectFilterOptions,
      organOptions: organFilterOptions,
    };
  }

  /**
   * Returns list of digital objects in the data as filter options
   * @returns Filter options
   */
  digitalObjectsOptions(): FilterOption[] {
    return Array.from(this.kgFilterOptions().doOptions)
      .map((filterOption) => {
        return {
          id: filterOption,
          label: getProductLabel(filterOption),
          count: this.calculateCount(filterOption, 'doType'),
          tooltip: getProductTooltip(filterOption),
        };
      })
      .sort((o1, o2) => o1.label.localeCompare(o2.label));
  }

  /**
   * Returns HRA version data as filter options
   * @returns Filter options
   */
  hraVersionsOptions(): FilterOption[] {
    return Object.keys(HRA_VERSION_DATA)
      .map((filterOption) => {
        const versionData = HRA_VERSION_DATA[filterOption];
        return {
          id: filterOption,
          label: versionData ? versionData.label : filterOption,
          count: this.versionCounts()[filterOption],
          secondaryLabel: versionData ? versionData.date : undefined,
        };
      })
      .sort((o1, o2) => o2.id.localeCompare(o1.id)); //Reverse order
  }

  /**
   * Returns list of organs in the data as filter options
   * @returns Filter options
   */
  generateOrganOptions(): FilterOption[] {
    return Array.from(this.kgFilterOptions().organOptions)
      .map((organOption) => {
        return {
          id: organOption,
          label: sentenceCase(this.asctbTerms().find((term) => term.iri === organOption)?.label ?? organOption),
          count: this.calculateCount(organOption, 'organIds'),
        };
      })
      .sort((o1, o2) => o1.label.localeCompare(o2.label));
  }

  generateAsctbOptions(type: string, objects: AsctbTerms): FilterOption[] {
    return objects
      .filter((term) => term.asctb_type === type)
      .map((term) => {
        return {
          id: term.iri,
          label: term.label,
          count: this.termsIndex().term_to_purls[this.termsIndex().terms.indexOf(term.iri)]?.length ?? 0,
        };
      })
      .sort((o1, o2) => o1.label.localeCompare(o2.label));
  }

  calculateCount(filterOption: string, category: string): number {
    return this.allRows().filter((row) => {
      const cat = handleValue(row[category] as string[] | string | undefined);
      if (cat) {
        return cat.some((value) => String(value).toLowerCase().includes(filterOption.toLowerCase()));
      }
      return cat === filterOption;
    }).length;
  }

  doSearch(options: {
    organs: string[];
    versions: string[];
    ontologyTerms: string[];
    cellTypeTerms: string[];
    biomarkerTerms: string[];
  }): Observable<string[]> {
    const { organs, versions, ontologyTerms, cellTypeTerms, biomarkerTerms } = options;
    return new Observable<string[]>((subscriber) => {
      if (
        organs.length === 0 &&
        versions.length === 0 &&
        ontologyTerms.length === 0 &&
        cellTypeTerms.length === 0 &&
        biomarkerTerms.length === 0
      ) {
        subscriber.next(this.allRows().map((row) => row['purl'] as string));
        subscriber.complete();
      } else {
        const filteredByVersions = this.allRows().filter((row) => {
          const rowVersions = handleValue(row['hraVersions'] as string[] | string | undefined);
          if (rowVersions) {
            return rowVersions?.some((version) => versions.includes(version));
          }
          return false;
        });
        const versionsSet = new Set(filteredByVersions.map((row) => row['purl'] as string));
        const filteredPurls = new Set([
          ...versionsSet,
          ...this.getPurlsFromTerms(organs),
          ...this.getPurlsFromTerms(ontologyTerms),
          ...this.getPurlsFromTerms(cellTypeTerms),
          ...this.getPurlsFromTerms(biomarkerTerms),
        ]);
        const filteredPurlsArray = Array.from(filteredPurls);
        subscriber.next(filteredPurlsArray);
        subscriber.complete();
      }
    });
  }

  getPurlsFromTerms(terms: string[]): Set<string> {
    const purls = new Set<string>();
    terms.forEach((term) => {
      const purlIndexes = this.termsIndex().term_to_purls[this.termsIndex().terms.indexOf(term)];
      if (purlIndexes) {
        purlIndexes.forEach((purlIndex) => purls.add(this.termsIndex().purls[purlIndex]));
      }
    });
    return purls;
  }
}
