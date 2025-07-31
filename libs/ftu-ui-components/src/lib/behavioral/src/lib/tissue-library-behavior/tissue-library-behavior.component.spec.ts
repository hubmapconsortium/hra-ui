import { dispatch, select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { Subject } from 'rxjs';
import { Shallow } from 'shallow-render';
import { TissueLibraryBehaviorComponent } from './tissue-library-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('TissueLibraryBehaviorComponent', () => {
  const urlSubject = new Subject<string | undefined>();
  let shallow: Shallow<TissueLibraryBehaviorComponent>;

  jest.mocked(select$).mockReturnValue(urlSubject);
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
    shallow = new Shallow(TissueLibraryBehaviorComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should clear the selection when the medical illustration url becomes undefined', async () => {
    const { instance } = await shallow.render();
    instance.selected.set({} as never);
    urlSubject.next(undefined);
    expect(instance.selected()).toBeUndefined();
  });
});
