import { provideHttpClient } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';

import { CountInfoComponent } from './count-info.component';
import { CountInfoItem } from './count-info.schema';

describe('CountInfoComponent', () => {
  const mockCountInfo: CountInfoItem[] = [
    {
      label: 'Datasets',
      count: 150,
      icon: 'dataset',
    },
    {
      label: 'Contributors',
      count: '75',
      icon: 'person',
    },
  ];

  const providers = [provideHttpClient()];

  it('should create', async () => {
    const { fixture } = await render(CountInfoComponent, {
      providers,
      inputs: { countInfoList: mockCountInfo },
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all count cards with labels and counts', async () => {
    const { container } = await render(CountInfoComponent, {
      providers,
      inputs: { countInfoList: mockCountInfo },
    });

    const cards = container.querySelectorAll('.count-card');
    expect(cards.length).toBe(2);

    expect(screen.getByText('Datasets')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('Contributors')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
  });
});
