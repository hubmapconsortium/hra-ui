import { render, screen } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
import { ListViewComponent, ListViewGroup } from './list-view.component';

describe('ListViewComponent', () => {
  it('should render', async () => {
    const component = await render(ListViewComponent, {
      providers: [provideMarkdown(), provideHttpClient()],
      inputs: {
        data: [],
        groupBy: false,
      },
    });
    expect(component).toBeTruthy();
  });

  it('should display pre-grouped data with headers', async () => {
    const data: ListViewGroup[] = [
      {
        group: '2024',
        items: [{ content: '**Item 1**' }, { content: '**Item 2**' }],
      },
      {
        group: '2023',
        items: [{ content: '**Item 3**' }],
      },
    ];

    await render(ListViewComponent, {
      providers: [provideMarkdown(), provideHttpClient()],
      inputs: {
        data,
        groupBy: true,
      },
    });

    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('should display ungrouped data without headers', async () => {
    const data: ListViewGroup[] = [
      {
        group: '',
        items: [{ content: '**Item 1**' }, { content: '**Item 2**' }, { content: '**Item 3**' }],
      },
    ];

    const { container } = await render(ListViewComponent, {
      providers: [provideMarkdown(), provideHttpClient()],
      inputs: {
        data,
        groupBy: false,
      },
    });

    const sections = container.querySelectorAll('hra-page-section');
    expect(sections.length).toBe(0);
  });

  it('should render markdown content for each item', async () => {
    const data: ListViewGroup[] = [
      {
        group: '2024',
        items: [{ content: 'First publication' }, { content: 'Second publication' }],
      },
    ];

    await render(ListViewComponent, {
      providers: [provideMarkdown(), provideHttpClient()],
      inputs: {
        data,
        groupBy: true,
      },
    });

    expect(screen.getByText('First publication')).toBeInTheDocument();
    expect(screen.getByText('Second publication')).toBeInTheDocument();
  });

  it('should handle empty data array', async () => {
    const { container } = await render(ListViewComponent, {
      providers: [provideMarkdown(), provideHttpClient()],
      inputs: {
        data: [],
        groupBy: false,
      },
    });

    const items = container.querySelectorAll('.list-view-item');
    expect(items.length).toBe(0);
  });
});
