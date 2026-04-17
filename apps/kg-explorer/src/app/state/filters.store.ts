import { signalStore } from '@ngrx/signals';
import { withFilters } from './with-filters.feature';

export const FiltersStore = signalStore({ providedIn: 'root' }, withFilters());
