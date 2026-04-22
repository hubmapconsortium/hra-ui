import { computed } from '@angular/core';
import { TableRow } from '@hra-ui/design-system/table';
import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { FilterFormValues } from '../components/filter-menu/filter-menu.component';
import { AsctbTerms, DigitalObjectInfo, DigitalObjectsJsonLd, TermsIndex } from '../digital-objects-metadata.schema';
import {
  coerceArray,
  FilterOption,
  formatDateToYYYYMM,
  getOrganIcon,
  getProductIcon,
  getProductLabel,
  getProductTooltip,
  HRA_VERSION_DATA,
  sentenceCase,
} from '../utils/utils';

export interface FiltersState {
  data: DigitalObjectsJsonLd;
  asctbTerms: AsctbTerms;
  termsIndex: TermsIndex;
  digitalObjects: string[] | null;
  releaseVersion: string[] | null;
  organs: string[] | null;
  anatomicalStructures: string[] | null;
  cellTypes: string[] | null;
  biomarkers: string[] | null;
  searchTerm: string | null;
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
    const organLabel = item.organs ? coerceArray(item.organs)[0] : undefined;
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
      organTooltip: sentenceCase(organLabel || 'All Organs'),
      cellCount: item.cell_count,
      biomarkerCount: item.biomarker_count,
      lastPublished: formatDateToYYYYMM(item.lastUpdated['@value']),
    } as TableRow;
  });
}

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

function calculateCount(filterOption: string, category: string, rows: TableRow[]): number {
  return rows.filter((row) => {
    const cat = coerceArray(row[category] as string[] | string | undefined);
    if (cat) {
      return cat.some((value) => String(value).toLowerCase().includes(filterOption.toLowerCase()));
    }
    return false;
  }).length;
}

function generateAsctbOptions(type: string, objects: AsctbTerms, termsIndex: TermsIndex): FilterOption[] {
  return objects
    .filter((term) => term.asctb_type === type)
    .map((term) => {
      return {
        id: term.iri,
        label: term.label,
        count: termsIndex.term_to_purls[termsIndex.terms.indexOf(term.iri)]?.length ?? 0,
      };
    })
    .sort((o1, o2) => o1.label.localeCompare(o2.label));
}

/** Initial state for the filters store */
const initialState: FiltersState = {
  data: { '@context': {}, '@graph': [] },
  asctbTerms: [],
  termsIndex: { terms: [], purls: [], term_to_purls: [], purl_to_terms: [] },
  digitalObjects: null,
  releaseVersion: null,
  organs: null,
  anatomicalStructures: null,
  cellTypes: null,
  biomarkers: null,
  searchTerm: null,
};

export function withFilters() {
  return signalStoreFeature(
    withState(initialState),
    withComputed((store) => {
      const currentFilters = computed(() => ({
        digitalObjects: store.digitalObjects(),
        releaseVersion: store.releaseVersion(),
        organs: store.organs(),
        anatomicalStructures: store.anatomicalStructures(),
        cellTypes: store.cellTypes(),
        biomarkers: store.biomarkers(),
        searchTerm: store.searchTerm(),
      }));

      const allRows = computed(() => {
        return resolveData(store.data()['@graph'] as DigitalObjectInfo[]);
      });

      const versionCounts = computed(() => {
        return getVersionCounts(store.data()['@graph'] as DigitalObjectInfo[]);
      });

      const kgFilterOptions = computed(() => {
        const objectFilterOptions = new Set<string>();
        const organFilterOptions = new Set<string>();
        allRows().forEach((row) => {
          const type = row['doType'];
          const organs = coerceArray(row['organIds'] as string[] | string | undefined);
          objectFilterOptions.add(type as string);
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
              count: calculateCount(filterOption, 'doType', allRows()),
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
              count: versionCounts()[filterOption],
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
              count: calculateCount(organOption, 'organIds', allRows()),
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
        allRows,
        allFilters,
        currentFilters,
      };
    }),
    withMethods((store) => ({
      setDigitalObjects: signalMethod((digitalObjects: string[]) => patchState(store, { digitalObjects })),
      setReleaseVersion: signalMethod((releaseVersion: string[]) => patchState(store, { releaseVersion })),
      setOrgans: signalMethod((organs: string[]) => patchState(store, { organs })),
      setAnatomicalStructures: signalMethod((anatomicalStructures: string[]) =>
        patchState(store, { anatomicalStructures }),
      ),
      setCellTypes: signalMethod((cellTypes: string[]) => patchState(store, { cellTypes })),
      setBiomarkers: signalMethod((biomarkers: string[]) => patchState(store, { biomarkers })),
      setSearchTerm: signalMethod((searchTerm: string | null) => patchState(store, { searchTerm })),

      setData: signalMethod((data: DigitalObjectsJsonLd) => patchState(store, { data })),
      setAsctbTerms: signalMethod((asctbTerms: AsctbTerms) => patchState(store, { asctbTerms })),
      setTermsIndex: signalMethod((termsIndex: TermsIndex) => patchState(store, { termsIndex })),

      updateFiltersFromForm: signalMethod((formValues: FilterFormValues) => {
        patchState(store, {
          digitalObjects: formValues.digitalObjects?.map((obj) => obj.id),
          releaseVersion: formValues.releaseVersion?.map((obj) => obj.id),
          organs: formValues.organs?.map((obj) => obj.id),
          anatomicalStructures: formValues.anatomicalStructures?.map((obj) => obj.id),
          cellTypes: formValues.cellTypes?.map((obj) => obj.id),
          biomarkers: formValues.biomarkers?.map((obj) => obj.id),
          searchTerm: store.searchTerm(),
        });
      }),
    })),
  );
}
