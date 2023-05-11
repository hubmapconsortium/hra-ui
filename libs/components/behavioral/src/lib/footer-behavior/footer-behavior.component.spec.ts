import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { dispatch, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { MarkdownModule } from 'ngx-markdown';
import { Shallow } from 'shallow-render';
import { FooterBehaviorComponent } from './footer-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('FooterBehaviorComponent', () => {
  let shallow: Shallow<FooterBehaviorComponent>;

  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    shallow = new Shallow(FooterBehaviorComponent).import(MarkdownModule.forRoot()).dontMock(MatDialogModule);
  });

  afterEach(() => jest.clearAllMocks());

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('contact', () => {
    it('should open the contact modal dialog box', async () => {
      const { instance, inject } = await shallow.render();
      const spy = jest.spyOn(inject(MatDialog), 'open');
      instance.contact();
      expect(spy).toHaveBeenCalled();
    });
  });
});
