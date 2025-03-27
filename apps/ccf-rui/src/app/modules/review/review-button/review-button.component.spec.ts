import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
import { mock } from 'jest-mock-extended';
import { Subject } from 'rxjs';
import { Shallow } from 'shallow-render';
import { PageState } from '../../../core/store/page/page.state';
import { ReviewButtonComponent } from './review-button.component';
import { ReviewButtonModule } from './review-button.module';

describe('ReviewButtonComponent', () => {
  let shallow: Shallow<ReviewButtonComponent>;
  let afterClosedObservable: Subject<boolean>;
  const emptyMetaData = [{ value: '' }, { value: '' }, { value: '' }];
  const metaData = [{ value: 'First Name' }, { value: 'Last Name' }, { value: 'Organ' }];

  beforeEach(() => {
    const mockDialog = mock<MatDialogRef<unknown, boolean>>();
    afterClosedObservable = new Subject();
    mockDialog.afterClosed.mockReturnValue(afterClosedObservable);

    shallow = new Shallow(ReviewButtonComponent, ReviewButtonModule)
      .dontMock(MicroTooltipDirective)
      .mock(MatDialog, {
        open(): MatDialogRef<unknown, boolean> {
          return mockDialog;
        },
      })
      .mock(PageState, { patchState: jest.fn(), registrationStarted: jest.fn() });
  });

  it('should launch the review dialog if the registration is valid', async () => {
    const { find, instance } = await shallow.render({ bind: { userValid: true, metaData } });
    const spy = jest.spyOn(instance, 'launchReviewModal');
    find('.review-button').triggerEventHandler('click', '');
    expect(spy).toHaveBeenCalled();
  });

  it('should not launch the review dialog if the registration is not valid', async () => {
    const { find, instance } = await shallow.render({ bind: { userValid: false, metaData: emptyMetaData } });
    const spy = jest.spyOn(instance, 'launchReviewModal');
    find('.review-button').triggerEventHandler('click', '');
    expect(spy).not.toHaveBeenCalled();
  });

  it('launchReviewModal opens the modal', async () => {
    const { instance, inject } = await shallow.render();
    instance.launchReviewModal();
    expect(inject(MatDialog).open).toHaveBeenCalled();
  });

  it('should emit the event when the modal is closed via the download button', async () => {
    const { instance, outputs } = await shallow.render();
    instance.launchReviewModal();
    afterClosedObservable.next(true);

    expect(outputs.registerData.emit).toHaveBeenCalled();
  });

  it('should not emit the event when the modal is closed not via the download button', async () => {
    const { instance, outputs } = await shallow.render();
    instance.launchReviewModal();
    afterClosedObservable.next(false);

    expect(outputs.registerData.emit).not.toHaveBeenCalled();
  });

  it('prevents default', async () => {
    const mockEvent = {
      preventDefault: () => undefined,
    } as MouseEvent;
    const { instance } = await shallow.render();
    const spy = jest.spyOn(mockEvent, 'preventDefault');
    instance.registerButtonClick(mockEvent);
    expect(spy).toHaveBeenCalled();
  });
});
