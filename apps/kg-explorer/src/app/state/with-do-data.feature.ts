import { computed } from '@angular/core';
import { TableRow } from '@hra-ui/design-system/table';
import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { AsctbTerms, DigitalObjectInfo, DigitalObjectsJsonLd, TermsIndex } from '../digital-objects-metadata.schema';
import {
  coerceArray,
  FilterOption,
  formatDateToYYYYMM,
  getOrganIcon,
  getOrganTooltip,
  getProductIcon,
  getProductLabel,
  getProductTooltip,
  HRA_VERSION_DATA,
  sentenceCase,
} from '../utils/utils';

/** Interface for the digital objects data state */
export interface DigitalObjectsDataState {
  /** Raw digital object data */
  data: DigitalObjectsJsonLd;
  /** ASCTB terms */
  asctbTerms: AsctbTerms;
  /** Index of ASCTB terms */
  termsIndex: TermsIndex;
  /** All rows of digital object data */
  allRows: TableRow[];
  /** Version counts */
  versionCounts: Record<string, number>;
}

/**
 * Resolves raw digital object data into array of TableRow
 * @param data Raw digital object data
 * @returns Data as TableRow[]
 */
function resolveData(data?: DigitalObjectInfo[]): TableRow[] {
  if (!data) {
    return [];
  }
  return data.map((item) => {
    return {
      id: item.lod,
      purl: item.purl,
      doType: item.doType,
      hraVersions: item.hraVersions,
      doVersion: item.doVersion,
      organIds: item.organIds,
      title: item.title,
      objectUrl: `${item.doType}/${item.doName}/latest`,
      typeIcon: getProductIcon(item.doType),
      typeTooltip: getProductLabel(item.doType),
      organIcon: getOrganIcon(item),
      organTooltip: getOrganTooltip(getOrganIcon(item)),
      cellCount: item.cell_count,
      biomarkerCount: item.biomarker_count,
      lastPublished: formatDateToYYYYMM(item.lastUpdated),
    } as TableRow;
  });
}

/**
 * Gets HRA version counts from digital object data
 * @param data The digital object data
 * @returns Record of HRA versions with their counts
 */
function getVersionCounts(data: DigitalObjectInfo[]): Record<string, number> {
  const result: Record<string, number> = {};
  const allVersions = data.map((object) => object.hraVersions);
  const flatVersions = allVersions.flat();
  for (const version of flatVersions) {
    if (version) {
      if (result[version]) {
        result[version] += 1;
      } else {
        result[version] = 1;
      }
    }
  }
  return result;
}

/**
 * Calculates count for a given filter option in a specific category
 * @param filterOption The filter option to count
 * @param category The category to count in
 * @param rows The rows to filter
 * @returns The count of the filter option in the specified category
 */
function calculateCount(filterOption: string, category: string, rows: TableRow[]): number {
  return rows.filter((row) => {
    const cat = coerceArray(row[category] as string[] | string | undefined);
    if (cat) {
      return cat.some((value) => String(value).toLowerCase() === filterOption.toLowerCase());
    }
    return false;
  }).length;
}

/**
 * Generates ASCTB options for a given ASCTB type
 * @param asctbType The ASCTB type
 * @param objects The ASCTB objects
 * @param termsIndex The terms index
 * @returns The ASCTB options
 */
function generateAsctbOptions(asctbType: string, objects: AsctbTerms, termsIndex: TermsIndex): FilterOption[] {
  return objects
    .filter((term) => term.asctb_type === asctbType)
    .map((term) => {
      return {
        id: term.iri,
        label: term.label,
        count: termsIndex.term_to_purls[termsIndex.terms.indexOf(term.iri)]?.length ?? 0,
      };
    })
    .sort((o1, o2) => o1.label.localeCompare(o2.label));
}

/** Initial state for the digital objects data store */
const initialState: DigitalObjectsDataState = {
  data: { '@context': {}, '@graph': [] },
  asctbTerms: [],
  termsIndex: { terms: [], purls: [], term_to_purls: [], purl_to_terms: [] },
  allRows: [],
  versionCounts: {},
};

/**
 * Creates a feature for managing digital objects filter options
 * @returns The digital objects data feature
 */
export function withDigitalObjectsData() {
  return signalStoreFeature(
    withState(initialState),
    withComputed((store) => {
      const kgFilterOptions = computed(() => {
        const objectFilterOptions = new Set<string>();
        const organFilterOptions = new Set<string>();
        store.allRows().forEach((row) => {
          const doType = row['doType'];
          const organs = coerceArray(row['organIds'] as string[] | string | undefined);
          objectFilterOptions.add(doType as string);
          for (const organ of organs) {
            organFilterOptions.add(organ);
          }
        });
        return {
          doOptions: objectFilterOptions,
          organOptions: organFilterOptions,
        };
      });

      const _digitalObjectsOptions = computed(() => {
        return Array.from(kgFilterOptions().doOptions)
          .map((filterOption) => {
            return {
              id: filterOption,
              label: getProductLabel(filterOption),
              count: calculateCount(filterOption, 'doType', store.allRows()),
              tooltip: getProductTooltip(filterOption),
            };
          })
          .sort((o1, o2) => o1.label.localeCompare(o2.label)) as FilterOption[];
      });

      const _hraVersionsOptions = computed(() => {
        return Object.keys(HRA_VERSION_DATA)
          .map((filterOption) => {
            const versionData = HRA_VERSION_DATA[filterOption];
            return {
              id: filterOption,
              label: versionData ? versionData.label : filterOption,
              count: store.versionCounts()[filterOption],
              secondaryLabel: versionData ? versionData.date : undefined,
            };
          })
          .sort((o1, o2) => o2.id.localeCompare(o1.id)) as FilterOption[]; //Reverse order
      });

      const _organOptions = computed(() => {
        return Array.from(kgFilterOptions().organOptions)
          .map((organOption) => {
            return {
              id: organOption,
              label: sentenceCase(store.asctbTerms().find((term) => term.iri === organOption)?.label ?? organOption),
              count: calculateCount(organOption, 'organIds', store.allRows()),
            };
          })
          .sort((o1, o2) => o1.label.localeCompare(o2.label)) as FilterOption[];
      });

      const _anatomicalStructuresOptions = computed(() =>
        generateAsctbOptions('AS', store.asctbTerms(), store.termsIndex()),
      );
      const _cellTypesOptions = computed(() => generateAsctbOptions('CT', store.asctbTerms(), store.termsIndex()));
      const _biomarkerOptions = computed(() => generateAsctbOptions('BM', store.asctbTerms(), store.termsIndex()));

      const allFilters = computed(() => {
        return {
          digitalObjects: _digitalObjectsOptions(),
          releaseVersion: _hraVersionsOptions(),
          organs: _organOptions(),
          anatomicalStructures: _anatomicalStructuresOptions(),
          cellTypes: _cellTypesOptions(),
          biomarkers: _biomarkerOptions(),
        };
      });

      return {
        allFilters,
      };
    }),
    withMethods((store) => {
      const setAllRows = signalMethod((data: DigitalObjectsJsonLd) =>
        patchState(store, { allRows: resolveData(data['@graph'] as DigitalObjectInfo[]) }),
      );
      const setVersionCounts = signalMethod((data: DigitalObjectsJsonLd) =>
        patchState(store, { versionCounts: getVersionCounts(data['@graph'] as DigitalObjectInfo[]) }),
      );
      const setAsctbTerms = signalMethod((asctbTerms: AsctbTerms) => patchState(store, { asctbTerms }));
      const setTermsIndex = signalMethod((termsIndex: TermsIndex) => patchState(store, { termsIndex }));

      return { setAllRows, setVersionCounts, setAsctbTerms, setTermsIndex };
    }),
  );
}
