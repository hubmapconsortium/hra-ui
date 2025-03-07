import { OntologyTreeNode } from '@hra-api/ng-client';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { RecursivePartial, Shallow } from 'shallow-render';
import { OntologySearchService } from '../../../core/services/ontology-search/ontology-search.service';
import { OntologyTreeComponent } from '../ontology-tree/ontology-tree.component';
import { OntologySelectionComponent } from './ontology-selection.component';
import { OntologySelectionModule } from './ontology-selection.module';
import { mock, MockProxy } from 'jest-mock-extended';

function fromPartial<T>(partial: RecursivePartial<T>): T {
  return partial as T;
}

describe('OntologySelectionComponent', () => {
  const ontologyNode = fromPartial<OntologyTreeNode>({ label: 'label' });

  let shallow: Shallow<OntologySelectionComponent>;
  let mockStore: MockProxy<Store>;

  beforeEach(() => {
    mockStore = mock();
    mockStore.selectSnapshot.mockReturnValue({ node: ontologyNode });

    shallow = new Shallow(OntologySelectionComponent, OntologySelectionModule)
      .provide(OntologySearchService)
      .mock(Store, mockStore)
      .mock(OntologySearchService, { rootNode$: of(fromPartial<OntologyTreeNode>({})) })
      .mock(OntologyTreeComponent, { expandAndSelect: () => undefined });
  });

  it('should expand the selected node', async () => {
    const { findComponent, instance } = await shallow.render();
    const tree = findComponent(OntologyTreeComponent);
    const spy = tree.expandAndSelect;

    instance.selected(ontologyNode);
    expect(spy).toHaveBeenCalled();
  });

  it('should call filterNodes method when selectedBiomarkerOptions triggers', async () => {
    const { findComponent, instance } = await shallow.render();
    instance.treeModel = {
      root: '',
      nodes: {},
    };
    jest.spyOn(instance, 'filterNodes');
    findComponent(OntologyTreeComponent).selectedBiomarkerOptions.emit(['gene']);
    expect(instance.filterNodes).toHaveBeenCalled();
  });
});
