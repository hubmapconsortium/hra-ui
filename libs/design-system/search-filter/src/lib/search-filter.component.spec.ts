import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { SearchFilterComponent, SearchFilterOption } from './search-filter.component';

describe('SearchFilterComponent', () => {
  const mockOptions: SearchFilterOption[] = [
    { label: 'Heart', value: 'heart' },
    { label: 'Kidney', value: 'kidney' },
    { label: 'Liver', value: 'liver' },
    { label: 'Lung', value: 'lung' },
  ];

  it('displays search input with label', async () => {
    await render(SearchFilterComponent, {
      inputs: {
        label: 'Search organs',
        options: mockOptions,
      },
    });

    expect(screen.getByText('Search organs')).toBeInTheDocument();
  });

  it('shows results counter when enabled', async () => {
    await render(SearchFilterComponent, {
      inputs: {
        label: 'Search',
        options: mockOptions,
      },
    });

    expect(screen.getByText('Viewing', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
  });

  it('filters options when user types', async () => {
    await render(SearchFilterComponent, {
      inputs: {
        label: 'Search',
        options: mockOptions,
      },
    });

    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'kid');

    expect(screen.getByText('Viewing', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });

  it('shows filter dropdown with filtered options', async () => {
    await render(SearchFilterComponent, {
      inputs: {
        label: 'Search',
        options: mockOptions,
      },
    });

    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'l');

    expect(await screen.findByText('Liver')).toBeInTheDocument();
    expect(await screen.findByText('Lung')).toBeInTheDocument();
  });

  it('clears search when clear button is clicked', async () => {
    await render(SearchFilterComponent, {
      inputs: {
        label: 'Search',
        options: mockOptions,
      },
    });

    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'heart');

    expect(screen.getByText('Viewing', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();

    const clearButton = screen.getByRole('button', { name: /clear/i });
    await userEvent.click(clearButton);

    expect(input).toHaveValue('');
    expect(screen.getByText(/4/)).toBeInTheDocument();
  });

  it('emits selection when option is clicked', async () => {
    const onSelectionChange = jest.fn();
    await render(SearchFilterComponent, {
      inputs: {
        label: 'Search',
        options: mockOptions,
      },
      on: {
        selectionChange: onSelectionChange,
      },
    });

    const input = screen.getByRole('combobox');
    await userEvent.click(input);

    const option = await screen.findByText('Heart');
    await userEvent.click(option);

    expect(onSelectionChange).toHaveBeenCalledWith(mockOptions[0]);
  });
});
