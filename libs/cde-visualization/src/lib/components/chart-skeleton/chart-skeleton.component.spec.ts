import { render } from '@testing-library/angular';
import { ChartSkeletonComponent } from './chart-skeleton.component';

describe('ChartSkeletonComponent', () => {
  it('should show a rectangle skeleton', async () => {
    const { container } = await render(ChartSkeletonComponent);

    expect(container.querySelector('cde-skeleton')).toHaveAttribute('data-shape', 'rect');
  });
});
