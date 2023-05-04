import { select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { EMPTY } from 'rxjs';
import { Shallow } from 'shallow-render';
import { TissueLibraryBehaviorComponent } from './tissue-library-behavior.component';
import { Store } from '@ngxs/store';
import { MedicalIllustrationSelectors } from '@hra-ui/state';

jest.mock('@hra-ui/cdk/injectors');

describe('TissueLibraryBehaviorComponent', () => {
  let shallow: Shallow<TissueLibraryBehaviorComponent>;
  let mockSelect$: jest.Mock;

  jest.mocked(selectSnapshot).mockReturnValue(jest.fn().mockReturnValue([]));
  jest.mocked(select$).mockReturnValue(EMPTY);

  beforeEach(async () => {
    mockSelect$ = jest.fn(() => EMPTY);
    jest.spyOn(Store.prototype, 'select').mockImplementation(mockSelect$);
    shallow = new Shallow(TissueLibraryBehaviorComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should subscribe to the correct observable in constructor', () => {
    expect(mockSelect$).toHaveBeenCalledWith(MedicalIllustrationSelectors.url);
  });
});
