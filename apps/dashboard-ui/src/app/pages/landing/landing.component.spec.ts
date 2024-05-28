import { render, screen } from '@testing-library/angular';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';

describe('LandingComponent', () => {
  beforeEach(async () => {
    await render(LandingComponent, {
      providers: [RouterModule],
    });
  });
  it('should render title', () => {
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Explore the coverage and quality of the Human Referance Atlas');
  });

  it('should render the description', async () => {
    const description = screen.getByText(
      /The Human Reference Atlas \(HRA\) is constructed and used by experts from many fields of science from around the globe\./i,
    );
    expect(description).toBeInTheDocument();
  });

  it('should render the long cards', async () => {
    const cards = screen.getAllByRole('link');
    expect(cards).toHaveLength(5);
    expect(cards[0]).toHaveTextContent('Data');
    expect(cards[1]).toHaveTextContent('Usage');
    expect(cards[2]).toHaveTextContent('Diversity & Inclusion');
    expect(cards[3]).toHaveTextContent('Publications');
    expect(cards[4]).toHaveTextContent('Experimental Data');
  });
});
