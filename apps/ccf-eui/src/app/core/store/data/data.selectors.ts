import { Selector } from '@ngxs/store';
import { DataState, DataStateModel } from './data.state';
import { Filter, OntologyTree } from '@hra-api/ng-client';

/** Data selectors */
export class DataStateSelectors {
  /** Get filter */
  @Selector([DataState])
  static filter(state: DataStateModel): Filter {
    return state.filter;
  }

  /** Get AS tree */
  @Selector([DataState])
  static anatomicalStructuresTreeModel(state: DataStateModel): OntologyTree {
    return state.anatomicalStructuresTreeModel ?? { root: '', nodes: {} };
  }

  /** Get cell types tree */
  @Selector([DataState])
  static cellTypesTreeModel(state: DataStateModel): OntologyTree {
    return state.cellTypesTreeModel ?? { root: '', nodes: {} };
  }

  /** Get biomarkers tree */
  @Selector([DataState])
  static biomarkersTreeModel(state: DataStateModel): OntologyTree {
    return state.biomarkersTreeModel ?? { root: '', nodes: {} };
  }

  /** Get whether the database is ready */
  @Selector([DataState])
  static isDatabaseReady(state: DataStateModel): boolean {
    return state.status === 'Ready';
  }
}
