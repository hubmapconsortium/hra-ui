import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { Shallow } from 'shallow-render';
import { ScreenSizeNoticeBehaviorComponent } from './screen-size-notice-behavior.component';
import { StorageId, StorageState } from '@hra-ui/cdk/state';

jest.mock('@hra-ui/cdk/injectors');
jest.mock('@hra-ui/cdk/state');

describe('ScreenSizeNoticeBehaviorComponent', () => {
  let shallow: Shallow<ScreenSizeNoticeBehaviorComponent>;

  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    shallow = new Shallow(ScreenSizeNoticeBehaviorComponent);
  });

  afterEach(() => jest.clearAllMocks());

  // it('should create', async () => {
  //   await expect(shallow.render()).resolves.toBeDefined();
  // });

  it('should test resize event for screen width > 480 ', async () => {
    const { instance, inject } = await shallow.render();
    window.innerWidth = 481;
    instance.onResize(null);
    expect(instance.screenResized).toBe(false);
  });

  it('should test resize event for screen width < 480 ', async () => {
    const { instance, inject } = await shallow.render();
    window.innerWidth = 479;
    instance.onResize(null);
    expect(StorageState.getStorage(StorageId.Local).getItem('screenSizeProceedClick')).toBe('');
    expect(instance.screenResized).toBe(true);
    instance.proceedClick();
    expect(StorageState.getStorage(StorageId.Local).getItem('screenSizeProceedClick')).toBe('clicked');
    instance.onResize(null);
    expect(instance.screenResized).toBe(false);
  });
});
