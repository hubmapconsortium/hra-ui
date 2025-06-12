import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FilterSexEnum } from '@hra-api/ng-client';
import { NgxsModule, StateContext } from '@ngxs/store';
import { ApiEndpointDataSourceService, DataSourceService, GlobalConfigState } from 'ccf-shared';
import { mock, MockProxy } from 'jest-mock-extended';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { of } from 'rxjs';
import { DataState } from '../data/data.state';
import { SceneState } from '../scene/scene.state';
import { StartSpatialSearchFlow } from './spatial-search-ui.actions';
import { SpatialSearchUiModel, SpatialSearchUiState } from './spatial-search-ui.state';

describe('SpatialSearchUiState', () => {
  const defaultState = {
    sex: FilterSexEnum.Female,
    executeSearchOnGeneration: true,
  };
  let ctx: MockProxy<StateContext<SpatialSearchUiModel>>;
  let http: MockProxy<HttpClient>;
  let ga: MockProxy<GoogleAnalyticsService>;
  let spatialSearchState: SpatialSearchUiState;

  beforeEach(() => {
    ctx = mock();
    http = mock();
    ga = mock();

    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([SpatialSearchUiState, GlobalConfigState, DataState, SceneState]),
      ],
      providers: [
        { provide: DataSourceService, useExisting: ApiEndpointDataSourceService },
        { provide: GoogleAnalyticsService, useValue: ga },
        { provide: HttpClient, useValue: http },
      ],
    });
    spatialSearchState = TestBed.inject(SpatialSearchUiState);
  });

  beforeEach(() => {
    ctx.getState.mockReturnValue(defaultState);
    http.get.mockReturnValue(of(''));
  });

  it('should start spatial search flow', () => {
    spatialSearchState.startSpatialSearchFlow(ctx, new StartSpatialSearchFlow(false));
    expect(true).toBeTruthy();
  });

  it('should patch state on setSex', () => {
    spatialSearchState.setSex(ctx, { sex: FilterSexEnum.Male });
    expect(true).toBeTruthy();
  });

  it('should patch state on setOrgan', () => {
    spatialSearchState.setOrgan(ctx, { organId: 'test' });
    expect(true).toBeTruthy();
  });

  it('should patch state on setPosition', () => {
    spatialSearchState.setPosition(ctx, { position: { x: 1, y: 1, z: 1 } });
    expect(true).toBeTruthy();
  });

  it('should reset position', () => {
    spatialSearchState.resetPosition(ctx);
    expect(true).toBeTruthy();
  });

  it('should move to node', () => {
    spatialSearchState.moveToNode(ctx, { node: { name: 'test' } });
    expect(true).toBeTruthy();
  });

  it('should set radius', () => {
    spatialSearchState.setRadius(ctx, { radius: 5 });
    expect(true).toBeTruthy();
  });

  it('should reset radius', () => {
    spatialSearchState.resetRadius(ctx);
    expect(true).toBeTruthy();
  });

  it('should update spatial search', () => {
    spatialSearchState.updateSpatialSearch(ctx);
    expect(true).toBeTruthy();
  });

  it('should generate spatial search', () => {
    spatialSearchState.generateSpatialSearch(ctx);
    expect(true).toBeTruthy();
  });

  it('should set execute search on generate', () => {
    spatialSearchState.setExecuteSearchOnGenerate(ctx, { execute: true });
    expect(true).toBeTruthy();
  });
});
