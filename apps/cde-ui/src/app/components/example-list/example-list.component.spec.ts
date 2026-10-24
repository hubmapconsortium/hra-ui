import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import { ExampleListComponent, LandingExample } from './example-list.component';

describe('ExampleListComponent', () => {
  const MOCK_EXAMPLES: LandingExample[] = [
    { title: 'Example A', description: 'Details A', credit: 'Lab A', image: 'assets/a.png', url: '/example/0' },
    { title: 'Example B', description: 'Details B', image: 'assets/b.png', url: '/example/1' },
  ];

  async function setup() {
    return render(ExampleListComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting(), provideIcons(), provideRouter([])],
      inputs: { examples: MOCK_EXAMPLES },
    });
  }

  it('should render a row for each example', async () => {
    await setup();

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('should link each whole row to its example', async () => {
    await setup();

    const link = screen.getByRole('link', { name: /Example A/ });
    expect(link).toHaveAttribute('href', '/example/0');
    expect(link).toHaveTextContent('Details A');
    expect(screen.getByRole('link', { name: /Example B/ })).toHaveAttribute('href', '/example/1');
  });

  it('should ripple each row when pressed', async () => {
    await setup();

    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveClass('mat-ripple');
    }
  });

  it('should show the data credit only when provided', async () => {
    const { container } = await setup();

    const credits = container.querySelectorAll('.credit');
    expect(credits).toHaveLength(1);
    expect(credits[0]).toHaveTextContent('Lab A');
  });
});
