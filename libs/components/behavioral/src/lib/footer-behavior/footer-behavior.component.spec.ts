import { MatDialog } from '@angular/material/dialog';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { mock } from 'jest-mock-extended';
import { Shallow } from 'shallow-render';
import { FooterBehaviorComponent } from './footer-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('FooterBehaviorComponent', () => {
  const dialog = mock<MatDialog>();
  let shallow: Shallow<FooterBehaviorComponent>;

  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    shallow = new Shallow(FooterBehaviorComponent).provideMock({ provide: MatDialog, useValue: dialog });
  });

  afterEach(() => jest.clearAllMocks());

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('contact', () => {
    it('should open the contact modal dialog box', async () => {
      const { instance } = await shallow.render();
      instance.contact();
      expect(dialog.open).toHaveBeenCalled();
    });
  });
});
