import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { MarkdownModule } from 'ngx-markdown';
import { Shallow } from 'shallow-render';
import { ScreenNoticeBehaviorComponent } from './screen-notice-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('ScreenNoticeBehaviorComponent', () => {
  let shallow: Shallow<ScreenNoticeBehaviorComponent>;

  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    shallow = new Shallow(ScreenNoticeBehaviorComponent)
      .import(MarkdownModule.forRoot())
      .dontMock(MatDialogModule)
      .mock(MatDialogRef, {
        close: jest.fn(),
      });
  });

  afterEach(() => jest.clearAllMocks());

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('close', () => {
    it('should close the dialog when close is called', async () => {
      const { instance, get } = await shallow.render();
      const dialogRefMock = get(MatDialogRef);
      instance.close();
      expect(dialogRefMock.close).toHaveBeenCalled();
    });
  });
});
