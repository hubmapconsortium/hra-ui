import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { CellTypeEntry } from '../../models/cell-type';
import { CellTypesComponent } from './cell-types.component';

describe('CellTypesComponent', () => {
  const mockData: CellTypeEntry[] = [
    { name: 'Cell Type 1', count: 100, color: [0, 1, 2] },
    { name: 'Cell Type 2', count: 200, color: [3, 4, 5] },
    { name: 'Cell Type 3', count: 300, color: [6, 7, 8] },
  ];

  it('should render the component', async () => {
    await render(CellTypesComponent, {
      componentInputs: { cellTypes: mockData, cellTypesSelection: ['a', 'b', 'c'] },
    });

    expect(screen.getByText('Cell Types')).toBeInTheDocument();
    expect(screen.getByText('Total Cell Types')).toBeInTheDocument();
    expect(screen.getByText('Total Cells')).toBeInTheDocument();
  });

  it('should toggle row selection', async () => {
    await render(CellTypesComponent, {
      componentInputs: { cellTypes: mockData, cellTypesSelection: ['a', 'b', 'c'] },
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
