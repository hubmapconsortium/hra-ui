import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import { LandingCard } from '../../components/landing-card/landing-card.component';
import { LandingPageComponent } from './landing-page.component';

jest.mock('vega-embed', () => ({ default: jest.fn() }));

describe('LandingPageComponent', () => {
  const providers = [provideHttpClient(), provideHttpClientTesting(), provideIcons(), provideRouter([])];

  const MOCK_CARDS: LandingCard[] = [
    {
      title: 'Explore 2D Data',
      image: '',
      action: { label: 'Explore in app', url: '/example/0' },
    },
    {
      title: 'Explore 3D Data',
      image: '',
      action: { label: 'Explore in app', url: '/example/1' },
    },
    {
      title: 'Create a Visualization',
      image: '',
      action: { label: 'Create visualizations', url: '/create' },
    },
  ];

  async function setup() {
    return render(LandingPageComponent, {
      providers,
      inputs: { cards: MOCK_CARDS },
    });
  }

  it('should render the hero heading and calls to action', async () => {
    await setup();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Visualize and quantify cell distances' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Create a visualization/ })).toHaveAttribute('href', '/create');
    expect(screen.getByRole('link', { name: /Explore the gallery/ })).toHaveAttribute('href', '/gallery');
  });

  it('should render a card for each entry', async () => {
    await setup();

    expect(screen.getByRole('heading', { level: 2, name: 'Get started' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Explore 2D Data' })).toHaveAttribute('href', '/example/0');
    expect(screen.getByRole('link', { name: 'Explore 3D Data' })).toHaveAttribute('href', '/example/1');
    expect(screen.getByRole('link', { name: 'Create a Visualization' })).toHaveAttribute('href', '/create');
  });
});
