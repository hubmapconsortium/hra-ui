import { render, screen } from '@testing-library/angular';
import { AppsCardComponent } from './apps-card.component';

describe('AppsCardComponent', () => {
  beforeEach(async () => {
    await render(AppsCardComponent, {
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
