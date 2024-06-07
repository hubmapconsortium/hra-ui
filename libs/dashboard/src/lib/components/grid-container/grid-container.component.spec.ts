import { DashboardComponentRegistryService } from '../../dashboard/dashboard-registry.service';
import { GridContainerComponent } from './grid-container.component';
import { render, screen } from '@testing-library/angular';

describe('GridContainerComponent', () => {
  const testGridContainerData = {
    type: 'GridContainer',
    columns: 2,
    items: [{ type: 'ImageContainer', imageUrl: 'https://example.com/image1.jpg' }],
  };

  beforeEach(async () => {
    await render(GridContainerComponent, {
      componentInputs: { spec: testGridContainerData },
      componentProviders: [
        {
          provide: DashboardComponentRegistryService,
        },
      ],
    });
  });

  it('should create a grid container', () => {
    // const container = screen.findByRole('div');
    // expect(container).toBeInTheDocument();

    expect(screen.getByRole('container')).toHaveStyle({
      gridTemplateColumns: `repeat(2, 1fr)`,
    });
  });
});
