import { render, screen } from '@testing-library/angular';
import { provideDashboardComponents } from '../../dashboard/dashboard-registry.service';
import { ImageContainerComponent } from '../image-container/image-container.component';
import { GridContainerComponent } from './grid-container.component';

describe('GridContainerComponent', () => {
  const testGridContainerData = {
    type: 'GridContainer',
    columns: 2,
    items: [
      {
        title: 'Test Image Container',
        tooltip: 'test tooltip',
        type: 'ImageContainer',
        imageUrl: 'https://example.com/image1.jpg',
        aspectRatio: '1/4',
      },
    ],
  };

  beforeEach(async () => {
    await render(GridContainerComponent, {
      componentInputs: { spec: testGridContainerData },
      providers: [provideDashboardComponents([ImageContainerComponent])],
    });
  });

  it('should create a grid container', () => {
    expect(screen.getByTestId('grid-container')).toHaveStyle({
      gridTemplateColumns: `repeat(2, 1fr)`,
    });
  });
});
