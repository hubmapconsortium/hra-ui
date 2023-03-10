import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { mock } from 'jest-mock-extended';
import { Shallow } from 'shallow-render';
import { ContactBehaviorComponent } from './contact-behavior.component';

describe('ContactBehaviorComponent', () => {
  const testEmail = 'example@domain.com';
  const testContactData = {
    email: testEmail,
    subject: 'Test Subject',
    message: 'Test Message',
  };

  const selfRef = mock<MatDialogRef<void>>();
  const postRef = mock<MatDialogRef<void>>();
  const dialog = mock<MatDialog>();
  dialog.open.mockReturnValue(postRef);

  let shallow: Shallow<ContactBehaviorComponent>;

  beforeEach(() => {
    shallow = new Shallow(ContactBehaviorComponent)
      .dontMock(OverlayModule)
      .provideMock({ provide: Store, useValue: mock() })
      .provideMock({ provide: MatDialog, useValue: dialog });
  });

  afterEach(() => jest.clearAllMocks());

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('submit', () => {
    it('should submit the message and open a dialog of acknowledgement', async () => {
      const { instance } = await shallow.provideMock({ provide: MatDialogRef, useValue: selfRef }).render();
      instance.submit(testContactData);
      expect(dialog.open).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('should close self if inside a dialog', async () => {
      const { instance } = await shallow.provideMock({ provide: MatDialogRef, useValue: selfRef }).render();
      instance.close();
      expect(selfRef.close).toHaveBeenCalled();
    });

    it('should close the post dialog if open', async () => {
      const { instance } = await shallow.render();
      instance.submit(testContactData);
      instance.close();
      expect(postRef.close).toHaveBeenCalled();
    });

    it('should do nothing if not inside a dialog and post is not open', async () => {
      const { instance } = await shallow.render();
      instance.close();
      expect(selfRef.close).not.toHaveBeenCalled();
      expect(postRef.close).not.toHaveBeenCalled();
    });
  });
});
