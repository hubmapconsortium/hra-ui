import { render, screen } from '@testing-library/angular';
import { AppNavButtonComponent } from './app-nav-button.component';

describe('AppsCardComponent', () => {
  beforeEach(async () => {
    await render(AppNavButtonComponent, {
      inputs: {
        icon: 'test.svg',
        tagline: 'Test Title',
        description: 'Test Description',
        link: 'https://www.example.com',
      },
    });
  });

  it('should create and render the card', async () => {
    const cardLink = screen.getByRole('link');
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(cardLink.getAttribute('href')).toBe('https://www.example.com');
  });
});
