import { signalStore } from '@ngrx/signals';
import { withDigitalObjectsData } from './with-do-data.feature';
import { withFilters } from './with-filters.feature';

export const FiltersStore = signalStore({ providedIn: 'root' }, withDigitalObjectsData(), withFilters());
