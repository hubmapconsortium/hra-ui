import { select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { Subject } from 'rxjs';
import { Shallow } from 'shallow-render';
import { TissueLibraryBehaviorComponent } from './tissue-library-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('TissueLibraryBehaviorComponent', () => {
  const TISSUES = { test: {} };
  const urlSubject = new Subject<string | undefined>();
  let shallow: Shallow<TissueLibraryBehaviorComponent>;

  jest.mocked(selectSnapshot).mockReturnValue(jest.fn().mockReturnValue(TISSUES));
  jest.mocked(select$).mockReturnValue(urlSubject);

  beforeEach(async () => {
    shallow = new Shallow(TissueLibraryBehaviorComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should set the current selection when it changes', async () => {
    const { instance } = await shallow.render();
    urlSubject.next('test');
    expect(instance.selected).toBe(TISSUES.test);
  });

  it('should clear the selection when the medical illustration url becomes undefined', async () => {
    const { instance } = await shallow.render();
    instance.selected = {} as never;
    urlSubject.next(undefined);
    expect(instance.selected).toBeUndefined();
  });
});
