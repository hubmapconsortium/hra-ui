import { Shallow } from 'shallow-render';
import { ScreenSizeNoticeComponent } from './screen-size-notice.component';

describe('ScreenSizeNoticeComponent', () => {
  let shallow: Shallow<ScreenSizeNoticeComponent>;

  beforeEach(() => {
    shallow = new Shallow(ScreenSizeNoticeComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
