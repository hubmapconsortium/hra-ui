import { computed } from '@angular/core';
import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { FilterFormValues } from '../components/filter-menu/filter-menu.component';
import { coerceArray } from '../utils/utils';

/** Filters state interface */
export interface FiltersState {
  /** The digital objects filter */
  digitalObjects: string[] | null;
  /** The release version filter */
  releaseVersion: string[] | null;
  /** The organs filter */
  organs: string[] | null;
  /** The anatomical structures filter */
  anatomicalStructures: string[] | null;
  /** The cell types filter */
  cellTypes: string[] | null;
  /** The biomarkers filter */
  biomarkers: string[] | null;
  /** The search term filter */
  searchTerm: string | null;
}

/** Initial state for the filters store */
const initialState: FiltersState = {
  digitalObjects: null,
  releaseVersion: null,
  organs: null,
  anatomicalStructures: null,
  cellTypes: null,
  biomarkers: null,
  searchTerm: null,
};

/**
 * Creates a feature for managing filters
 * @returns The filters feature
 */
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

      return {
        currentFilters,
      };
    }),
    withMethods((store) => ({
      setDigitalObjects: signalMethod((digitalObjects: string | string[]) =>
        patchState(store, { digitalObjects: coerceArray(digitalObjects) }),
      ),
      setReleaseVersion: signalMethod((releaseVersion: string | string[]) =>
        patchState(store, { releaseVersion: coerceArray(releaseVersion) }),
      ),
      setOrgans: signalMethod((organs: string | string[]) => patchState(store, { organs: coerceArray(organs) })),
      setAnatomicalStructures: signalMethod((anatomicalStructures: string | string[]) =>
        patchState(store, { anatomicalStructures: coerceArray(anatomicalStructures) }),
      ),
      setCellTypes: signalMethod((cellTypes: string | string[]) =>
        patchState(store, { cellTypes: coerceArray(cellTypes) }),
      ),
      setBiomarkers: signalMethod((biomarkers: string | string[]) =>
        patchState(store, { biomarkers: coerceArray(biomarkers) }),
      ),
      setSearchTerm: signalMethod((searchTerm: string | null) => patchState(store, { searchTerm })),

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
