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

  it('toggles row', async () => {
    const component = await render(CellTypesComponent, {
      componentInputs: { cellTypes: mockData, cellTypesSelection: ['a', 'b', 'c'] },
    });

    component.fixture.componentInstance.toggleRow(mockData[0]);
    expect(component.fixture.componentInstance.cellTypesSelection()).toEqual(['a', 'b', 'c', 'Cell Type 1']);
  });

  it('updates row color', async () => {
    const component = await render(CellTypesComponent, {
      componentInputs: { cellTypes: mockData, cellTypesSelection: ['a', 'b', 'c'] },
    });

    component.fixture.componentInstance.updateColor(mockData[0], [0, 0, 0]);
    expect(component.fixture.componentInstance.cellTypes()[0].color).toEqual([0, 0, 0]);
  });

  it('resets sort', async () => {
    const component = await render(CellTypesComponent, {
      componentInputs: { cellTypes: mockData, cellTypesSelection: ['a', 'b', 'c'] },
    });

    component.fixture.componentInstance.resetSort();
  });

  it('returns partial selection state', async () => {
    const component = await render(CellTypesComponent, {
      componentInputs: { cellTypes: mockData, cellTypesSelection: ['Cell Type 1', 'Cell Type 2', 'Cell Type 3'] },
    });

    component.fixture.componentInstance.toggleRow(mockData[1]);
    component.fixture.componentInstance.toggleRow(mockData[2]);
    component.fixture.componentInstance.toggleAllRows();
    expect(component.fixture.componentInstance.cellTypesSelection()).toEqual([
      'Cell Type 1',
      'Cell Type 2',
      'Cell Type 3',
    ]);
  });

  it('should return total cell count', async () => {
    const { fixture } = await render(CellTypesComponent, {
      componentInputs: { cellTypes: mockData, cellTypesSelection: ['Cell Type 1'] },
    });
    fixture.autoDetectChanges();

    expect(screen.getByTestId('total-cell-count')).toHaveTextContent('100');
  });
});
