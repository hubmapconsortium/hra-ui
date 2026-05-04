import { signalStore } from '@ngrx/signals';
import { withDigitalObjectsData } from './with-do-data.feature';
import { withFilters } from './with-filters.feature';

/** Store for managing the application's filters */
export const FiltersStore = signalStore({ providedIn: 'root' }, withDigitalObjectsData(), withFilters());
