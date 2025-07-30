import { dispatch, select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { Subject } from 'rxjs';
import { Shallow } from 'shallow-render';
import { TissueLibraryBehaviorComponent } from './tissue-library-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('TissueLibraryBehaviorComponent', () => {
  // TODO: Uncomment and implement this test once the component is properly implemented
  // const TISSUES = { test: {} };
  const urlSubject = new Subject<string | undefined>();
  let shallow: Shallow<TissueLibraryBehaviorComponent>;

  jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
  jest.mocked(select$).mockReturnValue(urlSubject);
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    shallow = new Shallow(TissueLibraryBehaviorComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  // TODO: pass this test once the component is properly implemented
  // it('should set the current selection when it changes', async () => {
  //   jest.mocked(selectSnapshot).mockReturnValue(jest.fn().mockReturnValue(TISSUES));
  //   const { instance } = await shallow.render();
  //   urlSubject.next('test');
  //   expect(instance.selected).toBe(TISSUES.test);
  // });

  it('should clear the selection when the medical illustration url becomes undefined', async () => {
    jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
    const { instance } = await shallow.render();
    instance.selected = {} as never;
    urlSubject.next(undefined);
    expect(instance.selected).toBeUndefined();
  });
});
