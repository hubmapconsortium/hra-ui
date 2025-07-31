import { Shallow } from 'shallow-render';
import { ScreenSizeNoticeComponent } from './screen-size-notice.component';
import { LinkDirective } from '@hra-ui/cdk';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';

jest.mock('@hra-ui/cdk/injectors');
jest.mocked(selectQuerySnapshot).mockReturnValue(() => undefined as never);

describe('ScreenSizeNoticeComponent', () => {
  let shallow: Shallow<ScreenSizeNoticeComponent>;

  beforeEach(() => {
    shallow = new Shallow(ScreenSizeNoticeComponent).dontMock(LinkDirective);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
