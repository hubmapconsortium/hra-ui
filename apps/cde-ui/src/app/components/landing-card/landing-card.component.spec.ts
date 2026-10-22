import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import { LandingCard, LandingCardComponent } from './landing-card.component';

describe('LandingCardComponent', () => {
  const MOCK_CARD: LandingCard = {
    title: 'Explore 2D data',
    description: 'Example CyCIF data from the Sorger Lab.',
    image: 'assets/examples/2d-data-intestine.png',
    action: { label: 'Open example', url: '/example/0' },
  };

  async function setup(card: LandingCard = MOCK_CARD) {
    return render(LandingCardComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting(), provideIcons(), provideRouter([])],
      inputs: { card },
    });
  }

  it('should render the title as a heading link to the card destination', async () => {
    await setup();

    const heading = screen.getByRole('heading', { level: 3, name: 'Explore 2D data' });
    const link = screen.getByRole('link', { name: 'Explore 2D data' });
    expect(heading).toContainElement(link);
    expect(link).toHaveAttribute('href', '/example/0');
    expect(link).not.toHaveAttribute('target');
  });

  it('should render the description', async () => {
    await setup();

    expect(screen.getByText('Example CyCIF data from the Sorger Lab.')).toBeInTheDocument();
  });

  it('should omit the description when it is not provided', async () => {
    const { container } = await setup({ ...MOCK_CARD, description: undefined });

    expect(container.querySelector('.description')).toBeNull();
  });

  it('should render an icon in place of a missing image', async () => {
    const { container } = await setup({ ...MOCK_CARD, image: undefined, icon: { fontIcon: 'code' } });

    expect(container.querySelector('.image')).toBeNull();
    expect(container.querySelector('.icon mat-icon')).toHaveAttribute('data-mat-icon-name', 'code');
  });

  it('should hide the visual call to action from assistive technology', async () => {
    const { container } = await setup();

    const cta = container.querySelector('.cta');
    expect(cta).toHaveTextContent('Open example');
    expect(cta).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('should open an external card destination in a new tab', async () => {
    const { container } = await setup({
      ...MOCK_CARD,
      action: { label: 'Go to GitHub', url: 'https://example.com/repo', external: true },
    });

    const link = screen.getByRole('link', { name: 'Explore 2D data' });
    expect(link).toHaveAttribute('href', 'https://example.com/repo');
    expect(link).toHaveAttribute('target', '_blank');
    expect(container.querySelector('.cta-icon')).toHaveTextContent('open_in_new');
  });

  it('should render an internal secondary link in the same tab', async () => {
    const { container } = await setup({
      ...MOCK_CARD,
      secondaryAction: { label: 'Dataset details', url: '/gallery/test' },
    });

    const link = screen.getByRole('link', { name: 'Dataset details' });
    expect(link).toHaveAttribute('href', '/gallery/test');
    expect(link).not.toHaveAttribute('target');
    expect(container.querySelector('.link-icon')).toBeNull();
  });

  it('should open an external secondary link in a new tab', async () => {
    const { container } = await setup({
      ...MOCK_CARD,
      secondaryAction: { label: 'Read publication', url: 'https://example.com/publication', external: true },
    });

    const link = screen.getByRole('link', { name: 'Read publication' });
    expect(link).toHaveAttribute('href', 'https://example.com/publication');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(container.querySelector('.link-icon')).toHaveTextContent('open_in_new');
  });
});
