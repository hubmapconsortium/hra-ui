import { ConsentService } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { GoogleMapsComponent } from './google-maps.component';

describe('GoogleMapsComponent', () => {
  let mockConsentService: {
    isCategoryEnabled: jest.Mock;
    isEventEnabled: jest.Mock;
    categories: jest.Mock;
  };

  let mockPrivacyService: {
    openPrivacyPreferences: jest.Mock;
  };

  const defaultInputs = {
    mapsUrl: 'https://maps.google.com/test',
    alternateUrl: 'https://maps.google.com/alternate',
  };

  async function setup() {
    return render(GoogleMapsComponent, {
      inputs: defaultInputs,
      providers: [
        { provide: ConsentService, useValue: mockConsentService },
        { provide: PrivacyPreferencesService, useValue: mockPrivacyService },
      ],
    });
  }

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

  it('should render', async () => {
    mockConsentService.isCategoryEnabled.mockReturnValue(false);
    await expect(setup()).resolves.toBeTruthy();
  });

  it('should show iframe when marketing cookies are enabled', async () => {
    mockConsentService.isCategoryEnabled.mockImplementation(
      (category: EventCategory) => category === EventCategory.Marketing,
    );

    await setup();

    const iframe = document.querySelector('iframe');
    expect(iframe).toBeTruthy();
  });

  it('should show placeholder when marketing cookies are disabled', async () => {
    mockConsentService.isCategoryEnabled.mockReturnValue(false);

    await setup();

    const iframe = document.querySelector('iframe');
    expect(iframe).toBeFalsy();

    const enableCookiesText = screen.getByText(/Enable cookies/i);
    expect(enableCookiesText).toBeTruthy();
  });

  it('should open privacy preferences when "Enable cookies" link is clicked', async () => {
    mockConsentService.isCategoryEnabled.mockReturnValue(false);

    await setup();

    const enableCookiesLink = screen.getByText(/Enable cookies/i);
    await userEvent.click(enableCookiesLink);

    expect(mockPrivacyService.openPrivacyPreferences).toHaveBeenCalledWith('consent');
  });
});
