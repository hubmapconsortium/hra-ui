import { MockProxy, mock } from 'jest-mock-extended';
import { TissueLibraryState } from './tissue-library.state';
import { FtuDataService } from '@hra-ui/services';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TissueLibraryModel } from './tissue-library.model';
import { StateContext } from '@ngxs/store';

describe('TissueLibraryState', () => {
  let state: TissueLibraryState;
  let dataService: MockProxy<FtuDataService>;
  let ctx: MockProxy<StateContext<TissueLibraryModel>>;

  beforeEach(() => {
    TestBed.overrideProvider(FtuDataService, {
      useValue: (dataService = mock()),
    });
    ctx = mock();
    state = TestBed.runInInjectionContext(() => new TissueLibraryState());
    dataService.getTissueLibrary.mockReturnValue(of());
  });

  describe('setActive(ctx)', () => {
    it('should load tissue data into the state', async () => {
      await state.setActive(ctx).subscribe();
      dataService.getTissueLibrary.mockReturnValue(of());

      expect(dataService.getTissueLibrary).toHaveBeenCalledWith();
    });
  });
});
