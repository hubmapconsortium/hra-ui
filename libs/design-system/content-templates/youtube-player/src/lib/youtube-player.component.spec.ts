import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ConsentService } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import { HraYoutubePlayerComponent } from './youtube-player.component';

describe('HraYoutubePlayerComponent', () => {
  const TEST_VIDEO_ID = 'lYRNWAPxyqM';
  const TEST_LABEL = 'Test video';

  let mockConsentService: {
    isCategoryEnabled: jest.Mock;
    isEventEnabled: jest.Mock;
    categories: jest.Mock;
  };

  let mockPrivacyService: {
    openPrivacyPreferences: jest.Mock;
  };

  beforeEach(() => {
    mockConsentService = {
      isCategoryEnabled: jest.fn(),
      isEventEnabled: jest.fn(),
      categories: jest.fn(),
    };

    mockPrivacyService = {
      openPrivacyPreferences: jest.fn(),
    };
  });

  const renderComponent = async (videoId = TEST_VIDEO_ID, label = TEST_LABEL) => {
    return render(HraYoutubePlayerComponent, {
      inputs: {
        videoId,
        label,
      },
      providers: [
        { provide: ConsentService, useValue: mockConsentService },
        { provide: PrivacyPreferencesService, useValue: mockPrivacyService },
      ],
    });
  };

  it('should render', async () => {
    mockConsentService.isCategoryEnabled.mockReturnValue(false);

    const promise = renderComponent();
    await expect(promise).resolves.toBeTruthy();
  });

  describe('when marketing cookies are enabled', () => {
    beforeEach(() => {
      mockConsentService.isCategoryEnabled.mockImplementation(
        (category: EventCategory) => category === EventCategory.Marketing,
      );
    });

    it('should show YouTube player', async () => {
      await renderComponent();

      const youtubePlayer = document.querySelector('youtube-player');
      expect(youtubePlayer).toBeTruthy();
    });
  });

  describe('when marketing cookies are disabled', () => {
    beforeEach(() => {
      mockConsentService.isCategoryEnabled.mockReturnValue(false);
    });

    it('should show thumbnail fallback', async () => {
      await renderComponent();

      const thumbnail = document.querySelector('.youtube-thumbnail-container');
      expect(thumbnail).toBeTruthy();

      const enableCookiesText = screen.getByText(/Enable cookies/i);
      expect(enableCookiesText).toBeTruthy();
    });

    it('should use YouTube default thumbnail when no custom URL provided', async () => {
      await renderComponent(TEST_VIDEO_ID);

      const thumbnailImage = document.querySelector('.thumbnail-image') as HTMLImageElement;
      expect(thumbnailImage?.src).toContain(`https://img.youtube.com/vi/${TEST_VIDEO_ID}/sddefault.jpg`);
    });

    it('should open privacy preferences when "Enable cookies" link is clicked', async () => {
      await renderComponent();

      const enableCookiesLink = screen.getByText(/Enable cookies/i);
      await userEvent.click(enableCookiesLink);

      expect(mockPrivacyService.openPrivacyPreferences).toHaveBeenCalledWith('consent');
    });
  });
});
