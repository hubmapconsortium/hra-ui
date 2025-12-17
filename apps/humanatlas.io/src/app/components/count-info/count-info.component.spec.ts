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

  async function setup(inputs = { countInfoList: mockCountInfo }) {
    const result = await render(CountInfoComponent, { providers, inputs });
    return result;
  }

  it('should create', async () => {
    await setup();
    expect(screen.getByText('Datasets')).toBeInTheDocument();
  });

  it('should render all count cards with labels and counts', async () => {
    await setup();

    expect(screen.getByText('Datasets')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('Contributors')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
  });
});
