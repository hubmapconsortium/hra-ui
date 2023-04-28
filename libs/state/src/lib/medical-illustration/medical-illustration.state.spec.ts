import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StateContext } from '@ngxs/store';
import { mock } from 'jest-mock-extended';
import { SetActiveNode, SetUri, SetUriFromIRI } from './medical-illustration.actions';
import { MedicalIllustrationModel } from './medical-illustration.model';
import { MedicalIllustrationState } from './medical-illustration.state';

describe('MedicalIllustrationState', () => {
  const testNode = {
    organ_label: 'Kidney',
    organ_id: 'UBERON:0002113',
    anatomical_structure_of: '#FTUCorticalCollectingDuct',
    source_spatial_entity: '#2DRefObjects',
    node_name: 'Cortical_Collecting_Duct_Principal_Cell_1',
    label: 'kidney cortex collecting duct principal cell',
    OntologyID: 'CL:1000714',
    representation_of: 'http://purl.obolibrary.org/obo/CL_1000714',
    'svg file of single 2DFTU': '2d-ftu-kidney-cortical-collecting-duct',
    exist_asctb: '1',
    type: 'CT',
    'REF/1': '',
    'REF/1/DOI': '',
    'REF/1/NOTES': '',
    'Inset #': '',
  };
  const mockState = {
    url: '',
    node: testNode,
    referenceOrgans: [
      {
        representation_of: testNode.representation_of,
        object: {
          file: 'test.com',
        },
      },
    ],
  };
  const testAction1 = new SetUri('test');
  const testAction2 = new SetActiveNode(testNode);
  const testAction3 = new SetUriFromIRI(testNode.representation_of);
  const ctx = mock<StateContext<MedicalIllustrationModel>>({
    getState: () => mockState,
  });
  let state: MedicalIllustrationState;

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedicalIllustrationState],
    });

    state = TestBed.inject(MedicalIllustrationState);
  });

  afterEach(() => jest.clearAllMocks());

  it('should save a url', async () => {
    state.setUri(ctx, testAction1);
    expect(ctx.setState).toHaveBeenCalledWith({
      url: 'test',
    });
  });

  it('should save the current active node', async () => {
    state.setActiveNode(ctx, testAction2);
    expect(ctx.patchState).toHaveBeenCalledWith({
      node: testNode,
    });
  });

  it('should set uri from the iri', async () => {
    state.setUriFromIRI(ctx, testAction3);
    expect(ctx.patchState).toHaveBeenCalledWith({
      url: 'test.com',
    });
  });
});
