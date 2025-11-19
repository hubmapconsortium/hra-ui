import { render, screen } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
import { ListViewComponent, ListViewGroup } from './list-view.component';

describe('ListViewComponent', () => {
  const providers = [provideMarkdown(), provideHttpClient()];

  const groupedData: ListViewGroup[] = [
    {
      group: '2024',
      items: [{ content: 'First publication' }, { content: 'Second publication' }],
    },
    {
      group: '2023',
      items: [{ content: '**Item 3**' }],
    },
  ];

  const ungroupedData: ListViewGroup[] = [
    {
      group: '',
      items: [{ content: '**Item 1**' }, { content: '**Item 2**' }, { content: '**Item 3**' }],
    },
  ];

  async function setup(data: ListViewGroup[], groupBy: boolean) {
    return render(ListViewComponent, {
      providers,
      inputs: { data, groupBy },
    });
  }

  it('should render', async () => {
    const component = await setup([], false);
    expect(component).toBeTruthy();
  });

  it('should display pre-grouped data with headers', async () => {
    await setup(groupedData, true);

    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('should display ungrouped data without headers', async () => {
    const { container } = await setup(ungroupedData, false);

    const sections = container.querySelectorAll('hra-page-section');
    expect(sections.length).toBe(0);
  });

  it('should render markdown content for each item', async () => {
    await setup(groupedData, true);

    expect(screen.getByText('First publication')).toBeInTheDocument();
    expect(screen.getByText('Second publication')).toBeInTheDocument();
  });

  it('should handle empty data array', async () => {
    const { container } = await setup([], false);

    const items = container.querySelectorAll('.content');
    expect(items.length).toBe(0);
  });
});
