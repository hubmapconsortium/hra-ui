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
    expect(title).toHaveTextContent('test title');
  });

  it('should render the description', async () => {
    const description = screen.getByRole('heading', { level: 4 });
    expect(description).toBeInTheDocument();
  });
});
