import { MetricsItemComponent } from './metrics-item.component';
import { render, screen } from '@testing-library/angular';
describe('LongCardComponent', () => {
  it('should render label count and unit when it is provided', async () => {
    const spec = {
      label: 'Label',
      count: '1200',
      unit: 'MB',
    };

    await render(MetricsItemComponent, {
      componentInputs: { spec: spec },
    });

    const title = screen.getByText('Label');
    const countWithUnit = screen.getByText('1200 MB');

    expect(title).toBeInTheDocument();
    expect(countWithUnit).toBeInTheDocument();
  });

  it('should render label count when unit is not provided', async () => {
    const spec = {
      label: 'Label',
      count: '1200',
    };

    await render(MetricsItemComponent, {
      componentInputs: { spec: spec },
    });

    const title = screen.getByText('Label');
    const countWithUnit = screen.getByText('1200');

    expect(title).toBeInTheDocument();
    expect(countWithUnit).toBeInTheDocument();
  });
});
