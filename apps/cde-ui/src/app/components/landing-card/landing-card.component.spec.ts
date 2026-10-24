import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import { LandingCard, LandingCardComponent } from './landing-card.component';

describe('LandingCardComponent', () => {
  const MOCK_CARD: LandingCard = {
    title: 'Embed the web component',
    description: 'Add the web component to any web page.',
    icon: { fontIcon: 'code' },
    action: { label: 'Read the guide', url: '/guide' },
  };

  async function setup(card: LandingCard = MOCK_CARD) {
    return render(LandingCardComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting(), provideIcons(), provideRouter([])],
      inputs: { card },
    });
  }

  it('should render the title as a heading link to the card destination', async () => {
    await setup();

    const heading = screen.getByRole('heading', { level: 3, name: 'Embed the web component' });
    const link = screen.getByRole('link', { name: 'Embed the web component' });
    expect(heading).toContainElement(link);
    expect(link).toHaveAttribute('href', '/guide');
    expect(link).not.toHaveAttribute('target');
  });

  it('should ripple the whole card when pressed', async () => {
    const { fixture } = await setup();

    expect(fixture.nativeElement).toHaveClass('mat-ripple');
  });

  it('should render the description', async () => {
    await setup();

    expect(screen.getByText('Add the web component to any web page.')).toBeInTheDocument();
  });

  it('should omit the description when it is not provided', async () => {
    const { container } = await setup({ ...MOCK_CARD, description: undefined });

    expect(container.querySelector('.description')).toBeNull();
  });

  it('should render the icon', async () => {
    const { container } = await setup();

    expect(container.querySelector('.icon mat-icon')).toHaveAttribute('data-mat-icon-name', 'code');
  });

  it('should hide the visual call to action from assistive technology', async () => {
    const { container } = await setup();

    const cta = container.querySelector('.cta');
    expect(cta).toHaveTextContent('Read the guide');
    expect(cta).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('should open an external card destination in a new tab', async () => {
    const { container } = await setup({
      ...MOCK_CARD,
      action: { label: 'Go to GitHub', url: 'https://example.com/repo', external: true },
    });

    const link = screen.getByRole('link', { name: 'Embed the web component' });
    expect(link).toHaveAttribute('href', 'https://example.com/repo');
    expect(link).toHaveAttribute('target', '_blank');
    expect(container.querySelector('.cta-icon')).toHaveTextContent('open_in_new');
  });

  it('should show an arrow for an internal card destination', async () => {
    const { container } = await setup();

    expect(container.querySelector('.cta-icon')).toHaveTextContent('arrow_right_alt');
  });
});
