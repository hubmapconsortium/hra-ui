import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { render } from '@testing-library/angular';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { PrivacyPreferencesComponent, PrivacyPreferencesData } from './privacy-preferences.component';

describe('PrivacyPreferencesComponent', () => {
  const mockCategories = {
    [EventCategory.Necessary]: true,
    [EventCategory.Statistics]: false,
    [EventCategory.Preferences]: false,
    [EventCategory.Marketing]: false,
  };

  it('should render', async () => {
    const data: PrivacyPreferencesData = {
      categories: mockCategories,
    };

    const promise = render(PrivacyPreferencesComponent, {
      providers: [{ provide: MAT_DIALOG_DATA, useValue: data }, provideHttpClient(), provideHttpClientTesting()],
    });
    await expect(promise).resolves.toBeTruthy();
  });

  it('should render with manage tab when specified', async () => {
    const data: PrivacyPreferencesData = {
      categories: mockCategories,
      tab: 'manage',
    };

    const promise = render(PrivacyPreferencesComponent, {
      providers: [{ provide: MAT_DIALOG_DATA, useValue: data }, provideHttpClient(), provideHttpClientTesting()],
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
