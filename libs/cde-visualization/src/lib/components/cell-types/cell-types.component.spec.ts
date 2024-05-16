import { render, screen } from '@testing-library/angular';
import { CellTypesComponent, CellTypeOption } from './cell-types.component';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('CellTypesComponent', () => {
  const mockData: CellTypeOption[] = [
    { name: 'Cell Type 1', count: 100, color: '#FF0000' },
    { name: 'Cell Type 2', count: 200, color: '#00FF00' },
    { name: 'Cell Type 3', count: 300, color: '#0000FF' },
  ];

  it('should render the component', async () => {
    await render(CellTypesComponent, {
      componentInputs: { data: () => mockData },
    });

    expect(screen.getByText('Cell Types')).toBeInTheDocument();
    expect(screen.getByText('Total Cell Types')).toBeInTheDocument();
    expect(screen.getByText('Total Cells')).toBeInTheDocument();
  });

  it('should toggle row selection', async () => {
    await render(CellTypesComponent, {
      componentInputs: { data: () => mockData },
    });

    const checkboxes = screen.getAllByRole('checkbox');
    const firstCheckbox = checkboxes[0];

    expect(firstCheckbox).not.toBeChecked();

    await userEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    await userEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
  });
});
