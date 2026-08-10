import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { PrivacyPreferencesComponent, PrivacyPreferencesData } from './privacy-preferences.component';

describe('PrivacyPreferencesComponent', () => {
  const mockCategories = {
    [EventCategory.Necessary]: true,
    [EventCategory.Statistics]: false,
    [EventCategory.Preferences]: false,
    [EventCategory.Marketing]: false,
  };

  const renderComponent = (tab?: PrivacyPreferencesData['tab']) =>
    render(PrivacyPreferencesComponent, {
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { categories: mockCategories, tab } satisfies PrivacyPreferencesData },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

  it('should render', async () => {
    const { container } = await renderComponent();

    expect(container.querySelector('.header')).toBeInTheDocument();
    expect(container.querySelector('.tab-group')).toBeInTheDocument();
    expect(container.querySelector('.footer-buttons')).toBeInTheDocument();
  });

  it('should render with manage tab when specified', async () => {
    const { container } = await renderComponent('manage');

    expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute('aria-selected', 'true');
    expect(container.querySelector('ng-scrollbar.details')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Allow selection' })).toBeInTheDocument();
  });

  it('should select details and keep the footer actions available when customized', async () => {
    const { container } = await renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'Customize' }));

    await waitFor(() => expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute('aria-selected', 'true'));
    await waitFor(() => expect(container.querySelector('ng-scrollbar.details')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Allow necessary only' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Allow selection' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Allow all' })).toBeInTheDocument();
  });
});
