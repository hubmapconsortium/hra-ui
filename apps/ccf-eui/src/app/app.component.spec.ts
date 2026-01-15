import { OverlayContainer } from '@angular/cdk/overlay';
jest.mock('@angular/core', () => {
  const actual = jest.requireActual('@angular/core');
  return { ...actual, Component: () => (target: any) => target };
});

import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Filter } from '@hra-api/ng-client';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { Store } from '@ngxs/store';
import { ALL_ORGANS, GlobalConfigState } from 'ccf-shared';
import { mockDeep } from 'jest-mock-extended';
import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from './app.component';
import { OntologySelection } from './core/models/ontology-selection';
import { DataState } from './core/store/data/data.state';
import { ListResultsState } from './core/store/list-results/list-results.state';
import { SceneState } from './core/store/scene/scene.state';
import { SpatialSearchFlowService } from './shared/services/spatial-search-flow.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let dataState: DataState;
  let sceneState: SceneState;
  let listResultsState: ListResultsState;

  beforeEach(() => {
    const overlayContainer = mockDeep<OverlayContainer>();
    overlayContainer.getContainerElement.mockReturnValue(document.createElement('div'));

    const store = mockDeep<Store>();
    store.selectSignal.mockReturnValue(signal([] as never[]));

    const globalConfig = mockDeep<GlobalConfigState<any>>();
    globalConfig.getOption.mockReturnValue(of(undefined));

    dataState = mockDeep<DataState>();
    Object.assign(dataState, {
      filter$: new BehaviorSubject<Filter>({ ageRange: [20, 30], bmiRange: [18, 25] } as Filter),
      technologyFilterData$: of([]),
      providerFilterData$: of([]),
      consortiaFilterData$: of([]),
      tissueBlockData$: of(null),
      aggregateData$: of([]),
      ontologyTermOccurencesData$: of({}),
      cellTypeTermOccurencesData$: of({}),
      biomarkerTermOccurencesData$: of({}),
      sceneData$: of(null),
      queryStatus$: of('idle'),
      cellTypeTermsFullData$: of({}),
      biomarkerTermsFullData$: of({}),
      ontologyTermsFullData$: of({}),
    });

    sceneState = mockDeep<SceneState>();
    Object.assign(sceneState, {
      referenceOrgans$: of([]),
      scene$: of(null),
    });

    listResultsState = mockDeep<ListResultsState>();
    Object.assign(listResultsState, {
      listResults$: of([]),
      aggregateData$: of([]),
      highlightedNodeId$: of(''),
    });
    (listResultsState.getState as unknown as jest.Mock).mockReturnValue({ highlightedNodeId: 'n1' });

    TestBed.configureTestingModule({
      providers: [
        { provide: OverlayContainer, useValue: overlayContainer },
        { provide: Store, useValue: store },
        { provide: DataState, useValue: dataState },
        { provide: SceneState, useValue: sceneState },
        { provide: ListResultsState, useValue: listResultsState },
        { provide: SnackbarService, useValue: {} },
        { provide: SpatialSearchFlowService, useValue: { startSpatialSearchFlow: jest.fn() } },
        { provide: GlobalConfigState, useValue: globalConfig },
      ],
    });

    component = TestBed.runInInjectionContext(() => new AppComponent());
  });

  it('formats range values with defaults', () => {
    expect(component.formatRange(undefined, 1, 10)).toBe('1-10');
    expect(component.formatRange([5, 8], 1, 10)).toBe('5-8');
  });

  it('updates filter for ontology selections per type', () => {
    const selection = (id: string): OntologySelection => ({ id }) as OntologySelection;

    component.ontologySelected([selection('as1')], 'anatomical-structures');
    expect(dataState.updateFilter).toHaveBeenCalledWith({ ontologyTerms: ['as1'] });

    component.ontologySelected([selection('ct1')], 'cell-type');
    expect(dataState.updateFilter).toHaveBeenCalledWith({ cellTypeTerms: ['ct1'] });

    component.ontologySelected([selection('b1')], 'biomarkers');
    expect(dataState.updateFilter).toHaveBeenCalledWith({ biomarkerTerms: ['b1'] });
  });

  it('clears ontology filters when selection is undefined', () => {
    component.ontologySelected(undefined, 'anatomical-structures');
    expect(dataState.updateFilter).toHaveBeenCalledWith({ ontologyTerms: [], cellTypeTerms: [], biomarkerTerms: [] });
  });

  it('tracks selected toggle options', () => {
    component.toggleSelection(['a', 'b']);
    expect(component.selectedToggleOptions).toEqual(['a', 'b']);
    expect(component.isItemSelected('a')).toBe(true);
    expect(component.isItemSelected('z')).toBe(false);
  });

  it('updates organ visibility helpers', () => {
    component.selectAllOrgans();
    expect(sceneState.setSelectedReferenceOrgans).toHaveBeenCalledWith(ALL_ORGANS);

    component.clearAllOrgans();
    expect(sceneState.setSelectedReferenceOrgans).toHaveBeenCalledWith([]);
  });

  it('unhighlights node when one is active', () => {
    component.unHighlightNode();
    expect(listResultsState.unHighlightNode).toHaveBeenCalled();
  });
});
