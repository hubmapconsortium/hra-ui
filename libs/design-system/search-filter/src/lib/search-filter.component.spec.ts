import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  it('displays search input with label', async () => {
    await render(SearchFilterComponent, {
      componentInputs: {
        label: 'Search organs',
        totalCount: 10,
        viewingCount: 10,
      },
    });

    expect(screen.getByText('Search organs')).toBeInTheDocument();
  });

  it('shows results counter', async () => {
    await render(SearchFilterComponent, {
      componentInputs: {
        label: 'Search',
        totalCount: 4,
        viewingCount: 4,
      },
    });

    expect(screen.getByText('Viewing', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
  });

  it('displays filtered count', async () => {
    await render(SearchFilterComponent, {
      componentInputs: {
        label: 'Search',
        totalCount: 4,
        viewingCount: 1,
      },
    });

    expect(screen.getByText('Viewing', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });

  it('allows user to type in search input', async () => {
    await render(SearchFilterComponent, {
      componentInputs: {
        label: 'Search',
        totalCount: 4,
        viewingCount: 1,
      },
    });

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'kidney');

    expect(input).toHaveValue('kidney');
  });
});
