import { Selector } from '@ngxs/store';
import { DataState, DataStateModel } from './data.state';
import { Filter, OntologyTree } from '@hra-api/ng-client';

export class DataStateSelectors {
  @Selector([DataState])
  static filter(state: DataStateModel): Filter {
    return state.filter;
  }

  @Selector([DataState])
  static anatomicalStructuresTreeModel(state: DataStateModel): OntologyTree {
    return state.anatomicalStructuresTreeModel ?? { root: '', nodes: {} };
  }

  @Selector([DataState])
  static cellTypesTreeModel(state: DataStateModel): OntologyTree {
    return state.cellTypesTreeModel ?? { root: '', nodes: {} };
  }

  @Selector([DataState])
  static biomarkersTreeModel(state: DataStateModel): OntologyTree {
    return state.biomarkersTreeModel ?? { root: '', nodes: {} };
  }
}
