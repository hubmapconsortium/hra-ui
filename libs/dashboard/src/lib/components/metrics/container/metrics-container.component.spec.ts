import { render, screen } from '@testing-library/angular';
import { MetricsContainerComponent } from './metrics-container.component';

describe('MetricsContainerComponent', () => {
  const mockSpec = {
    type: 'MetricsContainer',
    items: [
      {
        title: 'Card 1',
        tooltip: 'tooltip 1',
        items: [
          { label: 'Metric 1', count: 30 },
          { label: 'Metric 2', count: 40 },
          { label: 'Metric 3', count: 50 },
          { label: 'Metric 4', count: 60 },
        ],
      },
      {
        title: 'Card 2',
        tooltip: 'tooltip 2',
        items: [
          { label: 'Metric 5', count: 10 },
          { label: 'Metric 6', count: 20 },
        ],
      },
      {
        title: 'Card 3',
        tooltip: 'tooltip 3',
        items: [
          { label: 'Metric 7', count: 10 },
          { label: 'Metric 8', count: 20 },
        ],
      },
    ],
  };

  it('should render the component', async () => {
    await render(MetricsContainerComponent, {
      componentInputs: { spec: mockSpec },
    });

    const titleCards = screen.getAllByTestId('title-card');
    expect(titleCards).toHaveLength(3);

    const metricsItems = screen.getAllByTestId('metrics-item');
    expect(metricsItems).toHaveLength(8);
  });

  it('should apply multi-column class when there are 4 or more metrics', async () => {
    await render(MetricsContainerComponent, {
      componentInputs: { spec: mockSpec },
    });

    const multiColumnCard = screen.getAllByTestId('title-card');
    expect(multiColumnCard[0]).toHaveClass('span-columns');
    expect(multiColumnCard[1]).not.toHaveClass('span-columns');
  });
});
