import { signalStore } from '@ngrx/signals';
import { withStudies } from '../../../state/studies/with-studies.feature';

export const StudiesGridStore = signalStore(withStudies());
