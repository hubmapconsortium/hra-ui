import { MatDialogRef } from '@angular/material/dialog';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { DialogService } from '@hra-ui/design-system/dialog';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { ScreenNoticeBehaviorComponent } from './screen-notice-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('ScreenNoticeBehaviorComponent', () => {
  let shallow: Shallow<ScreenNoticeBehaviorComponent>;
  let mockDialogRef: jest.Mocked<MatDialogRef<any>>;
  let mockDialogService: jest.Mocked<DialogService>;
  let mockSetScreenNoticeShown: jest.Mock;

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
      afterClosed: jest.fn().mockReturnValue(of(undefined)),
    } as any;

    mockDialogService = {
      openNotice: jest.fn().mockReturnValue(mockDialogRef),
    } as any;

    mockSetScreenNoticeShown = jest.fn();

    jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn().mockReturnValue('Test content'));
    jest.mocked(dispatch).mockReturnValue(mockSetScreenNoticeShown);

    shallow = new Shallow(ScreenNoticeBehaviorComponent).mock(DialogService, mockDialogService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should open screen notice dialog on init', async () => {
    const { instance } = await shallow.render();

    expect(mockDialogService.openNotice).toHaveBeenCalledWith('Screen Size Notice', 'Test content', {
      label: 'Go to HRA Portal',
      callback: expect.any(Function),
    });
  });

  it('should use default content when content is not available', async () => {
    jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn().mockReturnValue(null));

    await shallow.render();

    expect(mockDialogService.openNotice).toHaveBeenCalledWith(
      'Screen Size Notice',
      'Please use a larger screen for the best experience.',
      {
        label: 'Go to HRA Portal',
        callback: expect.any(Function),
      },
    );
  });

  it('should set screen notice as shown when dialog closes', async () => {
    await shallow.render();

    expect(mockDialogRef.afterClosed).toHaveBeenCalled();
    expect(mockSetScreenNoticeShown).toHaveBeenCalled();
  });

  it('should handle dialog reference being undefined when navigating to portal', async () => {
    const originalOpen = window.open;
    window.open = jest.fn();

    const { instance } = await shallow.render();
    (instance as any).dialogRef = undefined;

    expect(() => (instance as any).navigateToPortal()).not.toThrow();
    expect(window.open).toHaveBeenCalled();

    window.open = originalOpen;
  });
});
