import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen, fireEvent, waitFor } from '@testing-library/angular';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { PrivacyPreferencesModalComponent } from './privacy-preferences-modal.component';

describe('PrivacyPreferencesModalComponent', () => {
  const globalProviders = [provideHttpClient(), provideHttpClientTesting()];
  const imports = [MatIconTestingModule];

  const renderComponent = (hasProvidedPreferences = false) =>
    render(PrivacyPreferencesModalComponent, {
      providers: globalProviders,
      imports,
      componentInputs: { hasProvidedPreferences },
    });

  const switchToDetailsTab = async () => {
    fireEvent.click(screen.getByRole('tab', { name: /details/i }));
    await waitFor(() => expect(screen.getByText('Necessary')).toBeInTheDocument());
  };

  describe('Initial', () => {
    it('should create the component', async () => {
      const { fixture } = await renderComponent();
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should display the Human Reference Atlas logo', async () => {
      await renderComponent();
      expect(screen.getByLabelText(/Human Reference Atlas/i)).toBeInTheDocument();
    });

    it('should not show close button when hasProvidedPreferences is false', async () => {
      await renderComponent(false);
      expect(screen.queryByLabelText(/close/i)).not.toBeInTheDocument();
    });

    it('should show close button when hasProvidedPreferences is true', async () => {
      await renderComponent(true);
      expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
    });
  });

  describe('Tabs', () => {
    it('should display both Consent and Details tabs', async () => {
      await renderComponent();
      expect(screen.getByRole('tab', { name: /consent/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /details/i })).toBeInTheDocument();
    });

    it('should switch to Details tab when clicked', async () => {
      await renderComponent();
      await switchToDetailsTab();
      expect(screen.getByText(/Necessary cookies and similar technologies/i)).toBeInTheDocument();
    });
  });

  describe('Cookie Categories', () => {
    beforeEach(async () => {
      await renderComponent();
      await switchToDetailsTab();
    });

    it('should display all four cookie categories', () => {
      ['Necessary', 'Preferences', 'Statistics', 'Marketing'].forEach((category) => {
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });

    it('should display category descriptions', () => {
      expect(screen.getByText(/Necessary cookies and similar technologies make websites usable/i)).toBeInTheDocument();
      expect(screen.getByText(/Preference cookies remember your choices/i)).toBeInTheDocument();
    });
  });

  describe('Expand category', () => {
    beforeEach(async () => {
      await renderComponent();
      await switchToDetailsTab();
    });

    it('should expand category when plus button is clicked', async () => {
      const expandButtons = screen.getAllByRole('button', { name: /expand/i });
      fireEvent.click(expandButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Human Reference Atlas')).toBeInTheDocument();
      });
    });

    it('should change icon from add to remove when expanded', async () => {
      const expandBtn = screen.getAllByRole('button', { name: /expand/i })[0];
      expect(screen.getAllByText('add')[0]).toBeInTheDocument();

      fireEvent.click(expandBtn);

      await waitFor(() => {
        expect(screen.getAllByText('remove')[0]).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: /collapse/i })[0]).toBeInTheDocument();
      });
    });

    it('should display privacy details for Preferences category', async () => {
      fireEvent.click(screen.getByRole('button', { name: /expand preferences/i }));

      await waitFor(() => {
        expect(screen.getByText(/We do not use cookies or technology of this type/i)).toBeInTheDocument();
      });
    });

    it('should display provider link with correct href', async () => {
      fireEvent.click(screen.getByRole('button', { name: /expand marketing/i }));

      await waitFor(() => {
        const link = screen.getByText(/Learn more about this provider/i).closest('a');
        expect(link).toHaveAttribute('href', 'https://policies.google.com/privacy');
      });
    });
  });

  describe('Footer buttons', () => {
    it('should display all footer buttons', async () => {
      await renderComponent();

      expect(screen.getByRole('button', { name: /allow necessary only/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /customize/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /allow all/i })).toBeInTheDocument();
    });

    it('should show Customize button on Consent tab', async () => {
      await renderComponent();

      expect(screen.getByRole('button', { name: /customize/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /allow selection/i })).not.toBeInTheDocument();
    });

    it('should show Allow selection button on Details tab', async () => {
      await renderComponent();
      await switchToDetailsTab();

      expect(await screen.findByRole('button', { name: /allow selection/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /customize/i })).not.toBeInTheDocument();
    });

    it('should switch to Details tab when Customize is clicked', async () => {
      await renderComponent();

      fireEvent.click(screen.getByRole('button', { name: /customize/i }));

      await waitFor(() => {
        expect(screen.getByText('Necessary')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /allow selection/i })).toBeInTheDocument();
      });
    });
  });

  describe('Button Actions', () => {
    it('should emit allowNecessaryOnly when button is clicked', async () => {
      const { fixture } = await renderComponent();

      fireEvent.click(screen.getByRole('button', { name: /allow necessary only/i }));

      expect(fixture.componentInstance.allowNecessaryOnly()).toBe(true);
    });

    it('should disable all non-required categories when Allow necessary only is clicked', async () => {
      const { fixture } = await renderComponent();

      fireEvent.click(screen.getByRole('button', { name: /allow necessary only/i }));

      const categories = fixture.componentInstance.categories();
      expect(categories[0].enabled).toBe(true);
      expect(categories.slice(1).every((cat) => !cat.enabled)).toBe(true);
    });

    it('should enable all categories when Allow all is clicked', async () => {
      const { fixture } = await renderComponent();

      fireEvent.click(screen.getByRole('button', { name: /allow all/i }));

      const categories = fixture.componentInstance.categories();
      expect(categories.every((cat) => cat.enabled)).toBe(true);
    });

    it('should emit allowSelection when button is clicked', async () => {
      const { fixture } = await renderComponent();
      await switchToDetailsTab();

      const button = await screen.findByRole('button', { name: /allow selection/i });
      fireEvent.click(button);

      expect(fixture.componentInstance.allowSelection()).toBe(true);
    });

    it('should emit close when close button is clicked', async () => {
      const { fixture } = await renderComponent(true);

      fireEvent.click(screen.getByLabelText(/close/i));

      expect(fixture.componentInstance.close()).toBe(true);
    });
  });
});
