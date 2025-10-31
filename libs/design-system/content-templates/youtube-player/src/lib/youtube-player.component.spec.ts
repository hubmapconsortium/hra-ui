import { render, screen } from '@testing-library/angular';
import { ConsentService } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import { HraYoutubePlayerComponent } from './youtube-player.component';

describe('HraYoutubePlayerComponent', () => {
  const mockConsentService = {
    isCategoryEnabled: jest.fn(),
    categories: jest.fn(),
  };

  const mockPrivacyService = {
    openPrivacyPreferences: jest.fn(),
  };

  it('should render', async () => {
    mockConsentService.isCategoryEnabled.mockReturnValue(false);

    const promise = render(HraYoutubePlayerComponent, {
      inputs: {
        videoId: 'lYRNWAPxyqM',
      },
      providers: [
        { provide: ConsentService, useValue: mockConsentService },
        { provide: PrivacyPreferencesService, useValue: mockPrivacyService },
      ],
    });
    await expect(promise).resolves.toBeTruthy();
  });

  it('should show YouTube player when marketing cookies are enabled', async () => {
    mockConsentService.isCategoryEnabled.mockImplementation(
      (category: EventCategory) => category === EventCategory.Marketing,
    );

    await render(HraYoutubePlayerComponent, {
      inputs: {
        videoId: 'lYRNWAPxyqM',
      },
      providers: [
        { provide: ConsentService, useValue: mockConsentService },
        { provide: PrivacyPreferencesService, useValue: mockPrivacyService },
      ],
    });

    const youtubePlayer = document.querySelector('youtube-player');
    expect(youtubePlayer).toBeTruthy();
  });

  it('should show thumbnail fallback when marketing cookies are disabled', async () => {
    mockConsentService.isCategoryEnabled.mockReturnValue(false);

    await render(HraYoutubePlayerComponent, {
      inputs: {
        videoId: 'lYRNWAPxyqM',
      },
      providers: [
        { provide: ConsentService, useValue: mockConsentService },
        { provide: PrivacyPreferencesService, useValue: mockPrivacyService },
      ],
    });

    const thumbnail = document.querySelector('.youtube-thumbnail-container');
    expect(thumbnail).toBeTruthy();

    const enableCookiesText = screen.getByText(/Enable cookies/i);
    expect(enableCookiesText).toBeTruthy();
  });

  it('should use YouTube default thumbnail when no custom URL provided', async () => {
    mockConsentService.isCategoryEnabled.mockReturnValue(false);
    const videoId = 'lYRNWAPxyqM';

    await render(HraYoutubePlayerComponent, {
      inputs: {
        videoId,
      },
      providers: [
        { provide: ConsentService, useValue: mockConsentService },
        { provide: PrivacyPreferencesService, useValue: mockPrivacyService },
      ],
    });

    const thumbnailImage = document.querySelector('.thumbnail-image') as HTMLImageElement;
    expect(thumbnailImage?.src).toContain(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
  });

  // it('should open video in new tab when thumbnail is clicked', async () => {
  //   mockConsentService.isCategoryEnabled.mockReturnValue(false);
  //   const videoId = 'lYRNWAPxyqM';
  //   const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation();

  //   const { click } = await render(HraYoutubePlayerComponent, {
  //     inputs: {
  //       videoId,
  //     },
  //     providers: [
  //       { provide: ConsentService, useValue: mockConsentService },
  //       { provide: PrivacyPreferencesService, useValue: mockPrivacyService },
  //     ],
  //   });

  //   const thumbnail = document.querySelector('.youtube-thumbnail-container') as HTMLElement;
  //   await click(thumbnail);

  //   expect(windowOpenSpy).toHaveBeenCalledWith(
  //     `https://www.youtube.com/watch?v=${videoId}`,
  //     '_blank',
  //     'noopener,noreferrer'
  //   );

  //   windowOpenSpy.mockRestore();
  // });

  // it('should open privacy preferences when "Enable cookies" link is clicked', async () => {
  //   mockConsentService.isCategoryEnabled.mockReturnValue(false);

  //   const { click } = await render(HraYoutubePlayerComponent, {
  //     inputs: {
  //       videoId: 'lYRNWAPxyqM',
  //     },
  //     providers: [
  //       { provide: ConsentService, useValue: mockConsentService },
  //       { provide: PrivacyPreferencesService, useValue: mockPrivacyService },
  //     ],
  //   });

  //   const enableCookiesLink = screen.getByText(/Enable cookies/i);
  //   await click(enableCookiesLink);

  //   expect(mockPrivacyService.openPrivacyPreferences).toHaveBeenCalledWith('consent');
  // });
});
