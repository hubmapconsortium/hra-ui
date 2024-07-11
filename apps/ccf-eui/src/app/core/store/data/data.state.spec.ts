import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ApiEndpointDataSourceService, DataSourceService, GlobalConfigState } from 'ccf-shared';

import { DataState, DEFAULT_FILTER } from './data.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataState', () => {
  let dataState: DataState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([DataState, GlobalConfigState]),
        HttpClientTestingModule,
      ],
      providers: [{ provide: DataSourceService, useExisting: ApiEndpointDataSourceService }],
    });

    dataState = TestBed.inject(DataState);
  });

  it('has a default filter', () => {
    expect(dataState.getState().filter).toEqual(DEFAULT_FILTER);
  });

  describe('.updateFilter(changes)', () => {
    it('updates the filter', () => {
      dataState.updateFilter({ sex: 'Female' });
      expect(dataState.getState().filter.sex).toEqual('Female');
    });
  });
});
