import { TestBed } from '@angular/core/testing';
import { FtuDataService } from '@hra-ui/services';
import { MockProxy, mock } from 'jest-mock-extended';
import { CellSummaryState } from './cell-summary.state';
import { of } from 'rxjs';

describe('CellSummaryState', () => {
  let state: CellSummaryState;
  let dataService: MockProxy<FtuDataService>;

  beforeEach(() => {
    TestBed.overrideProvider(FtuDataService, {
      useValue: (dataService = mock()),
    });

    state = TestBed.runInInjectionContext(() => new CellSummaryState());
    dataService.getCellSummaries.mockReturnValue(of([]));
  });
});
