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
          { label: 'Metric 1', count: 10 },
          { label: 'Metric 2', count: 20 },
        ],
      },
      {
        title: 'Card 2',
        tooltip: 'tooltip 2',
        items: [
          { label: 'Metric 3', count: 30 },
          { label: 'Metric 4', count: 40 },
          { label: 'Metric 5', count: 50 },
          { label: 'Metric 6', count: 60 },
        ],
      },
    ],
  };

  it('should render the component', async () => {
    await render(MetricsContainerComponent, {
      componentInputs: { spec: mockSpec },
    });

    const titleCards = screen.getAllByTestId('title-card');
    expect(titleCards).toHaveLength(2);

    const metricsItems = screen.getAllByTestId('metrics-item');
    expect(metricsItems).toHaveLength(6);
  });

  it('should apply multi-column class when there are 4 or more metrics', async () => {
    await render(MetricsContainerComponent, {
      componentInputs: { spec: mockSpec },
    });

    const multiColumnCard = screen.getAllByTestId('metrics-group');
    expect(multiColumnCard[0]).not.toHaveClass('multi-column');
    expect(multiColumnCard[1]).toHaveClass('multi-column');
  });
});
