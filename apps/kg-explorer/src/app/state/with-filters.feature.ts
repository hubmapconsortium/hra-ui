import { computed } from '@angular/core';
import { patchState, signalMethod, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { FilterFormValues } from '../components/filter-menu/filter-menu.component';

/** Current filter interface (each category contains string of filter option IDs) */
export interface CurrentFilters {
  /** Digital object filters */
  digitalObjects: string[];
  /** Release version filters */
  releaseVersion: string[];
  /** Organ filters */
  organs: string[];
  /** Anatomical structures filters */
  anatomicalStructures: string[];
  /** Cell type filters */
  cellTypes: string[];
  /** Biomarker filters */
  biomarkers: string[];
  /** Search term filters */
  searchTerm: string | undefined;
}

/** Initial state for the filters store */
const initialState: CurrentFilters = {
  digitalObjects: [],
  releaseVersion: [],
  organs: [],
  anatomicalStructures: [],
  cellTypes: [],
  biomarkers: [],
  searchTerm: undefined,
};

export function withFilters() {
  return signalStoreFeature(
    withState(initialState),
    withComputed((store) => {
      return {
        filters: computed(() => {
          return {
            digitalObjects: store.digitalObjects(),
            releaseVersion: store.releaseVersion(),
            organs: store.organs(),
            anatomicalStructures: store.anatomicalStructures(),
            cellTypes: store.cellTypes(),
            biomarkers: store.biomarkers(),
            searchTerm: store.searchTerm(),
          };
        }),
      };
    }),
    withMethods((store) => ({
      updateFilters: signalMethod((filters: CurrentFilters) => {
        patchState(store, filters);
      }),
      updateFiltersFromForm: signalMethod((formValues: FilterFormValues) => {
        const updatedFilters: CurrentFilters = {
          digitalObjects: formValues.digitalObjects?.map((obj) => obj.id) || [],
          releaseVersion: formValues.releaseVersion?.map((obj) => obj.id) || [],
          organs: formValues.organs?.map((obj) => obj.id) || [],
          anatomicalStructures: formValues.anatomicalStructures?.map((obj) => obj.id) || [],
          cellTypes: formValues.cellTypes?.map((obj) => obj.id) || [],
          biomarkers: formValues.biomarkers?.map((obj) => obj.id) || [],
          searchTerm: store.searchTerm(),
        };
        patchState(store, updatedFilters);
      }),

      updateSearchTerm: signalMethod((searchTerm?: string) => {
        patchState(store, { searchTerm });
      }),
    })),
  );
}
