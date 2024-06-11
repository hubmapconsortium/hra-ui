import { DashboardIndexComponent } from './dashboard-index.component';
import { RouterModule } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { z } from 'zod';
import { LONG_CARD_DEF } from '../long-card/long-card.component';

describe('DashboardIndexComponent', () => {
  const testData: z.infer<typeof LONG_CARD_DEF> = {
    title: 'test title',
    route: 'test route',
    background: 'test bg',
  };
  beforeEach(async () => {
    await render(DashboardIndexComponent, {
      providers: [RouterModule],
      componentInputs: { spec: testData },
    });
  });
  it('should render heading', () => {
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Explore the coverage and quality of the Human Referance Atlas');
  });

  it('should render the description', async () => {
    const description = screen.getByText(
      /The Human Reference Atlas \(HRA\) is constructed and used by experts from many fields of science from around the globe\./i,
    );
    expect(description).toBeInTheDocument();
  });
});
