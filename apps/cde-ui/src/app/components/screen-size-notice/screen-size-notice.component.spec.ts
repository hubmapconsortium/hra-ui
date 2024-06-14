import { render } from '@testing-library/angular';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';

import { ScreenSizeNoticeComponent, ScreenSizeNoticeDetectorOptions } from './screen-size-notice.component';

describe('ScreenSizeNoticeComponent', () => {
  const screenSizeOptions: ScreenSizeNoticeDetectorOptions = {
    width: 100,
    height: 100,
  };

  beforeEach(async () => {
    await render(ScreenSizeNoticeComponent);
  });

  it('should return empty subscription if screen size notice has been shown', () => {
    localStorage.setItem('cde-screen-size-notice', 'true');
    const createDetectorSpy = jest.spyOn(ScreenSizeNoticeComponent, 'createDetector');
    ScreenSizeNoticeComponent.createDetector(screenSizeOptions);
    expect(createDetectorSpy).toHaveReturnedWith(EMPTY_SUBSCRIPTION);
  });
});
