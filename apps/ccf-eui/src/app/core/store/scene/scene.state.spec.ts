import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { NodeClickEvent } from 'ccf-body-ui';
import { ALL_POSSIBLE_ORGANS, ApiEndpointDataSourceService, DataSourceService, GlobalConfigState } from 'ccf-shared';

import { ColorAssignmentState } from '../color-assignment/color-assignment.state';
import { DataState } from '../data/data.state';
import { ListResultsState } from '../list-results/list-results.state';
import { DEFAULT_SELECTED_ORGANS, SceneState } from './scene.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SceneState', () => {
  let sceneState: SceneState;
  const defaultState = {
    scene: [],
    referenceOrgans: [],
    referenceOrganEntities: [],
    selectedReferenceOrgans: [],
    selectedAnatomicalStructures: [],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([SceneState, ListResultsState, ColorAssignmentState, DataState, GlobalConfigState]),
      ],
      providers: [
        { provide: DataSourceService, useExisting: ApiEndpointDataSourceService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    sceneState = TestBed.inject(SceneState);
  });

  it('should patch state on setSelectedReferenceOrgans', () => {
    const selected = [{ organ: 'Heart', name: 'Heart', src: '' }];
    sceneState.setSelectedReferenceOrgans(selected);
    expect(sceneState.getState().selectedReferenceOrgans).toEqual(selected);
  });

  it('should patch state on setReferenceOrgans', () => {
    const selected = [{ organ: 'Heart', name: 'Heart', src: '' }];
    sceneState.setReferenceOrgans(selected);
    expect(sceneState.getState().referenceOrgans).toEqual(selected);
  });
  it('should patch state on setSelectedReferenceOrgans', () => {
    sceneState.setReferenceOrganEntities([]);
    expect(sceneState.getState().referenceOrganEntities).toEqual([]);
  });

  it('should patch scene on setScene', () => {
    sceneState.setScene([]);
    expect(sceneState.getState().scene).toEqual([]);
  });

  it('should return referenceOrgans', () => {
    expect(SceneState.referenceOrgans(defaultState)).toEqual([]);
  });

  it('should return referenceOrgansEntities', () => {
    expect(SceneState.referenceOrganEntities(defaultState)).toEqual([]);
  });

  it('should call listResults highlightNode on calling sceneNodeHovered', () => {
    jest.spyOn(sceneState['listResults'], 'highlightNode');
    sceneState.sceneNodeHovered({} as never);
    expect(sceneState['listResults'].highlightNode).toHaveBeenCalled();
  });
  it('should call listResults unhighlightNode on calling sceneNodeUnhover', () => {
    jest.spyOn(sceneState['listResults'], 'unHighlightNode');
    sceneState.sceneNodeUnhover();
    expect(sceneState['listResults'].unHighlightNode).toHaveBeenCalled();
  });

  it('should call updateFilter when sceneNode is Clicked', () => {
    const nodeClickEvent: NodeClickEvent = {
      node: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@id': '',
        '@type': '',
        representation_of: 'test',
        entityId: 'test',
        transformMatrix: [] as never,
      },
      ctrlClick: false,
    };
    jest.spyOn(sceneState['dataState'], 'updateFilter');
    sceneState.sceneNodeClicked(nodeClickEvent);
    expect(sceneState['dataState'].updateFilter).toHaveBeenCalled();
  });

  it('should call assignColor when sceneNode is clicked with no representation', () => {
    const nodeClickEvent: NodeClickEvent = {
      node: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@id': '',
        '@type': '',
        representation_of: '',
        entityId: 'test',
        transformMatrix: [] as never,
      },
      ctrlClick: false,
    };
    jest.spyOn(sceneState['colorAssignments'], 'assignColor');
    sceneState.sceneNodeClicked(nodeClickEvent);
    expect(sceneState['colorAssignments'].assignColor).toHaveBeenCalled();
  });

  it('should call setSelectedReferenceOrgans on calling setSelectedReferenceOrgansWithDefaults', () => {
    jest.spyOn(sceneState, 'setSelectedReferenceOrgans');
    sceneState.setSelectedReferenceOrgansWithDefaults(ALL_POSSIBLE_ORGANS, [
      'http://purl.obolibrary.org/obo/UBERON_0004538',
    ]);
    expect(sceneState.setSelectedReferenceOrgans).toHaveBeenCalled();
  });

  it('should set selectedReferenceOrgans with default organs if referenceOrgans Input is empty', () => {
    const defaultOrgans = ALL_POSSIBLE_ORGANS.filter(({ id }) => DEFAULT_SELECTED_ORGANS.has(id as string));
    jest.spyOn(sceneState, 'setSelectedReferenceOrgans');
    sceneState.setSelectedReferenceOrgansWithDefaults(ALL_POSSIBLE_ORGANS, []);
    expect(sceneState.getState().selectedReferenceOrgans).toEqual(defaultOrgans);
  });
});
